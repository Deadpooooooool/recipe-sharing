<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\Recipe;
use App\Models\User;

class CommentSeeder extends Seeder
{
    public function run()
{
    $users = User::where('id', '<>', 1)->get(); // Exclude User 1

    $recipes = Recipe::all();

    foreach ($recipes as $recipe) {
        // Determine the number of users to leave comments (up to 5 or the total number of users available, excluding User 1)
        $countToComment = min(5, $users->count());

        foreach ($users->random($countToComment) as $user) {
            Comment::create([
                'user_id' => $user->id,
                'recipe_id' => $recipe->id,
                'content' => 'This is a comment.',
            ]);
        }
    }
}

}
