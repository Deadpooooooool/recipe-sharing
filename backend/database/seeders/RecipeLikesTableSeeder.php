<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Recipe;

class RecipeLikesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get all non-admin users and all recipes
        $nonAdminUsers = User::where('is_admin', false)->get();
        $recipes = Recipe::all();

        // Define how many likes you want to seed
        $numberOfLikes = 100;

        // To keep track of which likes have been seeded to avoid duplicates
        $likes = [];

        for ($i = 0; $i < $numberOfLikes; $i++) {
            $user = $nonAdminUsers->random();
            $recipe = $recipes->random();

            // Create a unique key for each user-recipe pair
            $likeKey = $user->id . '-' . $recipe->id;

            // Check if this like has already been seeded
            if (!in_array($likeKey, $likes)) {
                // Use syncWithoutDetaching to avoid duplicates
                $user->likes()->syncWithoutDetaching([$recipe->id]);

                // Remember that we've seeded this like
                $likes[] = $likeKey;
            }
        }
    }
}
