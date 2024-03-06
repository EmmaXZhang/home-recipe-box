let addBtn = document.getElementById("addIngredient");
let ingredientList = document.querySelector(".ingredientList");
// let ingredientDiv = document.querySelectorAll(".ingredientDiv")[0];

if (addBtn) {
  addBtn.addEventListener("click", function () {
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

// sending HTTP PUT request to server
document
  .getElementById("checkboxForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Get all checked checkboxes and extract their values into an array
    const checkedCheckboxes = Array.from(
      document.querySelectorAll('input[name="ingredient"]:checked')
    ).map((checkbox) => checkbox.value);

    //get path component of the current URL
    var path = window.location.pathname;
    //extract the ID from the path
    //\/shoppinglists\/ -> string "/shoppinglists/" ，(\w+) ->matches one or more word characters
    var match = path.match(/^\/shoppinglists\/(\w+)/);

    if (match) {
      var shoppinglistId = match[1]; // Extract the ID from the match

      // make HTTP PUT (update) requests to the server.
      fetch(`/shoppinglists/${shoppinglistId}`, {
        method: "PUT",
        // request type is JSON
        headers: {
          "Content-Type": "application/json",
        },
        //transfer req body as JSON string format
        body: JSON.stringify({ checkedIngredients: checkedCheckboxes }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log("Response from backend:", data);
          // Redirect to the shoppinglists page after successful update
          window.location.href = "/shoppinglists";
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  });

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);
