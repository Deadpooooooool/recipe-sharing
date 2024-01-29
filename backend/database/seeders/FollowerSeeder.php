<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class FollowerSeeder extends Seeder
{
    public function run()
{
    // Get all users except the one with ID 1 (admin user)
    $users = User::where('id', '<>', 1)->get();

    foreach ($users as $user) {
        // Get a collection of other users excluding user 1 (admin user)
        $otherUsers = $users->reject(function ($u) use ($user) {
            return $u->id == $user->id;
        });

        // Determine the number of users to follow (up to 3 or the number of other users available)
        $countToFollow = min(3, $otherUsers->count());

        foreach ($otherUsers->random($countToFollow) as $follower) {
            $user->followers()->attach($follower);
        }
    }
}


}
