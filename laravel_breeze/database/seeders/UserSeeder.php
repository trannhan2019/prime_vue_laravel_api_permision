<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123456789'),
            'remember_token' => Str::random(10),
        ])->assignRole('admin');

        User::create([
            'name' => 'manager',
            'email' => 'manager@manage.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123456789'),
            'remember_token' => Str::random(10),
        ])->assignRole('manager');

        User::create([
            'name' => 'user',
            'email' => 'user@user.com',
            'email_verified_at' => now(),
            'password' => bcrypt('123456789'),
            'remember_token' => Str::random(10),
        ])->assignRole('user');
    }
}
