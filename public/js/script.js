let addIngredientsBtn = document.getElementById('addIngredientsBtn');

let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelector('.ingredientDiv');

addIngredientsBtn.addEventListener('click',()=>{
    let newIngredient = ingredientDiv.cloneNode(true);
    let input = newIngredient.getElementsByTagName('input')[0];
    input.value='';
    ingredientList.appendChild(newIngredient);
});

const remove =()=>{
    
}
