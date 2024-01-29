<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    /**
     * Store a tag.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:tags,name', // Ensure tag names are unique
        ]);

        $tag = Tag::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Tag created successfully', 'tag' => $tag]);
    }

    /**
     * Attach a tag to a recipe.
     */
    public function attachTag(Request $request, Recipe $recipe)
    {
        $validator = Validator::make($request->all(), [
            'tag_id' => 'required|exists:tags,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $tagId = $request->input('tag_id');

        // Check if the tag is already attached
        if (!$recipe->tags->contains($tagId)) {
            $recipe->tags()->attach($tagId);
        }

        return response()->json(['message' => 'Tag attached successfully']);
    }

    /**
     * Detach a tag from a recipe.
     */
    public function detachTag(Recipe $recipe, Tag $tag)
    {
        $recipe->tags()->detach($tag->id);

        return response()->json(['message' => 'Tag detached successfully']);
    }

    /**
     * Get all tags.
     */
    public function index()
    {
        $tags = Tag::all();
        return response()->json($tags);
    }


    // Add any other methods related to tags as needed
}
