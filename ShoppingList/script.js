const itemInput = document.querySelector(".btn");
itemInput.addEventListener("click", (e) => {
  e.preventDefault();
  const val = document.querySelector(".form-input").value;
  if (val === "") {
    alert("Please enter a value!");
    return;
  } else {
    const list = document.createElement("li");
    list.innerHTML = `
      ${val}
      <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark"></i>
      </button>`;
    document.querySelector("ul").appendChild(list);
  }
});
