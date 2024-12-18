import { useEffect, useMemo, useState } from "react";
import "./App.css";
import CreateRecipeModal from "./components/CreateRecipeModal";
import { fetchAllRecipes, recipeCategories } from "./store/useRecipeStore";
import ViewRecipe from "./components/ViewRecipe";
import { DarkModeButton } from "./components/DarkModeButton";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [viewRecipe, setViewRecipe] = useState(false);
  const [featuredRecipe, setFeaturedRecipe] = useState({});
  const [selectedRecipe, setSelectedRecipe] = useState({});

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(filteredRecipes));
    alert("Instructions copied to clipboard!");
  };

  function handleOpenCreateModal() {
    setModalOpen(true);
  }

  function handleSearch(e) {
    const value = e.target.value;
    // create a regex such that only numbers and letters are allowed
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(value)) {
      alert("Invalid search term. Please use only letters and numbers");
      return;
    }
    setSearchTerm(value.toString());
  }

  function clearSearch() {
    setSearchTerm("");
  }

  // Fetch recipes from local storage when the component is mounted
  useEffect(() => {
    if (!viewRecipe) {
      setFilteredRecipes(fetchAllRecipes());
    }
  }, [viewRecipe]);

  useMemo(() => {
    // Fetch featured recipe when the component is mounted
    const allRecipes = fetchAllRecipes();
    setFeaturedRecipe(
      allRecipes?.[Math.floor(Math.random() * allRecipes?.length)] || {}
    );
  }, []);

  // Fetch recipes from local storage when the component is mounted
  useEffect(() => {
    const fetchRecipes = async () => {
      const allRecipes = fetchAllRecipes(); // Assuming fetchAllRecipes() is an async function that fetches recipes from local storage

      const filteredBySearch = searchTerm
        ? allRecipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : allRecipes;

      const filteredByCategory = selectedCategory
        ? filteredBySearch.filter(
            (recipe) => recipe.category === selectedCategory
          )
        : filteredBySearch;

      setFilteredRecipes(filteredByCategory);
    };

    fetchRecipes();
  }, [searchTerm, selectedCategory]);

  return (
    <>
      {viewRecipe ? (
        <ViewRecipe
          selectedRecipe={selectedRecipe}
          setModalOpen={setModalOpen}
          setViewRecipe={setViewRecipe}
        />
      ) : (
        <div className="rounded-lg my-5 mx-auto p-8 shadow-lg max-w-screen-lg">
          {/* Title Section */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-center font-bold">
              What would you like to cook today?
            </h1>

            <div className="flex justify-end">
              <DarkModeButton />
            </div>
          </div>

          {/* Search Input Section */}
          <div className="flex items-center rounded-md mt-4 bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-green-400">
            <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm">
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
              onChange={(e) => handleSearch(e)}
              placeholder="Search for recipes"
              className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            />
            {searchTerm && (
              <div
                className="grid shrink-0 grid-cols-1 mr-4 cursor-pointer"
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
            )}
          </div>

          {/* Featured Recipe Section */}
          <div className="mt-4">
            <h2 className="text-xl font-bold text-center mb-4">
              Featured Recipe
            </h2>
            <div className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-r from-green-600 to-gray-200 text-white p-6">
              <img
                src={featuredRecipe?.imageUrl}
                alt="Featured Recipe"
                className="object-cover rounded-lg w-full h-48 sm:h-56 md:h-64"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-bold">{featuredRecipe?.name}</h3>
                <p className="text-sm mt-2 text-gray-200">
                  {featuredRecipe?.description ||
                    "Discover this amazing recipe"}
                </p>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-yellow-400 text-black px-6 py-2 font-bold rounded-full shadow-md hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-500"
                  onClick={() => {
                    setSelectedRecipe(featuredRecipe);
                    setViewRecipe(true);
                  }}
                >
                  View Recipe
                </button>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <div className="font-bold text-xl">Categories</div>
              <span
                className="text-green-400 text-md font-semibold cursor-pointer italic"
                onClick={() => setSelectedCategory(null)}
              >
                Clear All
              </span>
            </div>
            <div className="flex justify-between overflow-x-auto mt-4 gap-6">
              {recipeCategories.map((category, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items-center align-middle px-4 py-2 rounded-lg shadow-2xl font-bold cursor-pointer mb-4
            ${
              selectedCategory === category.name
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-black"
            }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <img
                      src={category.icon}
                      alt={category.label}
                      width="20px"
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

          {/* Recipes Section */}
          {filteredRecipes.length ? (
            <div className="mt-12">
              <div className="flex items-center justify-between">
                <div className="flex justify-start">
                  <span className="font-bold text-xl">Recipes</span>
                </div>

                <div className="flex justify-end gap-4">
                  <span
                    className="text-green-400 text-lg font-bold cursor-pointer"
                    onClick={handleOpenCreateModal}
                  >
                    Add Recipe
                  </span>

                  {/* Copy to Clipboard Button */}
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-2 px-4 py-2 bg-green-300 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
              </div>

              {/* Add Recipe Modal */}
              <CreateRecipeModal setOpen={setModalOpen} open={modalOpen} />
              <div className="my-4 flex justify-start gap-6 overflow-x-auto pb-4">
                {filteredRecipes?.map((recipe, index) => {
                  return (
                    <div
                      key={index}
                      className="px-5 py-2 rounded-xl text-black font-bold cursor-pointer min-w-[200px] max-w-[240px] flex-shrink-0"
                      onClick={() => {
                        setViewRecipe(true);
                        setSelectedRecipe(recipe);
                      }}
                    >
                      <img
                        src={recipe.imageUrl}
                        alt="Recipe Photo"
                        className="rounded-lg w-full h-40 object-cover"
                      />
                      <p className="ml-2 text-md text-center italic font-semibold">
                        {recipe.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-bold">No recipes found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
