class CalorieTracker {
  constructor() {
    this._meals = [];
    this._workouts = [];
    this._calorieLimit = 1500;
    this._totalCalories = 0;
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }
  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id == id);
    console.log(id);
    console.log(index);
    if (index != -1) {
      const meal = this._meals[index];
      this._totalCalories -= meal.calories;
      this._meals.splice(index, 1);
      console.log(this._meals);
      this._render();
    }
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id == id);
    console.log(id);
    console.log(index);
    if (index != -1) {
      const workout = this._workouts[index];
      this._totalCalories += workout.calories;
      this._workouts.splice(index, 1);
      console.log(this._workouts);
      this._render();
    }
  }

  _displayCaloriesTotal() {
    const div = document.querySelector("#calories-total");
    div.innerText = this._totalCalories;
  }
  _displayCaloriesLimit() {
    const div = document.querySelector("#calories-limit");
    div.innerText = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const totalConsumed = this._meals.reduce(
      (prev, curr) => prev + curr.calories,
      0
    );
    const div = document.querySelector("#calories-consumed");
    div.innerText = totalConsumed;
  }

  _displayCaloriesBurned() {
    const totalBurned = this._workouts.reduce(
      (prev, curr) => prev + curr.calories,
      0
    );
    const div = document.querySelector("#calories-burned");
    div.innerText = totalBurned;
  }

  _displayCaloriesRemaining() {
    const total = this._calorieLimit - this._totalCalories;
    console.log(total);
    const div = document.getElementById("calories-remaining");
    const div2 = document.querySelector("#calorie-progress");
    div.innerText = total;

    if (total <= 0) {
      div.parentElement.parentElement.classList.remove("bg-light");
      div.parentElement.parentElement.classList.add("bg-danger");
      div2.classList.remove("bg-success");
      div2.classList.add("bg-danger");
    } else {
      div.parentElement.parentElement.classList.add("bg-light");
      div.parentElement.parentElement.classList.remove("bg-danger");
      div2.classList.add("bg-success");
      div2.classList.remove("bg-danger");
    }
  }

  _displayCaloriesProgress() {
    const percentage = (this._totalCalories / this._calorieLimit) * 100;
    console.log(percentage);
    let val = Math.min(percentage, 100);
    if (val < 0) {
      val = 0;
    }
    const div = document.querySelector("#calorie-progress");
    div.style.width = `${val}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}
class Workout {
  constructor(name, calories) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();
    document
      .querySelector("section.items")
      .addEventListener("submit", this._newItem.bind(this));
    document
      .querySelector("#meal-items")
      .addEventListener("click", this._removeItem.bind(this, "meal"));
    document
      .querySelector("#workout-items")
      .addEventListener("click", this._removeItem.bind(this, "workout"));
  }

  _removeItem(type, e) {
    if (
      e.target.classList.contains("delete") ||
      e.target.classList.contains("fa-xmark")
    ) {
      const id = e.target.closest(".card").getAttribute("data-id");
      console.log(id);
      type == "meal"
        ? this._tracker.removeMeal(id)
        : this._tracker.removeWorkout(id);
      e.target.closest(".card").remove();
    }
  }

  _newItem(e) {
    e.preventDefault();
    if (e.target.id === "meal-form") {
      const meal = document.querySelector("#meal-name");
      const calories = document.querySelector("#meal-calories");

      if (meal.value == "" || calories.value == "") {
        alert("Please Fill All the Fields!");
        return;
      }
      const newMeal = new Meal(meal.value, Number(calories.value));
      this._tracker.addMeal(newMeal);
      const collapseMeal = document.querySelector("#collapse-meal");
      const bsCollapse = new bootstrap.Collapse(collapseMeal, {
        toggle: true,
      });
      console.log(newMeal);
      const mealItems = document.querySelector("#meal-items");
      const child = document.createElement("div");
      child.classList.add("card", "my-2");
      child.setAttribute("data-id", newMeal.id);
      child.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${meal.value}</h4>
                  <div
                    class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${calories.value}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>`;
      mealItems.appendChild(child);
      meal.value = "";
      calories.value = "";
    } else if (e.target.id === "workout-form") {
      const workout = document.querySelector("#workout-name");
      const calories = document.querySelector("#workout-calories");

      if (workout.value == "" || calories.value == "") {
        alert("Please Fill All the Fields!");
        return;
      }
      const newWorkout = new Workout(workout.value, Number(calories.value));
      this._tracker.addWorkout(newWorkout);

      console.log(newWorkout);
      const collapseWorkout = document.querySelector("#collapse-workout");
      const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
        toggle: true,
      });
      const mealItems = document.querySelector("#workout-items");
      const child = document.createElement("div");
      child.classList.add("card");
      child.classList.add("my-2");
      child.setAttribute("data-id", newWorkout.id);
      child.innerHTML = `<div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h4 class="mx-1">${workout.value}</h4>
                  <div
                    class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
                  >
                    ${calories.value}
                  </div>
                  <button class="delete btn btn-danger btn-sm mx-2">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                </div>`;
      mealItems.appendChild(child);
      workout.value = "";
      calories.value = "";
    }
  }
}

const app = new App();
