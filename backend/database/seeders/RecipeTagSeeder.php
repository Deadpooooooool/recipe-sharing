<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Recipe;
use App\Models\Tag;
use App\Models\User;

class RecipeTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
{
    // Get all users except the one with ID 1 (admin user)
    $users = User::where('id', '<>', 1)->get();

    // First, find or create the tags based on the given names
    $tagsData = ['Italian', 'Chinese', 'Indian', 'Vegetarian', 'Vegan', 'Dessert', 'Quick', 'Healthy'];
    $tags = collect();

    foreach ($tagsData as $tagName) {
        $tags->push(Tag::firstOrCreate(['name' => $tagName]));
    }

    // Define which tags should be attached to which recipes
    $recipesWithTags = [
        'Chocolate Cake' => ['Dessert'],
        'Classic Margherita Pizza' => ['Italian', 'Quick'],
        'Spaghetti Carbonara' => ['Italian'],
        'Grilled Lemon Herb Chicken' => ['Quick', 'Healthy'],
        'Vegetarian Stir Fry' => ['Vegetarian', 'Chinese', 'Healthy'],
        'Beef Tacos' => ['Quick'],
        'Classic Caesar Salad' => ['Quick', 'Healthy'],
        'Pan-Seared Salmon' => ['Quick', 'Healthy'],
        'Chocolate Chip Cookies' => ['Dessert', 'Quick'],
        'Vegetable Curry' => ['Indian', 'Vegetarian'],
        // ... Add more recipes and their associated tags as needed
    ];

    // Attach the tags to each recipe
    foreach ($recipesWithTags as $recipeTitle => $tagNames) {
        // Find the recipe by title
        $recipe = Recipe::where('title', $recipeTitle)->first();

        if ($recipe) {
            // Get the tag ids for the current recipe
            $tagIds = $tags->whereIn('name', $tagNames)->pluck('id');

            // Attach the tags to the recipe
            $recipe->tags()->attach($tagIds);
        }
    }
}

}
