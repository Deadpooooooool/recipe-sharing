<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // Foreign key for the user who created the recipe
            $table->string('title'); // Title of the recipe
            $table->text('description')->nullable(); // Description or summary of the recipe
            $table->longText('ingredients'); // List of ingredients
            $table->longText('steps'); // Cooking steps
            $table->integer('cooking_time')->nullable(); // Cooking time in minutes
            $table->string('difficulty_level')->nullable(); // Difficulty level of the recipe
            $table->string('image')->nullable(); // Path to the recipe image
            $table->timestamps();
            $table->softDeletes();

            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recipes');
    }
};
