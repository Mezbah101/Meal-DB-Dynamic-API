/*  ***Take value from user and Load data*** */


const searchFood = async () => { 


  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  // console.log(searchText);
if (searchText == "") {

  document.getElementById("meal-details").textContent = ""

  document.getElementById("search-result").textContent = " ";

  
}

else {


  searchField.value= "";
 

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`

 const res = await fetch (url)
 const data = await res.json()
 displaySearchResult(data.meals)


//  *** Normal Way to Fetch Data ***
 
//  fetch (url)
//  .then(res => res.json())
//  .then (data => displaySearchResult(data.meals));

}

}


/*  ***Display Search Result***
 */


const displaySearchResult = meals => {
  
const resultContainer = document.getElementById("search-result");
resultContainer.textContent = " "
if (meals==null) {
  const div = document.createElement ("div")
  div.innerHTML = `<h3> Sorry!! No result result is found. </h3>`
//  const text = document.createElement("h3").innerText = "Sorry! No result is found."
 document.getElementById("search-result").textContent = ""
 document.getElementById("meal-details").textContent = ""
 resultContainer.appendChild(div)
  
}


else {

  meals.forEach(meal => {
 

    const div = document.createElement ("div")
    div.classList.add("col")
    div.innerHTML =
     `
    <div onclick= "loadDetails(${parseInt(meal.idMeal)})" class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
      </div>`
        
    
      resultContainer.appendChild(div);
    });
}

}

/*  ****Load Details **** */



const loadDetails = mealID => {
  // console.log(mealID);
 
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`

console.log(url);

fetch(url)
.then(res => res.json())
.then (data => displayDetails(data.meals[0]))

} 



/*  ***Display Details***  */


const displayDetails = meal => {
console.log(meal);
const detailContainer = document.getElementById("meal-details")
detailContainer.textContent = " "
const div = document.createElement("div")

div.classList.add ("card")
div.innerHTML = `<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${meal.strMeal}</h5>
  <p class="card-text">${meal.strInstructions.slice(0,140)}</p>
   <a target="_blank" href="${meal.strYoutube} role="button" class ="btn btn-primary" > Watch Video </a>
   </div>`
  

   detailContainer.appendChild(div)
   
}

