<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'user_id',
        'content_id',
        'reason', // Corrected the field name from 'description' to 'reason'
        'additional_info',
        'resolved',
    ];

    // Relationships
    public function reporter()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function content()
    {
        return $this->belongsTo(Recipe::class, 'content_id'); // Adjusted to use the Recipe model
    }
}
