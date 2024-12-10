import { useState } from "react";
import { createPortal } from "react-dom";
import CreateRecipeModal from "./CreateRecipeModal";
import { deleteRecipe } from "../store/useRecipeStore";

export default function ViewRecipe({ selectedRecipe, setViewRecipe }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [viewMoreModalOpen, setViewMoreModalOpen] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleDragStart = () => {
    setDragging(true);
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const handleViewMore = () => {
    setViewMoreModalOpen(true);
  };

  const handleEditRecipe = () => {
    setEditModalOpen(true);
  };

  const handleDeleteRecipe = () => {
    deleteRecipe(selectedRecipe?.id);
    alert("Success");
    setDeleteModalOpen(false);
    setViewRecipe(false);
  };

  const handleBack = () => {
    setTimeout(() => {
      setViewRecipe(false);
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-4xl mt-6 relative cursor-move"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* Image Section */}
      <div className="flex justify-center mt-4">
        <img
          src={selectedRecipe?.imageUrl}
          alt={selectedRecipe?.file?.name || "Recipe Image"}
          className="h-40 object-cover md:h-54 w-full rounded-lg"
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
              onClick={() => setDeleteModalOpen(true)}
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
            {Array.isArray(selectedRecipe?.ingredients) &&
              selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mt-6">
          <h4 className="font-semibold text-lg">Instructions</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-2">
            {Array.isArray(selectedRecipe?.instructions) &&
              selectedRecipe.instructions
                .slice(0, 4)
                .map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
            {selectedRecipe?.instructions?.length > 4 && (
              <button onClick={handleViewMore} className="text-indigo-600 mt-2">
                View More
              </button>
            )}
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
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <CreateRecipeModal
            open={editModalOpen}
            setOpen={setEditModalOpen}
            selectedRecipe={selectedRecipe}
            setViewRecipe={setViewRecipe}
          />
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
              <h4 className="text-lg font-semibold mb-4">Delete Recipe</h4>
              <hr />
              <p className="text-sm">
                <span className="text-gray-500">
                  Are you sure you want to delete this recipe?
                </span>
                &nbsp;
                <span className="font-semibold">
                  This action cannot be undone!
                </span>
              </p>
              <div className="flex justify-between items-center gap-4 mt-4">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteRecipe}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View More Modal for Instructions */}
        {viewMoreModalOpen &&
          createPortal(
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
                <h4 className="text-lg font-semibold mb-4">
                  Full Instructions
                </h4>
                <ul className="space-y-2">
                  {selectedRecipe?.instructions?.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setViewMoreModalOpen(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
}
