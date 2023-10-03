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
const data_json = require("./public/data.json");
const restaurants = data_json.restaurants;

// 設定路由與渲染網頁:首頁
app.get("/", (req, res)=>{
  console.log(restaurants[0]);
  res.render("index", {restaurants:restaurants})
})


// 設定路游與渲染網頁:首頁搜尋功能
app.get("/search", (req, res) => {
  // input 的 name="keyword" 會以?的形式帶入路由 

  // 依餐廳名稱篩選(使用filter陣列方法)
  const keyword = req.query.keyword;
  const restaurants_filter = restaurants.filter(restaurant =>
    restaurant.name.includes(keyword) ||
    restaurant.category.includes(keyword));

  res.render("index", {restaurants:restaurants_filter,keyword:keyword});
})



// 設定路游與渲染網頁:打造分頁
app.get("/restaurants/:restaurant_id", (req, res)=>{
  // 動態路由的資料型態一律都是字串, 要記得轉換
  const restaurant_id = Number(req.params.restaurant_id);

  // .find方法是將變數s逐一抽出變數傳入檢查是否符合條件
  const restaurant = restaurants.find(restaurant => restaurant.id === restaurant_id );

  res.render("show", {restaurant:restaurant})
})



// 啟動並監聽伺服器
app.listen(port, ()=>{
  console.log(`Express is running on http://localhost:${port}`);
})









