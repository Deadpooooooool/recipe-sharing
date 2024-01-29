<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Recipe;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create an admin user
        $adminUser = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('adminpassword'),
            'is_admin' => true,
        ]);

        // Create non-admin users
        $userOne = User::create([
            'name' => 'Regular User One',
            'email' => 'userone@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);

        $userTwo = User::create([
            'name' => 'Regular User Two',
            'email' => 'usertwo@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
        ]);

        // Create demo recipes
        $recipes = [
            [
                'user_id' => $userOne->id,
                'title' => 'Chocolate Cake',
                'description' => 'Delicious chocolate cake recipe',
                'ingredients' => 'Flour, Sugar, Cocoa Powder, Baking Powder, Eggs, Milk, Vegetable Oil',
                'steps' => 'Mix ingredients, Bake for 30 minutes, Let it cool',
                'cooking_time' => 60,
                'difficulty_level' => 'Medium',
                'image' => 'https://source.unsplash.com/featured/?chocolatecake',
            ],
            [
                'user_id' => $userOne->id,
                'title' => 'Classic Margherita Pizza',
                'description' => 'A simple and delicious pizza with fresh basil, mozzarella, and tomato sauce.',
                'ingredients' => 'Pizza dough, tomato sauce, mozzarella cheese, fresh basil, olive oil',
                'steps' => 'Roll out dough, spread sauce, add cheese, bake at 475°F for 10-12 minutes, garnish with basil',
                'cooking_time' => 30,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?margheritapizza',
            ],
            [
                'user_id' => $userOne->id,
                'title' => 'Spaghetti Carbonara',
                'description' => 'Creamy and comforting pasta dish with eggs, cheese, and bacon.',
                'ingredients' => 'Spaghetti, eggs, bacon, Parmesan cheese, black pepper',
                'steps' => 'Cook pasta, fry bacon, mix eggs and cheese, combine with pasta, season with pepper',
                'cooking_time' => 20,
                'difficulty_level' => 'Medium',
                'image' => 'https://source.unsplash.com/featured/?carbonara',
            ],
            [
                'user_id' => $userOne->id,
                'title' => 'Grilled Lemon Herb Chicken',
                'description' => 'Juicy chicken marinated in lemon, herbs, and spices, grilled to perfection.',
                'ingredients' => 'Chicken breasts, lemon juice, olive oil, garlic, rosemary, thyme, salt, pepper',
                'steps' => 'Marinate chicken, preheat grill, grill chicken for 6-8 minutes per side, let rest',
                'cooking_time' => 45,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?grilledchicken',
            ],
            [
                'user_id' => $userOne->id,
                'title' => 'Vegetarian Stir Fry',
                'description' => 'Colorful mix of vegetables stir-fried with a savory sauce.',
                'ingredients' => 'Broccoli, bell peppers, carrots, snow peas, soy sauce, ginger, garlic, sesame oil',
                'steps' => 'Chop vegetables, heat oil, stir-fry vegetables, add sauce, cook until tender',
                'cooking_time' => 25,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?stirfry',
            ],
            [
                'user_id' => $userOne->id,
                'title' => 'Beef Tacos',
                'description' => 'Flavorful ground beef served in crispy taco shells with toppings.',
                'ingredients' => 'Ground beef, taco seasoning, taco shells, lettuce, cheese, tomatoes, sour cream',
                'steps' => 'Cook beef with seasoning, warm taco shells, assemble tacos with toppings',
                'cooking_time' => 30,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?tacos',
            ],
            [
                'user_id' => $userTwo->id,
                'title' => 'Classic Caesar Salad',
                'description' => 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
                'ingredients' => 'Romaine lettuce, Caesar dressing, croutons, Parmesan cheese, anchovies (optional)',
                'steps' => 'Chop lettuce, toss with dressing, add croutons and cheese, serve chilled',
                'cooking_time' => 15,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?caesarsalad',
            ],
            [
                'user_id' => $userTwo->id,
                'title' => 'Pan-Seared Salmon',
                'description' => 'Salmon fillets with a golden crust, cooked in a buttery sauce.',
                'ingredients' => 'Salmon fillets, butter, garlic, lemon juice, parsley, salt, pepper',
                'steps' => 'Season salmon, sear in pan, add butter and garlic, baste salmon, finish with lemon juice',
                'cooking_time' => 20,
                'difficulty_level' => 'Medium',
                'image' => 'https://source.unsplash.com/featured/?salmon',
            ],
            [
                'user_id' => $userTwo->id,
                'title' => 'Chocolate Chip Cookies',
                'description' => 'Soft and chewy cookies loaded with chocolate chips.',
                'ingredients' => 'Butter, sugar, brown sugar, eggs, vanilla extract, flour, baking soda, salt, chocolate chips',
                'steps' => 'Cream butter and sugars, add eggs and vanilla, mix dry ingredients, fold in chocolate chips, bake at 375°F',
                'cooking_time' => 45,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?chocolatechipcookies',
            ],
            [
                'user_id' => $userTwo->id,
                'title' => 'Vegetable Curry',
                'description' => 'Rich and flavorful curry with a variety of vegetables and spices.',
                'ingredients' => 'Onion, garlic, ginger, curry powder, coconut milk, tomatoes, mixed vegetables',
                'steps' => 'Sauté onion, garlic, ginger, add curry powder, add coconut milk and tomatoes, add vegetables, simmer',
                'cooking_time' => 40,
                'difficulty_level' => 'Medium',
                'image' => 'https://source.unsplash.com/featured/?vegetablecurry',
            ],
            [
                'user_id' => $userTwo->id,
                'title' => 'Quinoa Salad',
                'description' => 'Healthy and refreshing salad with quinoa, vegetables, and a lemon vinaigrette.',
                'ingredients' => 'Quinoa, cucumber, cherry tomatoes, red onion, feta cheese, lemon juice, olive oil, parsley',
                'steps' => 'Cook quinoa, chop vegetables, mix quinoa and vegetables, add dressing, refrigerate before serving',
                'cooking_time' => 30,
                'difficulty_level' => 'Easy',
                'image' => 'https://source.unsplash.com/featured/?quinoasalad',
            ],
        ];

        foreach ($recipes as $recipeData) {
            Recipe::create($recipeData);
        }
    }
}
