const btn = document.querySelector(".btn-add");
const btn2 = document.querySelector(".btn-get");
const list = document.querySelector(".todos-list");

btn.addEventListener("click", addTodo);
btn2.addEventListener("click", getTodo);

function addTodo(e) {
  const title = document.querySelector("input").value;

  if (title === "") {
    alert("Please enter the title for the Todo!");
    return;
  } else {
    const bod = {
      title,
      completed: false,
    };
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(bod),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
}

function getTodo() {
  console.log("HI THERE");
  fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
    .then((res) => res.json())
    .then((data) => {
      list.innerHTML = "";
      console.log(data);
      data.forEach((todo) => {
        const item = document.createElement("li");
        const userId = document.createElement("p");
        userId.innerText = todo.userId;
        const id = document.createElement("p");
        id.innerText = todo.id;
        const title = document.createElement("p");
        title.innerText = todo.title;
        const completed = document.createElement("p");
        completed.innerText = todo.completed;
        item.appendChild(userId);
        item.appendChild(id);
        item.appendChild(title);
        item.appendChild(completed);
        console.log(item);
        list.appendChild(item);
      });
    });
}
