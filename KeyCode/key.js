window.addEventListener("keypress", (e) => {
  console.log(e.key);
  console.log(document.querySelector("li[name=box1]"));
  document.querySelector("div[name=box1]").textContent = e.key;
  document.querySelector("div[name=box2]").textContent = e.keyCode;
  document.querySelector("div[name=box3]").textContent = e.code;
});
