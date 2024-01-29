<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Follower extends Pivot
{
    use HasFactory;

    protected $table = 'followers'; // Name of the table if not following Laravel's naming conventions

    // If you have additional attributes on the pivot table, specify them here
    protected $fillable = [
        'user_id',     // The user being followed
        'follower_id', // The user who follows
        // other fields as necessary
    ];

    /**
     * Get the following user (the user who follows).
     */
    public function following()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the followed user (the user being followed).
     */
    public function follower()
    {
        return $this->belongsTo(User::class, 'follower_id');
    }
    
    // If you want to add additional functionality or attributes to the follow relationship, you can do so here
}
