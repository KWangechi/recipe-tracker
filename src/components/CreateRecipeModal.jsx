import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { addRecipe, recipeCategories } from "../store/useRecipeStore";

export default function CreateRecipeModal(setOpen) {
//   const [open, setOpen] = useState(true);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    category: "",
    ingredients: [],
    instructions: [],
    image: "",
  });

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form action="">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Recipe Name */}
                <div className="sm:col-span-4">
                  <label
                    htmlFor="recipename"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Recipe Name
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="recipename"
                        name="recipename"
                        type="text"
                        placeholder="Tomato Salad"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      {recipeCategories.map((category) => {
                        return (
                          <option key={category.name} value={category.name}>
                            {category.label}
                          </option>
                        );
                      })}
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={2}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div className="col-span-full">
                  <label
                    htmlFor="instructions"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Instructions
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="instructions"
                      name="instructions"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                      required
                    />
                  </div>
                </div>

                {/* Ingredients */}
                <div className="col-span-full">
                  <label
                    htmlFor="ingredients"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Ingredients
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="ingredients"
                      name="ingredients"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                      required
                    />
                  </div>
                </div>

                {/* Photo */}
                <div className="col-span-full">
                  <label
                    htmlFor="recipe-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Recipe Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-300"
                      />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            {/* Buttons */}
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={addRecipe(recipe)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
