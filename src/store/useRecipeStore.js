export let recipe = {};
export let recipes = [];
export let featuredRecipe = {};

const id = crypto.randomUUID();
export const recipeCategories = [
  {
    name: "dessert",
    label: "Dessert",
    icon: "/src/assets/dessert.png",
  },
  {
    name: "breakfast",
    label: "Breakfast",
    icon: "/src/assets/breakfast.png",
  },
  {
    name: "lunch",
    label: "Lunch",
    icon: "/src/assets/lunch.png",
  },
  {
    name: "dinner",
    label: "Dinner",
    icon: "/src/assets/dinner.png",
  },
  {
    name: "snacks",
    label: "Snacks",
    icon: "/src/assets/snacks.png",
  },
];

export function processImageUploaded(recipeImage) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result); // Resolves with the Data URL of the image
      } else {
        reject("Something went wrong while reading the file."); // Rejects in case of an error
      }
    };

    reader.onerror = () => {
      reject("Error occurred while reading the file.");
    };

    reader.readAsDataURL(recipeImage);
  });
}

export function searchRecipes(search) {
  fetchAllRecipes();
  const filteredRecipes = search
    ? recipes.filter((recipe) => {
        return Object.values(recipe).some(
          (value) =>
            typeof value !== "object" &&
            String(value).toLowerCase().includes(search.toLowerCase())
        );
      })
    : [...recipes];
  recipes = [...filteredRecipes];
  return recipes;
}

export const filterRecipes = (recipes, selectedCategories) => {
  if (!selectedCategories.length) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    return selectedCategories.includes(recipe.category);
  });
};

export function addRecipe(newRecipe) {
  console.log(newRecipe);
  recipe = { id, ...newRecipe };
  recipes.push(recipe);
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

export function fetchAllRecipes() {
  recipes = JSON.parse(localStorage.getItem("recipes"));

  // randomly select an recipe and set it as featureRecipe
  featuredRecipe = recipes[Math.floor(Math.random() * recipes.length)] || {};
  console.log("Get All recipes", recipes);
  return recipes;
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
