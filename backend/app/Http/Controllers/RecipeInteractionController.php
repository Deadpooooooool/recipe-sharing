<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecipeInteractionController extends Controller
{
    /**
     * Search for recipes based on query parameters.
     */
    public function search(Request $request)
    {
        // Example: search by title, ingredients, etc.
        $query = $request->input('query');

        $recipes = Recipe::where('title', 'like', "%{$query}%")
            // Add more search conditions as needed
            ->get();

        return response()->json($recipes);
    }

    /**
     * Rate a recipe.
     */
    public function rate(Request $request, Recipe $recipe)
    {
        // Validate the rating input
        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // Save the rating for the recipe
        // Implement the rating logic based on your application's needs

        return response()->json(['message' => 'Recipe rated successfully']);
    }

    /**
     * Like a recipe.
     */
    public function like(Recipe $recipe)
    {
        $user = Auth::user();
        $user->likes()->attach($recipe);
        return response()->json(['message' => 'Recipe liked successfully']);
    }

    /**
     * Unlike a recipe.
     */
    public function unlike(Recipe $recipe)
    {
        $user = Auth::user();
        $user->likes()->detach($recipe);
        return response()->json(['message' => 'Recipe unliked successfully']);
    }

    /**
     * Show rating statistics for a recipe.
     */
    public function showRatingStats(Recipe $recipe)
    {
        $ratingStats = $recipe->ratings()
            ->selectRaw('AVG(rating) as average_rating, COUNT(*) as total_ratings')
            ->first();

        return response()->json([
            'average_rating' => $ratingStats->average_rating,
            'total_ratings' => $ratingStats->total_ratings
        ]);
    }

    /**
     * List likes for a specific recipe.
     *
     * @param Recipe $recipe
     * @return \Illuminate\Http\JsonResponse
     */
    public function listLikes(Recipe $recipe)
    {
        // Retrieve all users who liked the recipe
        $likes = $recipe->likes->map(function ($user) {
            return [
                'user_id' => $user->id,
                'user_name' => $user->name,
                'liked_at' => $user->pivot->created_at
            ];
        });

        return response()->json(['likes' => $likes, 'count' => count($likes)]);
    }


    // Add methods for tagging, untagging, and other interactions as needed
}
