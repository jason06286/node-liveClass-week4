const contentDom = document.querySelector("#content");
const submitBtn = document.querySelector("#btn");
const fileInput = document.querySelector("#file");
const imagesDom = document.querySelector("#images");

const url = "https://protected-refuge-81301.herokuapp.com/posts";

let images = [];

submitBtn.addEventListener("click", (e) => {
  if (!contentDom.value)
    return createToastMessage(false, "請輸入您的貼文內容!!");
  upLoadPost();
});
fileInput.addEventListener("change", (e) => {
  fileToFormData();
});

async function upLoadPost() {
  submitBtn.children[0].classList.add("hidden");
  submitBtn.children[1].classList.remove("hidden");
  const { value } = contentDom;
  try {
    const res = await axios.post(url, {
      //   user: "626e3eb476e0041982fc8e78",
      user: "626e3f3176e0041982fc8e7a",
      //   user: "626e3f1076e0041982fc8e79",
      image: images,
      content: value,
    });
    contentDom.value = "";
    images = [];
    imgRender();
    res.data.success
      ? createToastMessage(res.data.success, "新增貼文成功!")
      : createToastMessage(res.data.success, "新增貼文失敗!");
  } catch (error) {
    console.log(error);
  }
  submitBtn.children[0].classList.remove("hidden");
  submitBtn.children[1].classList.add("hidden");
}

function fileToFormData() {
  fileInput.setAttribute("disabled", "true");

  const formData = new FormData();
  const file = fileInput.files[0];

  formData.append("image", file);
  uploadImgur(formData);
}

async function uploadImgur(formData) {
  try {
    const res = await axios({
      method: "POST",
      url: "https://api.imgur.com/3/image",
      data: formData,
      headers: {
        Authorization: "Client-ID 9deffd8e1209efa",
      },
      mimeType: "multipart/form-data",
    });

    images.push(res.data.data.link);
    imgRender();
    fileInput.removeAttribute("disabled");

    createToastMessage(res.data.success, "新增照片成功!!");
  } catch (error) {
    console.log(error);
    createToastMessage(false, error);
  }
}

function imgRender() {
  const str = images
    .map(
      (item) => `<div class="relative group cursor-pointer ">
    <button
      type="button"
      
      data-id="${item}"
      class="close group-hover:flex border rounded-full w-6 h-6 hidden justify-center items-center border-black hover:bg-red-400 hover:text-yellow-50 absolute -top-2 -right-2 bg-white"
    >
      <span class="material-icons pointer-events-none"> close </span>
    </button>
    <img
    referrerpolicy="no-referrer"
      class="object-contain w-full"
      src="${item}"
      alt=""
    />
  </div>`
    )
    .join("");
  imagesDom.innerHTML = str;

  const closeBtns = document.querySelectorAll(".close");

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      deletImg(e.target.dataset.id);
    });
  });
}

function deletImg(id) {
  const index = images.findIndex((item) => item === id);
  images.splice(index, 1);
  imgRender();
  createToastMessage(true, "刪除照片成功!!");
}

function createToastMessage(success, text) {
  Toastify({
    text: text,
    className: "info",
    close: true,
    style: {
      background: success
        ? "linear-gradient(to right, #00b09b, #96c93d)"
        : "linear-gradient(to right, #C63300, #880000)",
    },
  }).showToast();
}
