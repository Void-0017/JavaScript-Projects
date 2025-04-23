const itemInput = document.querySelector(".btn");
const closeIcons = document.querySelectorAll("i");
const clearItems = document.querySelector("#clear");

clearItems.addEventListener("click", () => {
  const itemList = document.querySelector("ul");
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
});

closeIcons.forEach((icon) => {
  icon.addEventListener("click", removeItem);
});

function removeItem(e) {
  // console.log(e.currentTarget.parentNode.parentNode);
  document
    .querySelector("ul")
    .removeChild(e.currentTarget.parentNode.parentNode);
}

itemInput.addEventListener("click", (e) => {
  e.preventDefault();
  const val = document.querySelector(".form-input").value;
  if (val === "") {
    alert("Please enter a value!");
    return;
  } else {
    const list = document.createElement("li");
    const button = document.createElement("button");
    button.className = "remove-item btn-link text-red";
    const text = document.createTextNode(val);
    list.appendChild(text);
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    icon.addEventListener("click", removeItem);
    button.appendChild(icon);
    list.appendChild(button);
    document.querySelector("ul").appendChild(list);
  }
});
