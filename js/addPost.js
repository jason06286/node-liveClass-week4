const contentDom = document.querySelector("#content");
const submitBtn = document.querySelector("#btn");

const url = "https://stormy-plateau-16452.herokuapp.com/posts";

submitBtn.addEventListener("click", (e) => {
  if (!contentDom.value) return alert("請輸入內容!!");
  upLoadPost();
});

async function upLoadPost() {
  const { value } = contentDom;
  try {
    const res = await axios.post(url, {
      userName: "蠟筆小新",
      // 貼文者姓名，必填
      userPhoto:
        "https://storage.googleapis.com/vue-course-api.appspot.com/supergems/1650355390909.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OYVx2C6Ux2ukJD9RsvkNGZ%2FtZUxAMhCHOHoF4aP8rNqkIlVipHhHiBiM7Zy%2B44wI%2Bes%2BpvNXaI5t%2BmuELFQ8OWHWoso7QKwJMhiQseyPLr6Bt7RI2UcorBuqWeDF8E1aNJx2UsqyWYUgYEh8WQjndtlBu2qrZp31mTzflLKfHW1OiNBwVWtefC9UQInZzjz9nt0RxE4vK6Q3QZsCtBdp%2FqvSmYtrBqj7pwTt6gWfMQ%2BWamCI%2F5dxC1TKkzZNGIqP6v2tQp87j0Ln6Ka4alTihzZHr1i0iMJM5BcHoyvmpGV1du7rMRHkK%2FfHAgU%2BrTkuHYn8M9Mw23HB1%2B27Xvq7YA%3D%3D",
      // 貼文者圖片
      discussContent: value,
      // 貼文，必填
      discussPhoto:
        "https://storage.googleapis.com/vue-course-api.appspot.com/supergems/1650354324377.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dSzg6SiXf539bQUM%2BBl0U0A%2BanoITFRrwDIF%2FAoO2LP8SWAwsguyZuCsZbGbK1S9RzxD%2BOoaxazxJFHVjyaXw2bBvle2AKEqsOvsiqJS4FN3JuS%2Bjx39QZJGf0O2xXxx2QKuey4VjbcYWpcAWRunCwb5XnCqTHpLTj6ipnltJnQrJEkX70QC0N8Z26uFHC1SVpV1r2rjoGUu9UnLEJmdv8EAQdmGGeq8zzGPDvKOFbtsw6K2ZO%2B8UepPoHetQZ%2BA3wiDXyObFUrEkatVBahxx4Pt3Cxap3Sx5gQgybD%2BdW3zsEBPnop24xao9NIGEr%2BkBUUAymx%2BGot%2FY9ybEp18Bg%3D%3D",
      // 貼圖
    });
    contentDom.value = "";
    res.data.status === "success"
      ? alert("新增貼文成功!!")
      : alert("新增貼文失敗");
  } catch (error) {
    console.log(error);
  }
}
