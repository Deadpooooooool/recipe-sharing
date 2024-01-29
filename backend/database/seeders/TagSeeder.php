<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run()
    {
        $tags = ['Italian', 'Chinese', 'Indian', 'Vegetarian', 'Vegan', 'Dessert', 'Quick', 'Healthy'];
        foreach ($tags as $tagName) {
            Tag::create(['name' => $tagName]);
        }
    }
}
