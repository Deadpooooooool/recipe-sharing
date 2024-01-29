<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', // For example: 'Dessert', 'Vegan', 'Quick Meals', etc.
        // Add any other fields that are relevant to your tags
    ];

    /**
     * The recipes that have this tag.
     */
    public function recipes()
    {
        return $this->belongsToMany(Recipe::class);
    }

    // Add any other relationships or methods your tags might need
}
