<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        foreach ($users as $user) {
            Profile::create([
                'user_id' => $user->id,
                'bio' => 'This is a bio for ' . $user->name,
                'profile_picture' => null,
            ]);
        }
    }
}
