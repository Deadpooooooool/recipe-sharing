<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Report;
use App\Models\User;
use App\Models\Content;
use App\Models\Recipe;

class ReportSeeder extends Seeder
{
    public function run()
    {
        // Get all users except the one with ID 1 (admin user)
        $users = User::where('id', '<>', 1)->get();

        // Get all contents (You may need to modify this based on your actual content setup)
        $contents = Recipe::all();

        // Define the number of reports to generate
        $numReports = 5; // You can adjust this as needed

        // Loop to generate random reports
        for ($i = 0; $i < $numReports; $i++) {
            $reporter = $users->random();
            $content = $contents->random();

            // Create a random report description
            $description = "Report on {$content->title} by {$reporter->name}";

            // Create a report record
            Report::create([
                'user_id' => $reporter->id,
                'content_id' => $content->id,
                'reason' => $description, // Use the description as the reason
                'additional_info' => 'Additional information here', // Provide additional information if needed
                'resolved' => false, // Initially, the report is not resolved
            ]);
        }
    }
}
