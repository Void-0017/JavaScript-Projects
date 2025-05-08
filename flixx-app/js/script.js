//Key:

const stack = {
  currentPage: window.location.pathname,
};

async function fetchData() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular");
  console.log(res);
  const data = await res.json();
  console.log(data);
}

function activePage() {
  console.log(document.querySelectorAll(".nav-link"));
  const nodes = document.querySelectorAll(".nav-link");
  nodes.forEach((links) => {
    if (links.getAttribute("href") === stack.currentPage) {
      links.classList.add("active");
    } else {
      links.classList.remove("active");
    }
  });
}

function init() {
  fetchData();
  activePage();
  console.log(stack.currentPage);
  switch (stack.currentPage) {
    case "/":
    case "/index.html":
      console.log("Home");
      break;
    case "/shows.html":
      console.log("Show");
      break;
    case "/movie-details.html":
      console.log("MD");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
}

document.addEventListener("DOMContentLoaded", init);
