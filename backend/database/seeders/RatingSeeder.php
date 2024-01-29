<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Rating;
use App\Models\Recipe;
use App\Models\User;

class RatingSeeder extends Seeder
{
    public function run()
{
    // Get all users except the one with ID 1 (admin user)
    $users = User::where('id', '<>', 1)->get();
    $recipes = Recipe::all();

    foreach ($recipes as $recipe) {
        foreach ($users as $user) {
            Rating::create([
                'user_id' => $user->id,
                'recipe_id' => $recipe->id,
                'rating' => rand(1, 5),
            ]);
        }
    }
}

}
