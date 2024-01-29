import React, { useState } from 'react';
import useRecipeStore from "../store/userStore";

const RecipeForm = () => {

  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    cookingTime: '',
    difficultyLevel: '',
    ingredients: [''],
    steps: [''],
    tag: [''],
  });

  const getAuthToken =localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...recipeData.ingredients];
    updatedIngredients[index] = value;
    setRecipeData((prevData) => ({ ...prevData, ingredients: updatedIngredients }));
  };

  const handleTagChange = (index, value) => {
    const updatedTag = [...recipeData.tag];
    updatedTag[index] = value;
    setRecipeData((prevData) => ({ ...prevData, tag: updatedTag }));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...recipeData.steps];
    updatedSteps[index] = value;
    setRecipeData((prevData) => ({ ...prevData, steps: updatedSteps }));
  };

  const handleAddIngredient = () => {
    setRecipeData((prevData) => ({ ...prevData, ingredients: [...prevData.ingredients, ''] }));
  };

  const handleAddtag = () => {
    setRecipeData((prevData) => ({ ...prevData, tag: [...prevData.tag, ''] }));
  };

  const handleAddStep = () => {
    setRecipeData((prevData) => ({ ...prevData, steps: [...prevData.steps, ''] }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRecipeData((prevData) => ({ ...prevData, image: selectedImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      await useRecipeStore.getState().createRecipe(recipeData, getAuthToken);

      setRecipeData({
        title: '',
        description: '',
        cookingTime: '',
        difficultyLevel: '',
        ingredients: [''],
        steps: [''],
        tag: [''],
      });

      console.log('Recipe created successfully!');
    } catch (error) {
      console.error('Failed to create recipe:', error);
     
    }
  };


  return (
    <div className="container mt-5">
      <h2 className="mb-4">Recipe Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                value={recipeData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Ingredients</label>
              {recipeData.ingredients.map((ingredient, index) => (
                <input
                  key={index}
                  className="form-control mb-2"
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
              ))}
              <button type="button" className="btn btn-outline-primary" onClick={handleAddIngredient}>
                Add Ingredient
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label">Steps</label>
              {recipeData.steps.map((step, index) => (
                <input
                  key={index}
                  className="form-control mb-2"
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                />
              ))}
              <button type="button" className="btn btn-outline-primary" onClick={handleAddStep}>
                Add Step
              </button>
            </div>
            <div className="mb-3">
              <label className="form-label">Tags</label>
              {recipeData.tag.map((tag, index) => (
                <input
                  key={index}
                  className="form-control mb-2"
                  type="text"
                  value={tag}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
              ))}
              <button type="button" className="btn btn-outline-primary" onClick={handleAddtag}>
                Add Tag
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Image</label>
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
       
            <div className="mb-3">
              <label className="form-label">Cooking Time</label>
              <input className="form-control" type="text"  />
            </div>
            <div className="mb-3">
  <label className="form-label">Difficulty Level</label>
  <select className="form-select" name="difficultyLevel" value={recipeData.difficultyLevel} onChange={handleChange}>
    <option value="">Select Difficulty</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>
</div>

            <div className="mb-3">
              <label className="form-label">Summary</label>
              <input className="form-control" type="text"  />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
