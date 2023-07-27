---
title: Linux下使用Hexo在GitHub Pages搭建博客
date: 2022-04-07 20:04:24
updated: 2023-07-28 1:08:10
tags: 
  - hexo
  - github
index_img: https://img.xzh.gs/i/2022/08/19/62ffab297e915.png
banner_img: https://img.xzh.gs/i/2022/08/19/62ffab297e915.png
---
# 配置环境
配置搭建`Hexo`所需要的本地环境，包括`Git`、`Node.js`和`Hexo`本身。

## 安装Git

需要Git把本地博客提交到GitHub上，如果已经安装了Git，可以跳过这一步。
**Debian**系：
```bash
sudo apt-get update && sudo apt-get install -y git
```
**RedHat**系：
```bash
sudo yum update && sudo yum install -y git
```

## 安装Nodejs

因为Hexo是基于Nodejs的，所以要先安装Nodejs。
Linux安装命令：
> 这里的命令安装的是16版本。

```bash
mkdir /opt
wget https://nodejs.org/dist/v16.14.2/node-v16.14.2-linux-x64.tar.xz
tar -xvJf node-v16.14.2-linux-x64.tar.xz
mv node-v16.14.2-linux-x64 /opt/node
rm -rf node-v16.14.2-linux-x64
ln -s /opt/node/bin/node /usr/local/bin/
ln -s /opt/node/bin/npm /usr/local/bin/
ln -s /opt/node/bin/npx /usr/local/bin/
```

## 安装Hexo

这里使用npm安装Hexo

```bash
npm install -g hexo-cli
```

# 配置博客

## 初始化博客

```bash
hexo init blog
cd blog
npm install
```

这里的blog用来存放博客文件
执行完成之后运行`hexo server`，访问http://IP:4000就能看见你的博客了。

## 修改配置文件

创建完成后，目录结构如下
blog/
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes

网站的配置文件是`_config.yml`，你可以在里面设置网站的大部分信息。
主要的配置项：

|   参数   | 描述                                                  |
| :---------: | :------------------------------------------------------ |
|   title   | 网站标题                                              |
| subtitle | 网站副标题                                            |
|  author  | 网站作者                                              |
|    url    | 网址，必须用http/https开头                            |
| permalink | [具体参考这里](https://hexo.io/zh-cn/docs/permalinks) |

其他的配置项也可以参考[这里](https://hexo.io/zh-cn/docs/configuration)

## 新建文章

使用`hexo new 'Hello world'`可以在*sources/_posts*生成一个Hello-world.md的文件，在这个文件里就能写文章了。

# 上传博客到GitHub pages

## 连接GitHub

> **以下的username均改成你的GitHub用户名**

1. 执行`ssh-keygen –t rsa`生成秘钥
2. 使用`cat ~/.ssh/id_rsa.pub`拿到公钥
3. 复制上一步拿到的公钥，并在[Github](https://github.com/settings/keys)提交你的公钥
4. 在[Github]([Title](https://github.com/new))创建一个名为`username.github.io`的仓库
5. 在blog目录输入

```bash
git init
git remote add origin git@github.com:username/username.github.io.git
```

6. 再输入`npm install hexo-deployer-git --save`安装[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
7. 修改配置文件_config.yml，在底部追加以下内容

```config
deploy:
  type: git
  repo: git@github.com:username/username.github.io.git
  branch: gh_pages
```

8. 执行 `执行 hexo clean && hexo d -g`即可生成网站文件并自动推送到github
9. 打开`username.github.io`仓库的settings，转到Pages项，将Branch设置为`gh_pages`，保存。
10. 此时浏览器打开`https://username.github.io`即可访问你的博客！
