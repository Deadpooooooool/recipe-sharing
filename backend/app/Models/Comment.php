<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'recipe_id', // Foreign key to the recipes table
        'user_id', // Foreign key to the users table
        'content', // The content of the comment
        // other fields as necessary
    ];

    /**
     * Get the recipe that the comment belongs to.
     */
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }

    /**
     * Get the user who made the comment.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Add any other relationships or methods your comments might need
}
