// All Selectors

// Search Box
const searchMeal = document.querySelector("#search-meal");
const searchBtn = document.querySelector(".search-btn");
const showResult = document.querySelector(".result");

// Card Box
const main = document.querySelector("main");
const images = document.querySelector("#meal-images");

// Show Recipe Modal Box
const recipeDetails = document.querySelector(".recipe-details");
const recipeModal = document.querySelector(".recipe-modal");
const timesBtn = document.querySelector("#times-btn");
const watchBtn = document.querySelector(".watch-btn");
const backBtn = document.querySelector("#backside");

// Event Listener & Function

searchBtn.addEventListener("click", getRequest);
main.addEventListener("click", getMealRecipe);

function getRequest() {
  let inputMealResult = searchMeal.value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputMealResult}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
            <div class="meal-recipe" data-id="${meal.idMeal}">
            <div class="meal-img">
            <img
              id="meal-images"
              src="${meal.strMealThumb}"
              alt="meals"
            />
          </div>
          <div class="meal-name">${meal.strMeal}</div>
          <button class="recipe-btn">Recipe</button>
          </div>
          `;
        });
        main.classList.remove("notFound");
      } else {
        html = "Sorry, We Didn't Find Any Meal";
        main.classList.add("notFound");
      }
      main.innerHTML = html;
    });
}

// Show Meal Recipe || Show Modal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

// Create Modal
function mealRecipeModal(meal) {
  meal = meal[0];
  let html = `
          <h4 class="food-name">${meal.strMeal}</h4>
          <div class="food-img">
            <img
              src="${meal.strMealThumb}"
              alt="foods"
            />
          </div>
          <h4 class="preparation">Preparation:</h4>
          <p class="meal-text">${meal.strInstructions}</p>
          <div class="btns">
            <button class="watch-btn"><a href="${meal.strYoutube}" target="_blank">Watch In Youtube</a></button>
          <button class="backside" id="backside">Back</button>
          </div>
  `;

  recipeModal.innerHTML = html;
  recipeModal.parentElement.classList.add("showRecipe");
}

//  Remove Modal
timesBtn.addEventListener("click", removeModal);
function removeModal() {
  recipeModal.parentElement.classList.remove("showRecipe");
}

// Show Result
searchBtn.addEventListener("click", addClass);
function addClass() {
  showResult.classList.add("showResult");
}
