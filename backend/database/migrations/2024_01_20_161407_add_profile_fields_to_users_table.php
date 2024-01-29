<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddProfileFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new columns to the users table
            $table->text('bio')->nullable()->after('email'); // A short biography for the user
            $table->string('profile_picture')->nullable()->after('bio'); // URL or path to the user's profile picture
            // You can add more profile-specific fields here
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // Remove the columns if the migration is rolled back
            $table->dropColumn(['bio', 'profile_picture']);
        });
    }
}
