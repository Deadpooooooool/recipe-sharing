<?php

use App\Http\Controllers\ActivityFeedController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeInteractionController;
use App\Http\Controllers\TagController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Authentication Routes
Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::middleware('auth:api')->post('logout', 'logout');
});

// Admin Management
Route::middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/admin/users', [AdminUserController::class, 'index']);
    Route::put('/admin/users/{user}', [AdminUserController::class, 'update']);
    Route::post('/admin/users/{user}', [AdminUserController::class, 'destroy']);
    Route::post('/admin/users/{user}/toggle-status', [AdminUserController::class, 'toggleAccountStatus']);
    Route::get('/admin/users/search', [AdminUserController::class, 'search']);
    Route::post('/admin/users/{user}/block', [AdminUserController::class, 'blockUser']);
    Route::post('/admin/users/{user}/unblock', [AdminUserController::class, 'unblockUser']);
    Route::get('/admin/reports', [AdminUserController::class, 'getReports']);
    Route::post('/admin/content/{contentId}', [AdminUserController::class, 'deleteContent']);
});

// Profile Management
Route::middleware('auth:api')->controller(ProfileController::class)->group(function () {
    Route::get('user', 'show');
    Route::get('/activity-feed', 'activityFeedIndex');
    Route::post('user', 'update');
    Route::post('/profile/{userId}/follow', 'follow');
    Route::post('/profile/{userId}/unfollow', 'unfollow');
    Route::get('/profile/stats', [ProfileController::class, 'getUserStats']);
});

// Recipe Management
Route::controller(RecipeController::class)->group(function () {
    Route::get('/recipes', 'index');
    Route::get('/recipes/tags', 'getRecipesByTags');
    Route::middleware('auth:api')->post('/recipes', 'store');
    Route::middleware('auth:api')->put('/recipes/{recipe}', 'update');
    Route::middleware('auth:api')->delete('/recipes/{recipe}', 'destroy');
    Route::middleware('auth:api')->post('/recipes/{recipe}/rate', 'rateRecipe');
    //Comment Management
    Route::middleware('auth:api')->post('/recipes/{recipe}/comments', 'addComment');
    Route::get('/recipes/{recipe}/comments', 'getComments');
    Route::middleware('auth:api')->put('/recipes/{recipe}/comments/{comment}', 'updateComment');
    Route::middleware('auth:api')->delete('/recipes/{recipe}/comments/{comment}', 'deleteComment');
});

// Recipe Interaction
Route::controller(RecipeInteractionController::class)->group(function () {
    Route::get('/recipes/search', 'search');
    Route::middleware('auth:api')->post('/recipes/{recipe}/rate', 'rate');
    Route::get('/recipes/{recipe}/ratings', 'showRatingStats');
    Route::middleware('auth:api')->post('/recipes/{recipe}/like', 'like');
    Route::middleware('auth:api')->post('/recipes/{recipe}/unlike', 'unlike');
    Route::get('/recipes/{recipe}/likes','listLikes');

});

// Tag Management
Route::middleware('auth:api')->controller(TagController::class)->group(function () {
    Route::post('/tags', 'store');
    Route::post('/recipes/{recipe}/tags', 'attachTag');
    Route::delete('/recipes/{recipe}/tags/{tag}', 'detachTag');
});
Route::get('/tags', [TagController::class, 'index']);

// Additional routes can be added as needed