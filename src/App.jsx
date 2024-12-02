import { useState } from "react";
import "./App.css";
import CreateRecipeModal from "./components/CreateRecipeModal";
import { recipeCategories, recipes } from "./store/useRecipeStore";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="rounded-lg w-1/2 my-5 mx-auto text-black p-8 shadow-lg">
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
            placeholder="Search any recipes"
            className="block min-w-0 grow pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 rounded-xl py-2"
          />
          <div className="grid shrink-0 grid-cols-1 focus-within:relative"></div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between align-middle">
            <div className="font-bold text-xl">Categories</div>
            <div className="">
              <span className="text-green-400 text-lg font-bold">See All</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between overflow-x-auto">
            {recipeCategories.map((category, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 rounded-xl shadow-2xl shadow-green-300 bg-green-500 text-white font-bold"
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

        <div className="mt-6">
          <div className="flex justify-between align-middle">
            <span className="font-bold text-xl">Recipes</span>
            <div className="">
              <span
                className="text-green-400 text-lg font-bold cursor-pointer"
                onClick={() => {
                  return <CreateRecipeModal setOpen={() => setOpen(!open)} />;
                }}
              >
                Add Recipe
              </span>
            </div>
          </div>

          <div className="mt-4 flex justify-between overflow-x-auto">
            {recipes.map((recipe, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center px-3 py-2 rounded-xl shadow-2xl shadow-green-300 bg-green-500 text-white font-bold"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.image}
                    width={"20px"}
                    height="20px"
                  />
                  <span className="ml-2 text-md text-center">
                    {recipe.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
