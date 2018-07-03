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