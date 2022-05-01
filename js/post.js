const postsDom = document.querySelector("#posts");

const url = "https://stormy-plateau-16452.herokuapp.com/posts";

let data = [];

getData();

async function getData() {
  const res = await axios.get(url);
  data = res.data.data;
  render();
}

function render() {
  const str = data
    .map((item) => {
      if (item.discussPhoto) {
        return `
            <div class="w-[533px] border-2 border-black rounded-lg p-6 card-shandow bg-white mb-4">
            <div class="flex items-center mb-4">
                <img src="${item.userPhoto}"
                    alt="" class="w-[45px] h-[45px] mr-4">
                <div>
                    <h2 class="font-bold">${item.userName}</h2>
                    <p class="text-gray-400 text-xs">${formatTime(
                      item.createAt
                    )}</p>
                </div>
            </div>
            <p class="font-normal mb-4">${formatContent(
              item.discussContent
            )}</p>
            <div class="rounded-lg overflow-hidden h-[157px]">
                <img src="${item.discussPhoto}"
                    alt="">
            </div>
        </div>
            `;
      } else {
        return `
            <div class="w-[533px] border-2 border-black rounded-lg p-6 card-shandow bg-white mb-4">
            <div class="flex items-center mb-4">
                <img src="${item.userPhoto}"
                    alt="" class="w-[45px] h-[45px] mr-4">
                <div>
                    <h2 class="font-bold">${item.userName}</h2>
                    <p class="text-gray-400 text-xs">${formatTime(
                      item.createAt
                    )}</p>
                </div>
            </div>
            <p class="font-normal mb-4">
            ${formatContent(item.discussContent)}
            </p>
        </div>
            `;
      }
    })
    .join("");
  postsDom.innerHTML = str;
}

function formatTime(time) {
  return moment(time).format("YYYY/MM/DD HH:mm:ss");
}

function formatContent(str) {
  return str.replace(/\n/g, "<br>");
}
