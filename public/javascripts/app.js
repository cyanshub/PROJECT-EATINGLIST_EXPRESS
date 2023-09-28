// 載入外部JSON檔案
// import restaurants_results from '/restaurant.json' assert{ type:'json'};

// gitHub 網頁版: 載入外部JSON檔案
const gitHubName = "PROJECT-EATINGLIST_EXPRESS";
import restaurants_results from "/PROJECT-EATINGLIST_EXPRESS/restaurant.json" assert{ type: 'json'};

const restaurants = restaurants_results.results;
console.log(restaurants);


// 選定目標
const dataPanel = document.querySelector('#data-panel-eatinglist');
const dataPanelShow = document.querySelector('#data-panel-eatinglist-show');
const searchForm = document.querySelector('#search-form');


// 首頁渲染資料
// start
// 設計 function
function renderEatinglist(data){
  let rawHTML = ''
  rawHTML += `
  <div class="col col-md-10 mx-auto">
        <div class="row row-cols-sm-3">
  `
  data.forEach( item => {
    // 在 gitHub專案的時候, 連結前面要補專案名稱; 若用 "./"的方式, 則對應html檔案必須放在根目錄
    rawHTML += `  
          <a href="./show.html#${item.id}" class="text-secondary">
            <div class="card mb-3">
              <img src="${item.image}" alt="${item.name}" class="card-img-top">
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

  rawHTML += `
          </div>
      </div>
  `
  // 注意: 每次讀取HTML時, DOM元素會刷新, 僅能寫入目前存在的HTML元素, 故需先判斷是否為null, 若null則不執行
  dataPanel.innerHTML = rawHTML;
}

if (!dataPanel) { } else {
renderEatinglist(restaurants);}
// end



// 打造首頁搜尋功能
// start
// 檢查DOM元素是否存在
if (!searchForm) { } else {
  // 設計監聽器並觸發函式
  searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
    event.preventDefault();

    // 選定目標
    const searchInput = document.querySelector('#search-input');
    
    // 獲取input元素的值
    const keyword = searchInput.value.trim().toLowerCase();
    
    // 檢查1: 卻保有輸入字串
    if (!keyword.length) {
      renderEatinglist(restaurants);
      return alert("Please enter a valid string!");
    } else {
      console.log("測試")

      // 使用.filter陣列方法依餐廳名稱或類別篩選
      const restaurants_filter = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(keyword) ||
        restaurant.category.toLowerCase().includes(keyword));

      if (restaurants_filter.length===0){
        // 檢查2: 若搜尋沒有結果也跳出提示
        return alert("Cannot find a restaurant with keyword:" + keyword);
      }

      renderEatinglist(restaurants_filter);
    }
  })
}



// 分頁渲染資料
// 設計 function
// start
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

          <img src="${item.image}" alt="${item.name}" class="rounded mb-4 w-100 d-block mx-auto">

        </div>
      </div>
    </div>
  `
  // 注意: 每次讀取HTML時, DOM元素會刷新, 僅能寫入目前存在的HTML元素, 故需先判斷是否為null, 若null則不執行
  dataPanelShow.innerHTML = rawHTML;
}


// 模仿動態路由的方法自動捕捉路由 id
console.log(window.location.hash); // 自動獲取當前路由位置最後一層的hash-tag
let restaurant_id = window.location.hash;
restaurant_id = Number(restaurant_id.substring(1)); //獲取hash-tag後, 把 "#" 給刪除, 並將字串轉換成數字
console.log(restaurant_id);


// 利用.find陣列方法將變數s逐一抽出變數傳入檢查是否符合對應的 id, find 符合條件的變數
const restaurant_find = restaurants.find(restaurant => restaurant.id === restaurant_id);
console.log(restaurant_find);

if (!dataPanelShow) { } else {
  showEatinglist(restaurant_find);
}
// end