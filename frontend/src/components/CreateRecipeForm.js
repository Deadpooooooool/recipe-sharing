import React, { useState } from 'react';
import useRecipeStore from './useRecipeStore'; // Import your Zustand store

const CreateRecipeForm = () => {
  const [recipeData, setRecipeData] = useState({
    // Initialize form fields for creating a recipe
    title: '',
    ingredients: '',
    steps: '',
    cookingTime: '',
    difficultyLevel: '',
  });

  const createRecipe = useRecipeStore((state) => state.createRecipe); // Access the createRecipe action

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the createRecipe action with the recipeData
      await createRecipe(recipeData);
      // Optionally reset the form or perform other actions after successful creation
    } catch (error) {
      console.error('Failed to create recipe:', error);
      // Handle error
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="create-recipe-form" onSubmit={handleSubmit}>
      {/* Form fields for creating a recipe */}
      <input
        type="text"
        name="title"
        value={recipeData.title}
        onChange={handleChange}
        placeholder="Title"
      />
      {/* Add other form fields for ingredients, steps, cookingTime, difficultyLevel, etc. */}
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default CreateRecipeForm;
