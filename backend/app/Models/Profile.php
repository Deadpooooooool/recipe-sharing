<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    // The table associated with the model
    protected $table = 'profiles';

    // The attributes that are mass assignable
    protected $fillable = [
        'user_id', // foreign key from users table
        'bio',
        'profile_picture',
        // Add any other profile-specific fields here
    ];

    /**
     * Get the user that owns the profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // If you have additional relationships or functionality, add them here
}