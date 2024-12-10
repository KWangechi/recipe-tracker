import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  addRecipe,
  processImageUploaded,
  recipeCategories,
  updateRecipe,
} from "../store/useRecipeStore";

export default function CreateRecipeModal({ open, setOpen, selectedRecipe }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  const editMode = !!selectedRecipe;
  //   const [open, setOpen] = useState(true);
  const [recipe, setRecipe] = useState({
    name: editMode ? selectedRecipe?.name : "",
    description: editMode ? selectedRecipe?.description : "",
    category: editMode ? selectedRecipe?.category : "",
    ingredients: editMode ? selectedRecipe?.ingredients : [],
    instructions: editMode ? selectedRecipe?.instructions : [],
    file: editMode ? selectedRecipe?.file : null,
    imageUrl: editMode ? selectedRecipe?.imageUrl : photoUrl,
  });

  useEffect(() => {
    setPhotoUrl(selectedRecipe?.imageUrl);
  }, [selectedRecipe?.imageUrl]);

  const handlePhotoUploaded = async (e) => {
    const file = e.target.files[0];
    let imageUrl = "";

    if (file) {
      imageUrl = await processImageUploaded(file);
      setPhotoUrl(imageUrl);
    }

    setRecipe({ ...recipe, file, imageUrl });
  };

  const handleAddRecipe = () => {
    if (editMode) {
      updateRecipe(selectedRecipe?.id, recipe);
    } else {
      addRecipe(recipe);
    }

    alert("Success!");

    setPhotoUrl(null);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 min-w-56">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form action="" className="p-4">
              <h2 className="font-bold">
                {editMode ? `Edit ${selectedRecipe?.name}` : "Add A Recipe"}
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Recipe Name */}
                <div className="sm:col-span-6">
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
                        defaultValue={selectedRecipe?.name}
                        type="text"
                        placeholder="Tomato Salad"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6 h-10"
                        required
                        onChange={(e) =>
                          setRecipe({ ...recipe, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="sm:col-span-6">
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
                      className="h-10 col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      onChange={(e) =>
                        setRecipe({ ...recipe, category: e.target.value })
                      }
                      defaultValue={selectedRecipe?.category}
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
                      defaultValue={selectedRecipe?.description}
                      onChange={(e) =>
                        setRecipe({
                          ...recipe,
                          description: e.target.value,
                        })
                      }
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
                      defaultValue={selectedRecipe?.instructions}
                      onChange={(e) =>
                        setRecipe({
                          ...recipe,
                          instructions: e.target.value.split("\n"),
                        })
                      }
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
                      defaultValue={selectedRecipe?.ingredients}
                      required
                      onChange={(e) => {
                        setRecipe({
                          ...recipe,
                          ingredients: e.target.value.split("\n"),
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Photo */}
                <div className="col-span-full">
                  <label
                    htmlFor="recipe-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {photoUrl ? (
                        <img
                          src={photoUrl || selectedRecipe?.imageUrl}
                          width="100%"
                          height="auto"
                          className="rounded-lg h-56"
                        />
                      ) : (
                        <PhotoIcon
                          aria-hidden="true"
                          className="mx-auto size-12 text-gray-300"
                        />
                      )}
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
                            onChange={(e) => handlePhotoUploaded(e)}
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
                onClick={handleAddRecipe}
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {editMode ? "Save Changes" : "Submit"}
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
