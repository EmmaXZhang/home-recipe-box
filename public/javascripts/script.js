let addBtn = document.getElementById("addIngredient");
let ingredientList = document.querySelector(".ingredientList");
// let ingredientDiv = document.querySelectorAll(".ingredientDiv")[0];

if (addBtn) {
  addBtn.addEventListener("click", function () {
    // //creates a copy of the ingredientDiv element(include its attribute and its descendants)
    // //original one remain on page
    // let newIngredient = ingredientDiv.cloneNode(true);
    // // find all <input> elements , get first one
    // let input = newIngredient.getElementsByTagName("input")[0];
    // input.value = "";
    // ingredientList.appendChild(newIngredient);

    let ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("ingredientsDiv");
    let input = document.createElement("input");
    input.type = "Text";
    input.name = "ingredients";
    input.classList.add("form-control");
    ingredientDiv.appendChild(input);
    ingredientList.appendChild(ingredientDiv);
  });
} else {
  console.error("add button is not ready");
}
