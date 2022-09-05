---
title: HTML学习笔记
date: 2022-09-03 10:55:44
updated: 2022-09-05 14:44:00
categories: 
- 学习笔记
tags: 
- html
index_img: https://img.xzh.gs/i/2022/09/03/6312c7e438148.jpg
banner_img: https://img.xzh.gs/i/2022/09/03/6312c7e438148.jpg
---
# 什么是站点？
站点是WEB中所有文件和资源的集合
指属于某个WEB站点的文档的本地（计算机）或者远程存储（服务器）位置。

 - 网站是一个整体，网页是一个个的个体，一个网站是由很多网页构建而成。
 - 网站和网页的关系就像家庭和家人一样。
 - 网页与网站的区别简单来说：网站是由网页集合而成的，网页是由许多html文件集合而成的。
 - 即使只有一个网页也能被称为网站。

# HTML使用CSS的方式：
## 内联式：
 - 内联式```css```样式表就是把```css```代码直接写在现有的HTML标签中。
## 嵌入式：
 - 就是可以把```css```样式代码写在```<style type="text/css"></style>```标签之间。
## 外部式：
 - 就是把```css```代码写在一个单独的外部文件中，这个```css```样式以```.css```为扩展名，在```<head>```内（不是在```<style>```标签内）使用```<link>```标签将```css```样式链接到html文件内。

# 样式表方法区别：
1. 外部样式表：
当样式需要应用于很多页面时，外部样式表将是理想的选择。在使用外部样式表的情况下，你可以通过改变一个文件来改变整个站点的外观。每个页面使用```<link>```标签链接到样式表
2. 内部样式表：
当单个文档需要特殊样式时，就应该使用内部样式表，你可以使用```<style>```标签在文档头部定义内部样式表
3. 内联样式式：
由于要将表现的内容混杂在一起，内联样式会损失掉样式表的许多优势。请慎用这种方法，例如当样式仅需要在一个元素上应用一次时

# 实例
## 内联式
```html
<!DOCTYPE html>
<html>
    <body>
        <p style="color: red; font-size: 12px; font-weight: bold">内联式，红色，12px，粗体<p>
    </body>
</html>
```
## 嵌入式
```html
<!DOCTYPE html>
<html>
    <head>
        <style>
            .p{color: blue;
               font-size: 24px;
               font-weight: bolder}
        </style>
    </head>
    <body>
        <p class="p">嵌入式，蓝色，24px，更粗的粗体</p>
    </body>
</html>
```
## 外部式
```html
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="waibu.css">
    </head>
    <body>
        <p class="p">外部式，绿色，3em，细体</p>
    </body>
</html>
```
```css
.p{
    color: green;
    font-size: 3em;
    font-weight: lighter;
}
```


> 注意：三种css优先级，内联式>内部式>外部式
> 16进制颜色，格式为aabbcc，可以简写为abc；白是#ffffff，简写为#fff；黑是#000000，简写为#000。
> 字体大小：1em=16px。