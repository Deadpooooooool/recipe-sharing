<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Recipe extends Model
{
    use HasFactory, SoftDeletes;

    // Define which attributes can be mass-assigned
    protected $fillable = [
        'user_id', // Foreign key for the user who created the recipe
        'title',
        'description',
        'ingredients', // This could be a text field or a JSON field, depending on how you want to store it
        'steps', // Same as ingredients
        'cooking_time',
        'difficulty_level',
        'image',
        // Add any other fields relevant to your recipes
    ];

    // Relationships

    /**
     * Get the user that owns the recipe.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the tags associated with the recipe.
     */
    public function tags()
    {
        // Assuming you have a RecipeTag pivot table
        return $this->belongsToMany(Tag::class, 'recipe_tag');
    }

    /**
     * Get the comments associated with the recipe.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function getAverageRatingAttribute()
    {
        return $this->ratings()->avg('rating');
    }

    /**
     * Get the ratings associated with the recipe.
     */
    public function ratings()
    {
        return $this->hasMany(Rating::class);
    }

    public function likes()
    {
        return $this->belongsToMany(User::class, 'recipe_likes');
    }
    // Add any other relationships or methods your recipes might need
}
