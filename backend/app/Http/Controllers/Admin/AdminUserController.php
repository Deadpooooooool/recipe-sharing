<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Content;
use App\Models\Recipe;
use App\Models\Report;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{
    /**
     * Display a paginated listing of all users.
     */
    public function index(Request $request)
    {
        $users = User::paginate($request->input('per_page', 15)); // 15 per page by default
        return response()->json($users);
    }

    /**
     * Update the specified user in the system.
     */
    public function update(Request $request, User $user)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $user->id,
            'is_admin' => 'sometimes|boolean',
            'password' => 'sometimes|string|min:6|confirmed',
        ]);

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $user->update($validatedData);
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    /**
     * Remove the specified user from the system.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    /**
     * Suspend or Activate a user account.
     */
    public function toggleAccountStatus(User $user)
    {
        $user->is_blocked = !$user->is_blocked;
        $user->save();
        return response()->json(['message' => 'User account status updated successfully', 'user' => $user]);
    }

    /**
     * Search and filter users.
     */
    public function search(Request $request)
    {
        $query = User::query();

        if ($searchTerm = $request->input('search')) {
            $query->where('name', 'LIKE', "%{$searchTerm}%")
                ->orWhere('email', 'LIKE', "%{$searchTerm}%");
        }

        $users = $query->paginate($request->input('per_page', 15));
        return response()->json($users);
    }

    // /**
    //  * Display the activity feed for the authenticated user.
    //  */
    // public function index()
    // {
    //     $user = Auth::user();

    //     // Get the users that the authenticated user is following
    //     $following = $user->following()->pluck('users.id');

    //     // Fetch recent recipes from the users being followed
    //     $feedItems = Recipe::whereIn('user_id', $following)
    //         ->with('user') // Load the user data for each recipe
    //         ->orderBy('created_at', 'desc') // Order by latest first
    //         ->take(10) // Limit the number of results
    //         ->get();

    //     return response()->json($feedItems);
    // }

    /**
     * Block a user.
     */
    public function blockUser(User $user)
    {
        $user->update(['is_blocked' => true]);
        return response()->json(['message' => 'User has been blocked.']);
    }

    /**
     * Unblock a user.
     */
    public function unblockUser(User $user)
    {
        $user->update(['is_blocked' => false]);
        return response()->json(['message' => 'User has been unblocked.']);
    }

    /**
     * Get reports submitted by users.
     */
    public function getReports()
    {
        // Assuming there is a Report model with user_id and content fields
        $reports = Report::all();
        return response()->json($reports);
    }

    /**
     * Delete inappropriate content.
     */
    public function deleteContent($contentId)
    {
        // This would depend on the type of content. Assuming a Content model for simplicity.
        $content = Content::findOrFail($contentId);
        $content->delete();
        return response()->json(['message' => 'Content has been deleted.']);
    }

    // Add any other admin-specific user management methods as needed
}
