import { useState } from "react";
import CreateRecipeModal from "./CreateRecipeModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export default function ViewRecipe({ selectedRecipe, setViewRecipe }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEditRecipe = () => {
    setEditModalOpen(true);
  };

  const handleDeleteRecipe = () => {
    setDeleteModalOpen(true);
  };

  const handleBack = () => {
    setTimeout(() => {
      setViewRecipe(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToClipboard = () => {
    // navigator.clipboard.writeText(selectedRecipe?.instructions);
    // alert("Instructions copied to clipboard!");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-4xl mt-6 relative">
      {/* Image Section */}
      <div className="flex justify-center mt-4">
        <img
          src={selectedRecipe?.imageUrl}
          alt={selectedRecipe?.file?.name || "Recipe Image"}
          className="h-40 object-fit md:h-54"
        />
      </div>

      <hr className="mt-4" />

      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="p-2 rounded-full bg-gray-300 shadow hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Actions */}
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">
            {selectedRecipe?.name || "Recipe Title"}
          </h3>
          <div className="flex items-center space-x-4">
            {/* Edit Button */}
            <button
              onClick={handleEditRecipe}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>

            {/* Delete Button */}
            <button
              onClick={handleDeleteRecipe}
              className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Description</h4>
          <p className="text-gray-600 text-sm mt-1">
            {selectedRecipe?.description || "No description available."}
          </p>
        </div>

        {/* Ingredients */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Ingredients</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            {typeof selectedRecipe.ingredients == "object" &&
              selectedRecipe?.ingredients?.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h4 className="font-semibold text-lg">Instructions</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-2">
            {selectedRecipe?.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            )) || <li>No instructions provided.</li>}
          </ul>
        </div>

        {/* Actions */}
        <div className="mt-10 flex justify-start gap-4">
          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-medium rounded-lg shadow hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5h7.5a2.25 2.25 0 0 1 2.25 2.25v4.5h-12V6.75A2.25 2.25 0 0 1 8.25 4.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.75 9.75h1.5a2.25 2.25 0 0 1 2.25 2.25v4.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 16.5v-4.5a2.25 2.25 0 0 1 2.25-2.25h1.5"
              />
            </svg>
            Print
          </button>

          {/* Copy to Clipboard Button */}
          <button
            onClick={handleCopyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg shadow hover:bg-indigo-600 transition"
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
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
            Copy
          </button>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <CreateRecipeModal
            open={editModalOpen}
            setOpen={setEditModalOpen}
            selectedRecipe={selectedRecipe}
          />
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <DeleteConfirmationModal
            setOpen={setDeleteModalOpen}
            open={deleteModalOpen}
            recipeToDelete={selectedRecipe}
          />
        )}
      </div>
    </div>
  );
}
