import { useEffect, useState } from "react";
import "./App.css";
import CreateRecipeModal from "./components/CreateRecipeModal";
import {
  featuredRecipe,
  fetchAllRecipes,
  filterRecipes,
  recipeCategories,
  searchRecipes,
} from "./store/useRecipeStore";
import ViewRecipe from "./components/ViewRecipe";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [viewRecipe, setViewRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState({});

  function handleOpenCreateModal() {
    setModalOpen(true);
  }

  function clearSearch() {
    setSearchTerm("");
  }

  // Fetch recipes from local storage when the component is mounted
  useEffect(() => {
    setFilteredRecipes(fetchAllRecipes());
  }, []);

  // Filter recipes based on the search term
  useEffect(() => {
    setFilteredRecipes(searchRecipes(searchTerm));
  }, [searchTerm]);

  // Filter recipes based on the category filter
  useEffect(() => {
    setFilteredRecipes(filterRecipes(fetchAllRecipes(), selectedCategory));
  }, [selectedCategory]);

  return (
    <>
      {viewRecipe ? (
        <ViewRecipe
          selectedRecipe={selectedRecipe}
          setModalOpen={setModalOpen}
          setViewRecipe={setViewRecipe}
        />
      ) : (
        <div className="rounded-lg w-1/2 my-5 mx-auto text-black p-8 shadow-lg sm:w-full">
          <div className="flex justify-between">
            <h1 className="text-2xl text-center font-bold text-wrap">
              What would you like to cook today?
            </h1>
          </div>
          <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600 mt-5">
            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              id="search"
              name="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for recipes"
              className="block min-w-0 grow pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-xl py-2"
            />
            {searchTerm ? (
              <div
                className="grid shrink-0 grid-cols-1 focus-within:relative mr-4 cursor-pointer"
                onClick={clearSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
            ) : null}
          </div>
          {/* Featured Recipe */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              Featured Recipe
            </h2>
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-green-600 to-grey-200 text-white p-6">
              {/* Image */}
              <img
                src={featuredRecipe?.imageUrl} // Replace with your recipe image
                alt="Featured Recipe"
                className="object-cover rounded-lg"
                width={'100px'}
              />

              {/* Text Content */}
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{featuredRecipe?.name}</h3>
                <p className="text-sm mt-2 text-gray-200">
                  {featuredRecipe?.description ||
                    "Discover this amazing recipe"}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex justify-center">
                <button className="bg-yellow-400 text-black px-6 py-2 font-bold rounded-full shadow-md hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500">
                  View Recipe
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <div className="flex justify-between align-middle">
              <div className="font-bold text-xl">Categories</div>
              <div className="">
                <span
                  className="text-green-400 text-md font-semibold cursor-pointer italic"
                  onClick={() => setSelectedCategory(null)}
                >
                  Clear All
                </span>
              </div>
            </div>

            <div className="grid lg:grid-cols-5 sm:grid-cols-3 overflow-x-auto my-2 py-4 gap-x-4">
              {recipeCategories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center px-4 py-3 rounded-xl shadow-2xl font-bold cursor-pointer
                    ${
                      selectedCategory === category.name
                        ? "bg-green-600 text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => {
                      setSelectedCategory(category.name);
                    }}
                  >
                    <img
                      src={category.icon}
                      alt={category.icon}
                      width={"20px"}
                      height="20px"
                    />
                    <span className="ml-2 text-md text-center">
                      {category.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recipes */}
          <div className="mt-12">
            <div className="flex justify-between align-middle">
              <span className="font-bold text-xl">Recipes</span>
              <div className="">
                <span
                  className="text-green-400 text-lg font-bold cursor-pointer"
                  onClick={handleOpenCreateModal}
                >
                  Add Recipe
                </span>
              </div>
            </div>

            <CreateRecipeModal setOpen={setModalOpen} open={modalOpen} />

            <div className="my-4 grid lg:grid-cols-4 sm:grid-cols-2 p-4 gap-y-6 gap-x-4">
              {filteredRecipes?.map((recipe, index) => {
                return (
                  <div
                    key={index}
                    className="flex-col justify-items-center items-center align-middle px-5 py-2 rounded-xl text-black font-bold w-fit h-auto cursor-pointer"
                    onClick={() => {
                      setViewRecipe(true);
                      setSelectedRecipe(recipe);
                    }}
                  >
                    <img
                      src={recipe.imageUrl}
                      alt="Recipe Photo"
                      className="rounded-lg"
                    />
                    <p className="ml-2 text-md text-center italic font-semibold w-auto h-1/2">
                      {recipe.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
