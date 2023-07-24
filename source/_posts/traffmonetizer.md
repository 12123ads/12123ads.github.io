---
title: 用Traffmonetizer让吃灰🐥变现
date: 2023-07-24
updated: 2023-07-24
tags:
    - docker
categories:
  - Docker
index_img: https://img.xzh.gs/i/2023/07/24/64be24b74f5b9.png
banner_img: https://img.xzh.gs/i/2023/07/24/64be24b74f5b9.png
---
## 注册
> 建议走我的aff，注册就能得5$，[点这里](https://traffmonetizer.com/?aff=1261255)。

![首页](https://img.xzh.gs/i/2023/07/24/64be2853db4ef.png)
注册好之后，你的首页会显示一个`application token`，这里先保存下来，后面挂程序会用到。

## 挂程序
> 本教程以Linux的Docker为例
首先，需要安装Docker
```bash
curl -fsSL https://get.docker.com | bash
```
然后直接运行下面的命令，就能挂好程序了
> 记得将下面`token`替换成之前保存的`application token`

```bash
#x86_64
docker run -itd --name tm traffmonetizer/cli:latest start accept --token token

#arm64v8
docker run -itd --name tm traffmonetizer/cli:arm64v8 start accept --token token

#arm32v7
docker run -itd --name tm traffmonetizer/cli:arm32v7 start accept --token token
```
## 提现
`Traffmonetizer`的提现方式有`Payoneer`, `BTC`, `Webmoney`, `Skrill`, `Payeer`, `TRC20 USDT`。这里建议用USDT，最方便，只需要有一个交易所账户就行了，这里不再赘述。