---
title: 利用docker快速搭建bitwarden个人密码管理器
date: 2022-08-14 23:42:04
updated: 2022-08-14 23:42:04
tags: docker
index_img: https://img.xzh.gs/i/2022/08/19/62ffaa43a4465.png
banner_img: https://img.xzh.gs/i/2022/08/19/62ffaa43a4465.png
---
# 安装所需环境
## 安装docker
*如果没有安装docker可以执行以下命令安装*
```shell
curl -fsSL https://get.docker.com | bash
```
## 安装docker-compose
*接下来把docker-compose也安装上*
```shell
curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
# 运行docker容器
在你想要的位置新建一个文件夹，里面会存放bitwarden的配置文件和数据库
```shell
mkdir bitwarden && cd bitwarden
```
写入docker-compose配置文件
```docker
cat >> docker-compose.yml <<EOF
version: '3'

services:
  bitwarden:
    image: vaultwarden/server:latest #使用 vaultwarden/server 最新镜像
    container_name: bitwarden
    restart: always
    volumes:
      - ./data:/data  #容器内的 /data 目录挂载到宿主机的当前目录下的 data 目录；
    env_file:
      - config.env
    ports:
      - "18080:80" #将容器内的 80 端口映射到了宿主机的 18080 端口
EOF
```
## 写入环境变量文件
*注意改成自己的配置*
```env
cat >> config.env <<EOF
SIGNUPS_ALLOWED=true
DOMAIN=https://
ROCKET_WORKERS=10
WEB_VAULT_ENABLED=true
ADMIN_TOKEN=***
EOF
```

## 启动容器
```docker-compose up -d```

# 设置bitwarden
***因为安全原因，bitwarden必须要https链接，可以在[DigitalOcean](https://www.digitalocean.com/community/tools/nginx?global.app.lang=zhCN)的这个网站生成NGINX的HTTPS反代配置，或者自行查阅[Google](https://www.google.com/)在这里不做赘述***

浏览器输入`https://ip:port/`回车来访问搭建好的bitwarden，此时还要再做几个设置。
1. 先创建你的账号
2. 回到环境变量文件，也就是`config.env`文件，把里面的SIGNUPS_ALLOWED*也就是允许注册*改为`false`
3. *建议*，将`WEB_VAULT_ENABLED`改为`false`*把bitwarden的web面板关闭*
4. 使用```docker-compose down && docker-compose up -d```重启容器

# 完成！
