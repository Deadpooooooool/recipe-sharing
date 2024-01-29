import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const RecipeDetail = () => {
    const { id } = useParams();
    const recipes = useRecipeStore((state) => state.recipes);

    const recipe = recipes.find((recipe) => recipe.id === parseInt(id));
    console.log("average_ratings", recipe);
    const [selectedRating, setSelectedRating] = useState(recipe.average_ratings);

    // Find the recipe with the matching ID
   
    if (!recipe) {
        return <div>No recipe data available.</div>;
    }
    const handleStarClick = (rating) => {
        setSelectedRating(rating);
      };

    return (
        <div className="recipe-detail m-3">
           
            <img src={recipe.image} alt={recipe.title} style={{width:'850px', height:'450px', borderRadius:'10px'}} />
            <h2 className='mt-2'>{recipe.title}</h2>
           <div> <h2 className='mt-2'>🕐 {recipe.cooking_time} Min</h2> Difficulty Level :- {recipe.difficulty_level}</div>
             <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleStarClick(star)}
              style={{
                cursor: "pointer",
                color: star <= selectedRating ? "gold" : "gray",
              }}
            >
              &#9733;
            </span>
          ))}
        </div>

        <h3 className='mt-2'>Ingredients</h3>
        <p> {recipe.ingredients}</p>
        <h3 className='mt-2'>Summary</h3>
            <p className='mt-4'> {recipe.description}</p>
            <h3 className='mt-2'>How to cook</h3>
            <h3 className='mt-2'>Steps</h3>
            <p className='mt-4'> {recipe.steps}</p>
    
        </div>
    );
};

export default RecipeDetail;
