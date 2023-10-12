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


// 設計函式處理清單資料
// #1 定義需要用到的變數
const cards_per_page = 8;


// #2 功能設計
// 限制每頁顯示圖卡張數
function getItemsByPage(data, page){
  const startIndex = (page - 1) * cards_per_page;
  const EndIndex = page * cards_per_page;
  return data.slice(startIndex, EndIndex);
}

// 動態渲染網站頁數
function renderPaginator(amount){
  // 用圖卡數量決定網站頁數
  const numberOfPages = Math.ceil(amount / cards_per_page);
  console.log(`網站頁數: ${numberOfPages}`);

  // 產生指定長度的空陣列
  let pages = Array(numberOfPages);

  // 動態產生網站頁數陣列
  for(let i=0; i<numberOfPages; i++){
    pages[i] = i + 1;
  }
  console.log(`動態產生網站頁數陣列: ${pages}`);
  return pages;
}


// #3 呼叫函式產生所需要的變數
// 產生頁碼器陣列
const pages = renderPaginator(restaurants.length);

// 在有page將資料進行分段的概念後，預設顯示第一段的陣列資料
let page = 1;
let restaurants_page = getItemsByPage(restaurants, page);



// 設定路由與渲染網頁:首頁
app.get("/", (req, res)=>{
  console.log(restaurants[0]);
  res.render("index", {restaurants:restaurants_page, pages:pages})
})


// 設定路由與渲染網頁:首頁結合頁碼器渲染
app.get("/page=:page", (req, res) => {
  page = Number(req.params.page);
  console.log(`點選頁碼: ${page}`);
  restaurants_page = getItemsByPage(restaurants, page);
  res.render("index", {restaurants:restaurants_page, pages:pages })
})


// 設定路游與渲染網頁:首頁搜尋功能
app.get("/search", (req, res) => {
  // input 的 name="keyword" 會以?的形式帶入路由 

  

  // 依餐廳名稱篩選(使用filter陣列方法)
  let keyword = req.query.keyword;
  let restaurants_filter = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword.toLowerCase()) ||
    restaurant.category.toLowerCase().includes(keyword.toLowerCase()));

  let pages_filter = [];


  // 追加檢查: if 搜尋表單的輸入值為空白,渲染搜尋前的變數
  if (!keyword.length) {
    restaurants_filter = restaurants_page;
    pages_filter = pages;
  }

  // 追加檢查: if 搜尋表單沒有結果
  if(restaurants_filter.length===0){
    console.log(`無法找到含關鍵字${keyword}的項目`);
  }

  res.render("index", { restaurants: restaurants_filter, keyword: keyword, pages: pages_filter });
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









