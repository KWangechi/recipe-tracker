export let recipe = {};
export let recipes = [];

// const id = crypto.randomUUID();
export const recipeCategories = [
    {
        name: "dessert",
        label: "Dessert",
        icon: "/src/assets/dessert.png"
    },
    {
        name: "breakfast",
        label: "Breakfast",
        icon: "/src/assets/breakfast.png"
    },
    {
        name: "lunch",
        label: "Lunch",
        icon: "/src/assets/lunch.png"
    },
    {
        name: "dinner",
        label: "Dinner",
        icon: "/src/assets/dinner.png"
    },
    {
        name: "snacks",
        label: "Snacks",
        icon: "/src/assets/snacks.png"
    }
];

export function addRecipe(newRecipe) {
    console.log(newRecipe);
//   recipe = { id, ...newRecipe };
//   recipes.push(recipe);
//   localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function fetchAllRecipes() {
  return JSON.parse(localStorage.getItem("recipes"));
}

export function viewRecipe(recipeId) {
  fetchAllRecipes();

  return recipes.find((recipe) => recipe?.id === recipeId);
}

export function updateRecipe(recipeId, updatedRecipe) {
  fetchAllRecipes();

  let existingRecipe = recipes.find((recipe) => recipe?.id === recipeId);

  if (existingRecipe) {
    Object.assign(existingRecipe, updatedRecipe);
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }

  return existingRecipe;
}

export function deleteRecipe(recipeId) {
  fetchAllRecipes();

  let index = recipes.findIndex((recipe) => recipe?.id === recipeId);

  if (index > 0) {
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    fetchAllRecipes();
  }
}
