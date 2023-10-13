// 載入外部JSON檔案
import data_json from "./data.json" assert{ type: 'json'};
const restaurants = data_json.restaurants;


// 選定目標
const dataPanel = document.querySelector('#data-panel-eatinglist');
const dataPanelShow = document.querySelector('#data-panel-eatinglist-show');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const paginator = document.querySelector('#paginator');


// 保留express專案中, 需要移植到一般專案的的javascript功能
// start
// #1 定義需要用到的變數
const cards_per_page = 8;
let page; // 用來處理資料陣列的分段
let restaurants_page; // 經過處理的分段陣列資料


// #2 功能設計
// 限制每頁顯示圖卡張數
function getItemsByPage(data, page) {
  const startIndex = (page - 1) * cards_per_page;
  const EndIndex = page * cards_per_page;
  return data.slice(startIndex, EndIndex);
}

// 動態渲染網站頁數
function renderPaginator(amount) {
  // 用圖卡數量決定網站頁數
  const numberOfPages = Math.ceil(amount / cards_per_page);
  console.log(`網站頁數: ${numberOfPages}`);

  // 產生指定長度的空陣列
  let pages = Array(numberOfPages);

  // 動態產生網站頁數陣列
  for (let i = 0; i < numberOfPages; i++) {
    pages[i] = i + 1;
  }
  console.log(`動態產生網站頁數陣列: ${pages}`);

  // return pages;
  let rawHTML = '';
  pages.forEach(item => {
    rawHTML += `
  <li class="page-item">
    <a href="#page=${item}" class="page-link" data-page="${item}">${item}</a>
  </li>
  `
  })
  paginator.innerHTML = rawHTML;
}


// #3 呼叫函式產生所需要的變數
// 在有page將資料進行分段的概念後，預設顯示第一段的陣列資料
page = 1;
restaurants_page = getItemsByPage(restaurants, page);

// 呼叫函式渲染第一段的陣列資料
if (!paginator) { } else {
  renderPaginator(restaurants.length);
  renderEatinglist(restaurants_page);
}
// end


// 動態路由功能: 獲取頁碼並依據頁碼重新渲染特定區段之資料
// start
// 定義變數 // 設計 function // 觸發 function
if (!paginator) { } else {
  if (!paginator) { } else {
    paginator.addEventListener("click", function onPaginatorClicked(event) {
      page = Number(event.target.dataset.page);
      console.log(`點選的頁碼: ${page}`);
      restaurants_page = getItemsByPage(restaurants, page);

      // 渲染對應頁碼的陣列資料
      renderEatinglist(restaurants_page);
    })
  }
}
// end



// 首頁渲染資料
// 定義變數 // 設計 function
function renderEatinglist(data){
  let rawHTML = ''

  data.forEach( item => {
    // 在 gitHub專案的時候, 連結前面要補專案名稱; 若用 "./"的方式, 則對應html檔案必須放在根目錄
    rawHTML += `  
          <a href="./show.html#${item.id}" class="text-secondary">
            <div class="card mb-3">
              <img src="./public/${item.image}" alt="${item.name}" class="card-img-top">
              <div class="card-body p-3">
                <h6 class="card-title mb-1">${item.name}</h6>
                <div class="restaurant-category mb-1">
                  <i class="fas fa-utensils pr-2"></i>
                  ${item.category}
                </div>
                <span class="text-secondary badge badge-pill badge-danger font-weight-normal">
                  ${item.rating}
                  <i class="fas fa-star fa-xs"></i>
                </span>
              </div>
            </div>
          </a>
    `
  })

  // 注意: 每次讀取HTML時, DOM元素會刷新, 僅能寫入目前存在的HTML元素, 故需先判斷是否為null, 若null則不執行
  dataPanel.innerHTML = rawHTML;
}


// 觸發 function
if (!dataPanel) { } else {
// renderEatinglist(restaurants);
}




// 打造首頁搜尋功能
// 定義變數 // 設計 function // 觸發 function
// 檢查 DOM 元素是否存在
if (!searchForm) { } else {
  // 設計監聽器並觸發函式
  searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
    event.preventDefault();

    // 獲取input元素的值
    let keyword = searchInput.value.trim().toLowerCase();

    // 檢查1: 卻保有輸入字串
    if (!keyword.length) {
      renderPaginator(restaurants.length);
      renderEatinglist(restaurants_page);
      return alert("Please enter a valid string!");
    }

    // 使用.filter陣列方法依餐廳名稱或類別篩選
    let restaurants_filter = restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(keyword) ||
      restaurant.category.toLowerCase().includes(keyword));

    if (restaurants_filter.length === 0) {
      // 檢查2: 若搜尋沒有結果也跳出提示
      return alert("Cannot find a restaurant with keyword:" + keyword);
    }

    renderPaginator([].length); // 搜尋結果不要顯示頁數
    renderEatinglist(restaurants_filter);
  })
}



// 分頁渲染資料
// 定義變數
let restaurant_id; // 透過路由獲取 id
let restaurant_find; // 透過陣列方法獲取處理過的變數


// 設計 function
function showEatinglist(item){
  let rawHTML = ''
  rawHTML += `
  <h1 class="mb-1 restaurant-show-title">${item.name}</h1>
    <div class="container">
      <div class="col col-md-10 mx-auto">
        <div class="row">
          <p class="mb-1">
            <span class="text-secondary">
              <i class="fas fa-utensils pr-2"></i> 類別:</span>
            ${item.category}
          </p>
          <p class="mb-1">
            <span class="text-secondary">
              <i class="fas fa-map-marker-alt pr-2"></i> 地址:</span>
            <a href="${item.google_map}" , target="_blank">
              ${item.location}
            </a>
          </p>
          <p class="mb-3">
            <span class="text-secondary">
              <i class="fas fa-mobile-alt pr-2"></i> 電話:</span>
            ${item.phone}
          </p>

          <p class="mb-5">
            ${item.description}
          </p>

          <img src="./public/${item.image}" alt="${item.name}" class="rounded mb-4 w-100 d-block mx-auto">

        </div>
      </div>
    </div>
  `
  // 注意: 每次讀取HTML時, DOM元素會刷新, 僅能寫入目前存在的HTML元素, 故需先判斷是否為null, 若null則不執行
  dataPanelShow.innerHTML = rawHTML;
}


// 觸發 function
// 模仿動態路由的方法自動捕捉路由 id
console.log(window.location.hash); // 自動獲取當前路由位置最後一層的hash-tag
restaurant_id = window.location.hash;
restaurant_id = Number(restaurant_id.substring(1)); //獲取hash-tag後, 把 "#" 給刪除, 並將字串轉換成數字
console.log(restaurant_id);

// 利用.find陣列方法將變數s逐一抽出變數傳入檢查是否符合對應的 id, find 符合條件的變數
restaurant_find = restaurants.find(restaurant => restaurant.id === restaurant_id);
console.log(restaurant_find);

if (!dataPanelShow) { } else {
  showEatinglist(restaurant_find);
}
