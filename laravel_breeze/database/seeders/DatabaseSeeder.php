<?php

namespace Database\Seeders;

// use App\Models\User;
use App\Models\Company;
use App\Models\Department;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RoleSeeder::class);
        $this->call(PermissionSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(RolePermissionSeeder::class);
        // $this->call(CompanySeeder::class);

        //create company with department
        //c1
        // Company::factory(10)->create()->each(function ($company) {
        //     Department::factory(10)->create(['company_id' => $company->id]);
        // })
        //c2
        Company::factory(10)->has(Department::factory()->count(10), 'departments')->create();
    }
}
