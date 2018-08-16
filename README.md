# ToDoList任务需求
* 主页面展示待办事项列表，过滤按钮，添加按钮
* 每条事项显示标题，右侧提醒时间，过了提醒时间而未完成的字体颜色变红（或者其它方式提醒）
* 勾选完成自动排到未完成下面
* 点击每条事项或者添加按钮弹出任务编辑弹窗（增加或者更新）
* 编辑弹窗包括任务标题，任务详细，提醒时间，确定按钮（或者更新按钮）,若是更新弹窗的话请再增加一个删除按钮* 
* 所有数据存在localStorage
# 启动命令
* npm run dev
# 运行截图
![安卓界面.gif](https://github.com/linzelong95/ToDoList/blob/master/picture/todolist.gif)

![主界面.png](https://github.com/linzelong95/ToDoList/blob/master/picture/main.png)

##### 
![添加事项.png](https://github.com/linzelong95/ToDoList/blob/master/picture/add.png)
##### 
![编辑事项.png](https://github.com/linzelong95/ToDoList/blob/master/picture/edit.png)
##### 
![删除所有.png](https://github.com/linzelong95/ToDoList/blob/master/picture/deleteAll.png)
##### 
![删除该项.png](https://github.com/linzelong95/ToDoList/blob/master/picture/deleteOne.png)
##### 
![折叠列表.png](https://github.com/linzelong95/ToDoList/blob/master/picture/roll.png)
##### 
![只显示待做事项.png](https://github.com/linzelong95/ToDoList/blob/master/picture/willdo.png)
##### 
# How-to-Creact-React_antd-Project
如何创建react项目
***
1. 创建文件夹（项目）并初始化，此时自动生成package.json文件,命令如下：
```
npm init -y
```
2. 在项目新建两个文件夹dist和src，在src文件夹中新建两个文件index.html和index.js
3. 安装项目内的webpack打包工具，命令如下:
```
npm i webpack webpack-cli -D
```
4. 项目根目录新建webpack.config.js文件并写好配置（这时如果用webpack打包，会在dist文件夹自动生成main.js文件，我们只需要在index.html引入<script src=".../dist/main.js">就可以使用了，而不用顾及es6等语法问题）,webpack.config.js里的配置内容如下：
```
module.exports={
  mode:"development"//项目上线用production
}
```
5. 开发中为了方便，每次保存代码，浏览器自动更新内容，安装server，命令如下：
  ```
  npm i webpack-dev-server -D
  ```
  并在package.json的“scripts”里添加：
  ```
  "dev":"webpack-dev-server --open"
  ```
  这样首次启动项目会自动打开默认浏览器并加载项目（使用npm run dev）命令打开，注意此时的index.html的main.js引入改为<script src="/main.js">

6. 安装热更新，项目启动会自动运行并自动引入打包后的js，所以可以直接删掉步骤4或5的main.js引入，安装命令如下：
  ```
  npm i html-webpack-plugin -D
  ```
  并在webpack.config.js文件中添加：
  ```
  const path=require("path")
  const HtmlWebPackPlugin=require("html-webpack-plugin")
  const htmlPlugin=new HtmlWebPackPlugin({
    template:path.join(__dirname,"./src/index.html"),
    filename:"index.html"
  })
  ```
  在该文件下边的module.exports中添加
  ```
  plugins:[htmlPlugin]
  ```

7. 安装react的基本包，安装命令如下：

   ```
   npm i react react-dom -S
   ```

   在src文件夹的index.js中引入react相关包

   ```
   import React from "react";
   import ReactDom from "react-dom"
   ```

8. 安装es6的转义工具，安装命令如下：

   ```
   npm i babel-core babel-loader babel-plugin-transform-runtime -D
   npm i babel-preset-env babel-preset-stage-0 babel-preset-react -D
   ```

   在webpack.config.js中的module.exports添加：

   ```
   module:{
       rules:[
           {
           	test:/\.js|jsx$/,use:"babel-loader",exclude:/node_modules/
           }
       ]
   }
   ```

   在项目根目录创建.babelrc文件，输入内容如下：

   ```
   {
       "presets":["env","stage-0","react"],
       "plugins":["transform-runtime"]
   }
   ```

9. 在父组件中引入子组件，假设子组件(文件名为Hello.jsx，假设子组件放在src/components/下)为：

   ```
   export default const Hello=(props)=><div>{props.name}</div>
   ```

   在父组件使用

   ```
   import Hello from "./components/Hello.jsx"
   ```

10. 若要在引入时省略.js或者.jsx或者.json后缀并且用@代替“./src”,可在webpack.config.js的module.exports中写入

    ```
    resolve:{
        extensions:[".js",",jsx",".json"],
        alias:{
            "@":path.join(__dirname,"./src")
        }
    }
    ```

    那么步骤9可以写成

    ```
    import Hello from "@/components/Hello"
    ```

11. 引入css样式需要使用style-loader， css-loader解析器，安装命令如下：

    ```
    npm i style-loader css-loader -D
    ```

    为了能正常使用css，还需要在webpack.config.js的rulesd的test中添加

    ```
    {
    	test:/\.css$/,use:["style-loader","css-loader"]
    }
    ```

    导入样式，如下例（假如样式放在“src/css/”下）：

    ```
    import styles from "@/css/style.css"
    ```

12. 引入bootstrap，并安装所需解析器

    ```
    npm i bootstrap -S
    npm i url-loader file-loader -D
    ```

    bootstrap是安装在node_module中，故引入直接使用(bootcss自己定义)

    ```
    import bootcss from "bootstrap/dist/css/bootstrap.css"
    ```

    为了能正常使用bootstrap，还需要在webpack.config.js的rulesd的test中添加

    ```
    {
       test:/\.ttf|woff|woff2|eot|svg$/,use:"url-loader"
    }
    ```

13. 使用解析器同时解析css和bootstrap会有冲突，故我们自己写的样式用.less或.sass结尾（选择其中一种就行了），而不用.css。安装less及其解析器如下：

    ```
    npm i less-loader less -D
    ```

    并在webpack.config.js的rulesd的test中添加

    ```
    {
    	test:/\.less/,use:["style-loader","css-loader?modules","less-loader"]
    }
    ```

14. 使用ant design，需安装

    ```
    npm i antd --save
    npm i babel-plugin-import -D
    ```

    在.babelrc的plugins中添加：

    ```
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ```

15.最终配置如下：

.babelrc文件

```

{
    "presets": [
        "env",
        "stage-0",
        "react"
    ],
    "plugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    ]
}
```

webpack.config.js文件

```
const path=require("path");
const HtmlWebPackPlugin=require("html-webpack-plugin");
const htmlPlugin=new HtmlWebPackPlugin({
    template:path.join(__dirname,"./src/index.html"),
    filename:"index.html"
});
module.exports={
    mode:"development",//"development","production"
    plugins:[htmlPlugin],
    module:{
        rules:[
            {test:/\.js|jsx$/,use:"babel-loader",exclude:/node_modules/},
            {test:/\.css$/,use:["style-loader","css-loader"]},
            {test:/\.ttf|woff|woff2|eot|svg$/,use:"url-loader"},
            {test:/\.less/,use:["style-loader","css-loader?modules","less-loader"]}
        ]
    },
    resolve:{
        extensions:[".js",".jsx",".json"],
        alias:{
            "@":path.join(__dirname,"./src")
        }
    }
}
```

