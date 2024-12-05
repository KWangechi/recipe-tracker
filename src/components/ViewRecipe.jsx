import { deleteRecipe } from "../store/useRecipeStore";

export default function ViewRecipe({
  selectedRecipe,
  setModalOpen,
  setViewRecipe,
}) {
  const handleDeleteRecipe = (selectedRecipeId) => {
    deleteRecipe(selectedRecipeId);
    alert("Success");
    setViewRecipe(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    // setSelectedRecipe(selectedRecipe);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden lg:max-w-4xl mt-6">
      {/* Image Section */}
      <img
        src={selectedRecipe?.imageUrl}
        alt={selectedRecipe.file?.name}
        className="w-full h-48 object-cover md:h-64"
      />

      <div className="absolute flex justify-between z-50 top-4 left-8">
        <div>
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title and Rating */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              {selectedRecipe?.name}
            </h3>
          </div>
          <div className="flex items-center text-red-500">
            <button onClick={() => handleDeleteRecipe(selectedRecipe?.id)}>
              Delete
            </button>
          </div>
        </div>

        {/* Recipe Info */}
        {/* <div className="flex justify-between text-sm text-gray-500 mt-4">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4m-4-4.5h-4"
              />
            </svg>
            10 mins
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v3m0 0v3m-4-3h8"
              />
            </svg>
            Medium
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6m-4-3h8m-8 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75"
              />
            </svg>
            512 cal
          </span>
        </div> */}

        {/* Description */}
        <p className="text-gray-600 text-sm mt-4">
          {selectedRecipe?.description}
        </p>

        {/* Ingredients */}
        {/* <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Ingredients</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            {selectedRecipe?.ingredients?.map((ingredient, index) => {
              return <li key={index}>{ingredient}</li>;
            })}
          </ul>
        </div> */}

        {/* Instructions */}
        <div className="mt-4">
          <h4 className="text-lg font-semibold text-gray-800">Instructions</h4>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            {selectedRecipe?.instructions?.map((instruction, index) => {
              return <li key={index}>{instruction}</li>;
            })}
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            className="w-full bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
            onClick={handleOpenModal}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
