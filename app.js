// 設定連接埠
const port = 3000;

// 載入 express 框架
const express = require('express');
const app = express();

// 載入 express-handlebars 樣板引擎
const exphbs = require('express-handlebars');

// 在 express 框架中使用各種方法進行設定
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine","handlebars");
app.use(express.static("public"));

// 載入外部JSON檔案
const restaurants = require("./restaurant.json");

// 設定路由與渲染網頁
app.get("/", (req, res)=>{
  console.log(restaurants.results[0]);
  res.render("index", {restaurants:restaurants.results})
})


// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`);
})









