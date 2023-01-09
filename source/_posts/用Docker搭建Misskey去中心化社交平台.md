---
title: 用Docker搭建Misskey去中心化社交平台
date: 2023-01-09 23:45:00
updated: 2023-01-09 23:45:00
tags:
    - misskey
    - docker
index_img: https://img.xzh.gs/i/2023/01/09/63bc09376d061.png
banner_img: https://img.xzh.gs/i/2023/01/09/63bc09947fec6.png
---
![](https://img.xzh.gs/i/2023/01/09/63bc345056db0.png)
## 安装Docker
```bash
curl -fsSL https://get.docker.com | bash
```
*由于新版docker自带compose，所以不用单独安装。*

## 克隆项目
```bash
cd /opt
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## 修改配置文件
*首先复制一份*
```bash
cp .config/example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
```

### 编辑default.yml
```bash
vim .config/default.yml
```
其中`url: https://example.tld/`改为你的实例域名
**db**的`host`改为`docker-compose.yml`里的services名，`db，user，pass`分别改为你的数据库名，用户，密码。
**redis**的`host`改为`docker-compose.yml`里的services名。

### 编辑docker.env
```bash
vim .config/docker.env
```
这里的配置和`default.yml`保持一致

## 构建镜像和初始化
> 如果内存太小，建议直接选择已构建好的[镜像](https://hub.docker.com/r/misskey/misskey)
```bash
docker compose build
docker compose run --rm web yarn run init
```

## 启动容器
```bash
docker compose up -d
```

## 配置Nginx反向代理
**[Misskey文档](https://misskey-hub.net/en/docs/admin/nginx.html)给了一份配置文件，根据自己需求改改**
```nginx
# For WebSocket
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache1:16m max_size=1g inactive=720m use_temp_path=off;

server {
    listen 80;
    listen [::]:80;
    server_name example.tld;

    # For SSL domain validation
    root /var/www/html;
    location /.well-known/acme-challenge/ { allow all; }
    location /.well-known/pki-validation/ { allow all; }
    location / { return 301 https://$server_name$request_uri; }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name example.tld;

    ssl_session_timeout 1d;
    ssl_session_cache shared:ssl_session_cache:10m;
    ssl_session_tickets off;

    # To use Let's Encrypt certificate
    ssl_certificate     /etc/letsencrypt/live/example.tld/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.tld/privkey.pem;

    # To use Debian/Ubuntu's self-signed certificate (For testing or before issuing a certificate)
    #ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    #ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

    # SSL protocol settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Change to your upload limit
    client_max_body_size 80m;

    # Proxy to Node
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_redirect off;

        # If it's behind another reverse proxy or CDN, remove the following.
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;

        # For WebSocket
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Cache settings
        proxy_cache cache1;
        proxy_cache_lock on;
        proxy_cache_use_stale updating;
        proxy_force_ranges on;
        add_header X-Cache $upstream_cache_status;
    }
}
```
> 如果实例套了CDN，需要删掉55-58行

## 升级实例
在实例目录执行
```bash
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker-compose build
sudo docker-compose stop && sudo docker-compose up -d
```

