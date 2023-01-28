---
title: Cloudflare官方CNAME接入教程
date: 2023-01-28 19:40:56
updated: 2023-01-28 19:40:56
tags: 
    - cloudflare
index_img: https://img.xzh.gs/i/2023/01/28/63d50b2550365.png
banner_img: https://img.xzh.gs/i/2023/01/28/63d50b2550365.png
---
> 使用SaaS的办法接入CNAME，需要在CLoudflare有一个ns接入的域名，还需要一个在国内服务商解析的域名

打开在Cloudflare解析的域名，转到`DNS`页面

![DNS](https://img.xzh.gs/i/2023/01/28/63d514845bf5c.png)

添加一个由Cloudflare代理流量，指向源服务器的记录

> 这里的前缀用什么都可以，这里我用的@

![添加记录](https://img.xzh.gs/i/2023/01/28/63d516ec52fdf.png)

添加解析完成后，转到`SSL/TLS`的`自定义主机名`页面

![自定义主机名](https://img.xzh.gs/i/2023/01/28/63d5185730746.png)

在回退源这个地方填入刚刚解析源服务器的域名，填完点击添加回退源，等一会刷新一下就显示有效了

![设置回退源](https://img.xzh.gs/i/2023/01/28/63d51990020c2.png)

回退源显示有效了就可以添加`自定义主机名`了。
点击`添加自定义主机名`，将你需要套Cloudflare CDN的域名填入，剩下三保持不变(如果有需求可以自己选)，再次点击`添加自定义主机名`即可

![添加自定义主机名](https://img.xzh.gs/i/2023/01/28/63d51b311b67c.png)

添加好之后，还需要在需要套CDN的域名上解析两条TXT记录

![添加TXT解析](https://img.xzh.gs/i/2023/01/28/63d521e59dd15.png)

然后，在对应的域名上添加上Cloudflare的IP或cname解析可使用Cloudflare的CDN