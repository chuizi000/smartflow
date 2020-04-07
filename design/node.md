# node 定义
> format
> 
> 类型名(含义) => {包含的data:(!为必需，？为不必需)} => [能连接的类型]

## 版本杂注
* pragma (版本杂注) => {left:!string,right:?string}=>[]
* 例子 pragma solidity ^0.4.0;

## 合约
* contract (合约) => {name:!string} => [struct,bool]

## 状态变量
* struct (结构体)=> {name:!string,} => [变量声明]
### type
* type => {[bool,int,uint,address]} => []
* bool (布尔类型) => {name:!string,value:!(true,false)}
* int/uint (有符号无符号整型) => {name:!string,value:!(number)} => [+,-,*,/,<=,<,==,!=,>,>=]
* address (地址类型) => {name:!string,value:!(20 字节的值)} => [<=,<,==,!=,>,>=]
* bytes[.length]=>{name:!string,length:![1,32]}
* ...
## 常量
* const
* ...
## 声明
* public (公共) => {} <==[变量]

