<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Content extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', // The ID of the user who owns the content
        'type',    // Type of content (e.g., 'recipe', 'comment')
        'body',    // The content body or text
        // Add other content-specific fields here as needed
    ];

    /**
     * The relationships to always eager-load.
     *
     * @var array
     */
    protected $with = [
        'user',
    ];

    /**
     * Get the user that owns the content.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the reports associated with the content.
     */
    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    // Add additional methods or relationships for the content below
    // For example, if you have comments on a recipe or replies to a comment
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // If you have likes or other interactions, you can define them here as well
    // public function likes()
    // {
    //     return $this->hasMany(Like::class);
    // }
}
