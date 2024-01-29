<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile data.
     */
    public function show()
    {
        $user = Auth::user();

        // Eager load the profile, recipes, followers, and following
        $user->load('profile', 'recipes', 'followers', 'following');

        // Get counts
        $recipesCount = $user->recipes->count();
        $followersCount = $user->followers->count();
        $followingCount = $user->following->count();

        // Return the user's profile along with recipes, followers, following, and their counts
        return response()->json([
            'user' => $user,
            'name' => $user->name,
            'bio' => $user->profile->bio, // Assuming 'bio' is a part of the 'profile' relation
            'recipes' => $user->recipes,
            'recipesCount' => $recipesCount,
            'followers' => $user->followers,
            'followersCount' => $followersCount,
            'following' => $user->following,
            'followingCount' => $followingCount
        ]);
    }


    /**
     * Update the authenticated user's profile.
     */
    public function update(Request $request)
    {
        $user = Auth::user();
        $profile = $user->profile;

        // Validate and update the profile data
        $validatedData = $request->validate([
            'bio' => 'string|nullable',
            'profile_picture' => 'string|nullable',
            // other validation rules as necessary
        ]);

        $profile->update($validatedData);

        // Return the updated profile
        return response()->json(['message' => 'Profile updated successfully', 'profile' => $profile]);
    }

    /**
     * Follow another user.
     */
    public function follow(Request $request, $userId)
    {
        $user = Auth::user();
        $userToFollow = User::findOrFail($userId);

        // Assuming there's a many-to-many relationship set up in the User model
        $user->following()->attach($userToFollow);

        return response()->json(['message' => 'Successfully followed the user']);
    }

    /**
     * Unfollow another user.
     */
    public function unfollow(Request $request, $userId)
    {
        $user = Auth::user();
        $userToUnfollow = User::findOrFail($userId);

        // Assuming there's a many-to-many relationship set up in the User model
        $user->following()->detach($userToUnfollow);

        return response()->json(['message' => 'Successfully unfollowed the user']);
    }

    /**
     * Get statistics for the authenticated user.
     */
    public function getUserStats()
    {
        $user = Auth::user();

        // Eager load the necessary relationships
        $user->load('followers', 'following', 'likes'); // Replace 'likes' with the actual relationship name for liked recipes

        return response()->json([
            'followers' => $user->followers,
            'following' => $user->following,
            'liked_recipes' => $user->likes // Again, replace 'likes' as needed
        ]);
    }

    /**
     * Get the activity feed for the authenticated user.
     */
    public function activityFeedIndex()
    {
        $user = Auth::user();

        // Get the IDs of users that the authenticated user is following
        $followingIds = $user->following()->pluck('users.id')->toArray();

        // Fetch recent recipes from the users being followed
        $feedItems = Recipe::whereIn('user_id', $followingIds)
            ->with('user') // Eager load the user relationship
            ->latest() // Order by latest first
            ->take(10) // Limit the number of results
            ->get();

        return response()->json(['feed' => $feedItems]);
    }
    // Add any additional methods or logic as required
}
