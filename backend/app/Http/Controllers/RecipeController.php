<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Rating;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    /**
     * Store a new recipe.
     */
    public function store(Request $request)
    {
        // Validate the request, including the image field if necessary
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'ingredients' => 'required',
            'steps' => 'required',
            'cooking_time' => 'integer|nullable',
            'difficulty_level' => 'string|nullable',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // other validations
        ]);

        // Handle the image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('recipe_images', 'public');
            // $validatedData['image'] = $imagePath;
            $validatedData['image'] = Storage::url($imagePath); // Get the public URL
        }

        // Create the recipe with the validated data
        $recipe = auth()->user()->recipes()->create($validatedData);

        // Return the newly created recipe and its image path
        return response()->json(['message' => 'Recipe created successfully', 'recipe' => $recipe]);
    }

    /**
     * Update an existing recipe.
     */
    public function update(Request $request, Recipe $recipe)
    {
        // Ensure the authenticated user is the owner of the recipe
        if ($recipe->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Validate the request
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required',
            'ingredients' => 'required',
            'steps' => 'required',
            'cooking_time' => 'integer|nullable',
            'difficulty_level' => 'string|nullable',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // other validations as necessary
        ]);

        // Handle the image upload
        if ($request->hasFile('image')) {
            // Delete the old image if it exists
            if ($recipe->image) {
                Storage::delete($recipe->image);
            }

            $imagePath = $request->file('image')->store('recipe_images', 'public');
            $validatedData['image'] = $imagePath;
        }

        // Update the recipe
        $recipe->update($validatedData);

        return response()->json(['message' => 'Recipe updated successfully', 'recipe' => $recipe]);
    }

    /**
     * Delete a recipe.
     */
    public function destroy(Recipe $recipe)
    {
        // Ensure the authenticated user is the owner of the recipe
        if ($recipe->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Soft delete the recipe
        $recipe->delete();

        return response()->json(['message' => 'Recipe deleted successfully']);
    }

    /**
     * Rate a recipe.
     */
    public function rateRecipe(Request $request, $recipeId)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'rating' => 'required|integer|between:1,5', // Rating should be between 1 and 5
        ]);

        // Check if the user has already rated the recipe
        $existingRating = Rating::where('user_id', Auth::id())->where('recipe_id', $recipeId)->first();

        if ($existingRating) {
            // Update the existing rating
            $existingRating->update(['rating' => $validatedData['rating']]);
            return response()->json(['message' => 'Rating updated successfully', 'rating' => $existingRating]);
        } else {
            // Create a new rating
            $rating = new Rating();
            $rating->user_id = Auth::id();
            $rating->recipe_id = $recipeId;
            $rating->rating = $validatedData['rating'];
            $rating->save();

            return response()->json(['message' => 'Rating added successfully', 'rating' => $rating]);
        }
    }

    /**
     * List all recipes with pagination.
     */
    public function index(Request $request)
    {
        // Get the page from the request, default is 1
        $page = $request->get('page', 1);
        // Define how many items per page you want
        $perPage = 10;

        // Retrieve the paginated results
        $recipes = Recipe::with('ratings')->paginate($perPage);

        // If you need to add custom details to the pagination response
        $response = [
            'data' => $recipes->items(),
            'pagination' => [
                'total' => $recipes->total(),
                'per_page' => $recipes->perPage(),
                'current_page' => $recipes->currentPage(),
                'last_page' => $recipes->lastPage(),
                'next_page_url' => $recipes->nextPageUrl(),
                'prev_page_url' => $recipes->previousPageUrl(),
                'from' => $recipes->firstItem(),
                'to' => $recipes->lastItem()
            ]
        ];

        // Return the custom response as JSON
        return response()->json($response);
    }

    /**
     * Show a single recipe.
     */
    public function show(Recipe $recipe)
    {
        $recipe->load('ratings');
        return response()->json($recipe);
    }

    /**
     * Search for recipes by title.
     */
    public function search(Request $request)
    {
        $query = $request->input('query');
        $recipes = Recipe::with('ratings')
            ->where('title', 'like', "%{$query}%")
            ->paginate(10); // 10 items per page
        return response()->json($recipes);
    }

    /**
     * Get recipes by tags with pagination.
     */
    public function getRecipesByTags(Request $request)
    {
        // Assuming the request contains an array of tag IDs named 'tags'
        $tagIds = $request->input('tags', []);

        // Initialize the query builder for recipes
        $query = Recipe::with(['likes', 'comments.user', 'ratings'])
            ->withCount(['likes', 'comments'])
            ->withAvg('ratings', 'rating');

        // If tag IDs are provided, filter recipes by those tags
        if (!empty($tagIds)) {
            $query->whereHas('tags', function ($query) use ($tagIds) {
                $query->whereIn('tags.id', $tagIds);
            });
        }

        // Apply pagination to the query
        $recipes = $query->paginate(9); // Change '10' to the desired items per page

        // Format the response with pagination details and additional data
        $response = [
            'data' => $recipes->map(function ($recipe) {
                return [
                    'id' => $recipe->id,
                    'title' => $recipe->title,
                    'difficulty_level' => $recipe->difficulty_level,
                    'description' => $recipe->description,
                    'image' => $recipe->image,
                    'likes_count' => $recipe->likes_count,
                    'comments_count' => $recipe->comments_count,
                    'average_rating' => $recipe->ratings_avg_rating,
                    'comments' => $recipe->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'content' => $comment->content,
                            'user' => [
                                'id' => $comment->user->id,
                                'name' => $comment->user->name,
                                // Add other user fields as needed
                            ],
                            // Add other comment fields as needed
                        ];
                    }),
                    // Add other necessary fields
                ];
            })->toArray(),
            'pagination' => [
                'total' => $recipes->total(),
                'per_page' => $recipes->perPage(),
                'current_page' => $recipes->currentPage(),
                'last_page' => $recipes->lastPage(),
                'next_page_url' => $recipes->nextPageUrl(),
                'prev_page_url' => $recipes->previousPageUrl(),
                'from' => $recipes->firstItem(),
                'to' => $recipes->lastItem()
            ]
        ];

        return response()->json($response);
    }


    /**
     * Add a comment to a recipe.
     */
    public function addComment(Request $request, $recipeId)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'content' => 'required|string',
            // Include other validation rules as necessary
        ]);

        // Find the recipe by ID
        $recipe = Recipe::findOrFail($recipeId);

        // Create a new comment and associate it with the recipe and authenticated user
        $comment = new Comment([
            'content' => $validatedData['content'],
            // 'user_id' will be set to the ID of the authenticated user
        ]);
        $comment->user()->associate(Auth::user());
        $recipe->comments()->save($comment);

        // Return a response, e.g., the comment data or a success message
        return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
    }

    /**
     * Get all comments for a recipe.
     */
    public function getComments($recipeId)
    {
        $recipe = Recipe::with('comments.user')->findOrFail($recipeId);
        return response()->json($recipe->comments);
    }

    /**
     * Update a comment on a recipe.
     */
    public function updateComment(Request $request, $recipeId, $commentId)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            // Include other validation rules as necessary
        ]);

        $comment = Comment::where('id', $commentId)->where('recipe_id', $recipeId)->firstOrFail();

        // Ensure the authenticated user is the owner of the comment
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Update the comment with validated data
        $comment->update($validatedData);

        return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment]);
    }

    /**
     * Delete a comment from a recipe.
     */
    public function deleteComment($recipeId, $commentId)
    {
        $comment = Comment::where('id', $commentId)->where('recipe_id', $recipeId)->firstOrFail();

        // Ensure the authenticated user is the owner of the comment
        if ($comment->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Delete the comment
        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
    // Add other methods as necessary, such as show (for a single recipe) and index (for listing recipes)
}
