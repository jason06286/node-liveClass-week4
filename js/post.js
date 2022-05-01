const postsDom = document.querySelector("#posts");
const loadingDom = document.querySelector("#loading");
const selectDom = document.querySelector("#select");
const inputDom = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", (e) => {
  selectDom.value = "desc";
  getData();
});
inputDom.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.key === "Enter") {
    selectDom.value = "desc";
    getData();
  }
});
selectDom.addEventListener("change", (e) => {
  getData();
});

const swiperClass = [];
let data = [];

getData();

async function getData() {
  const url = `https://protected-refuge-81301.herokuapp.com/posts?timeSort=${selectDom.value}&q=${inputDom.value}`;

  postsDom.classList.add("hidden");
  loadingDom.classList.remove("hidden");
  const res = await axios.get(url);
  if (res.data.success) {
    data = res.data.data;
    render();
  }

  postsDom.classList.remove("hidden");
  loadingDom.classList.add("hidden");
}

function render() {
  let str = "";
  if (data.length === 0) {
    str = `    <div class="w-[533px] border-2 border-black rounded-lg  card-shandow bg-white mb-4">
    <div class="flex items-center mb-4  gap-x-2 border-b-2 border-black p-4">
        <div class="w-2 h-2 rounded-full bg-red-500"></div>
        <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
        <div class="w-2 h-2 rounded-full bg-green-500"></div>
    </div>
    <p class="font-normal mb-4 text-center text-gray-400 py-5">
      目前無動態，新增一則貼文吧!
    </p>
</div> `;
    postsDom.innerHTML = str;
    return;
  }
  data.forEach((item) => {
    let str2 = "";
    let str1 = `
    <div class="w-[533px] border-2 border-black rounded-lg p-6 card-shandow bg-white mb-4">
      <div class="flex items-center mb-4">
          <img src="${item.user.photo}"
              alt="${item.user.name}" class="w-[45px] h-[45px] mr-4 ">
          <div>
              <h2 class="font-bold">${item.user.name}</h2>
              <p class="text-gray-400 text-xs">${formatTime(item.createdAt)}</p>
          </div>
      </div>
      <p class="font-normal mb-4">
          ${formatContent(item.content)}
      </p>

    `;
    if (item.image.length === 0) {
      str2 = `</div> `;
    } else if (item.image.length === 1) {
      str2 = ` <div class="rounded-lg overflow-hidden h-[157px]">
      <img src="${item.image[0]}"
          alt="${item.content}">
  </div>
</div>
      `;
    } else {
      str2 =
        `<div class="swiper swiper-${item._id}">
      <div class="swiper-wrapper">` +
        item.image
          .map(
            (image) =>
              ` <div class="swiper-slide"><img src="${image}" alt="貼文圖片"></div>
        `
          )
          .join("") +
        `</div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
      </div>
</div>`;
      swiperClass.push(`.swiper-${item._id}`);
    }
    str += str1 + str2;
  });
  postsDom.innerHTML = str;
  createSwiper();
}

function formatTime(time) {
  return moment(time).format("YYYY/MM/DD HH:mm:ss");
}

function formatContent(str) {
  return str.replace(/\n/g, "<br>");
}

function createSwiper() {
  swiperClass.forEach((item) => {
    new Swiper(item, {
      cssMode: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
      mousewheel: true,
      keyboard: true,
    });
  });
}
