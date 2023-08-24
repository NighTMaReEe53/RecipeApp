const theInput = document.querySelector(".form input"),
  theIcon = document.querySelector(".form i"),
  theSectionArea = document.querySelector(".right-section"),
  theLightBox = document.querySelector(".light-box");


theIcon.addEventListener("click", getData);
theSectionArea.addEventListener("click", searchData);
function getData() {
  let theSearchName = theInput.value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${theSearchName}`)
    .then((res) => {
      let theData = res.json();
      return theData;
    })
    .then((meals) => {
      showData(meals);
    });
}

function showData(theData) {
  theSectionArea.innerHTML = "";
  if (theData.meals == null) {
    theSectionArea.innerHTML = "No Data To Show";
    return;
  }
  theData.meals.forEach((meal) => {
    theSectionArea.innerHTML += `
      <div class="content">
        <img src="${meal.strMealThumb}" loading="lazy" decoding="async">
        <div class="text">
          <h2>${meal.strMeal}</h2>
          <button class="theBtn" data-id=${meal.idMeal}>Get Recipe</button>
        </div>
      </div>
      `;
  });
}

function searchData(e) {
  if (e.target.classList.contains("theBtn")) {
    let theId = e.target.getAttribute("data-id");
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theId}`)
      .then((res) => {
        let theRes = res.json();
        return theRes;
      })
      .then((theId) => {
        getRecipeDetails(theId);
      });
  }
}

function getRecipeDetails(recipeDetails) {
  let theMeal = recipeDetails.meals[0];
  theLightBox.classList.add("show");
  console.log(theMeal)
  theLightBox.innerHTML = "";
  theLightBox.innerHTML = `
    <i class="fa-solid fa-x" onclick="deleteLight()"></i>
    <div class="box">
      <h2>${theMeal.strMeal}</h2>
      <span>Instructions</span>
      <p>${theMeal.strInstructions}</p>
      <a href="${theMeal.strYoutube}">Watch Video</a>
    </div>
  `;
}

function deleteLight() {
  theLightBox.classList.remove("show");
}
