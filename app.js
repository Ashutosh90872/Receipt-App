const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipe_container=document.querySelector('.recipe-container');
const recipeDetailContent=document.querySelector('.recipe-detail-content');
const recipeCloseBtn=document.querySelector('.recipe-close-btn');

const fetchApi=async(query) =>{
    recipe_container.innerHTML="<h2>Fetching Data....</h2>";
   const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
   
   const response=await data.json();
   console.log(response);
   recipe_container.innerHTML="";
   response.meals.forEach(meal =>{
    const recipeDiv=document.createElement('recipe');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p>${meal.strArea} Dish</p>
    <p>Belong to ${meal.strCategory} Category</p>
    `
    const button=document.createElement('button');
    button.textContent="View Recipe";
    recipeDiv.appendChild(button);

    button.addEventListener('click', () =>{
        openRecipePopup(meal);
        console.log(meal);
    });
    recipe_container.appendChild(recipeDiv);
});  
};

const fetchIngredient=(meal) =>{
    let ingedientList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingedientList +=`<li>${measure} ${ingredient}</li>`;
        }else{
            break;
        }
    }
    return ingedientList;
}
const openRecipePopup=(meal) =>{
    recipeDetailContent.innerHTML=`
    <h2 class="heading">${meal.strMeal}</h2>
    <h3 class="main-heading">Instruction</h3>
    <ul>${fetchIngredient(meal)}</ul>
    <h3 class="main-heading">How to prepare</h3>
     <div>${meal.
        strInstructions
        }</div>
    `
    recipeDetailContent.parentElement.style.display="block";
}
recipeCloseBtn.addEventListener('click', () =>{
    recipeDetailContent.parentElement.style.display="none";
})
searchBtn.addEventListener('click',(e) =>{
    e.preventDefault();
    const searchSpace=searchBox.value.trim();
    fetchApi(searchSpace);
});