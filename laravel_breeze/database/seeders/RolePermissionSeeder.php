<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $roleAdmin = Role::where('name', 'admin')->first();
        $roleAdmin->givePermissionTo(['user.create', 'user.read', 'user.update', 'user.delete']);
        $roleAdmin->givePermissionTo(['role.create', 'role.read', 'role.update', 'role.delete']);
        $roleAdmin->givePermissionTo(['permission.create', 'permission.read', 'permission.update', 'permission.delete']);
        $roleAdmin->givePermissionTo(['company.create', 'company.read', 'company.update', 'company.delete']);
        $roleAdmin->givePermissionTo(['department.create', 'department.read', 'department.update', 'department.delete']);

        $roleManager = Role::where('name', 'manager')->first();
        $roleManager->givePermissionTo(['company.create','company.read', 'company.update', 'company.delete']);

        $roleUser = Role::where('name', 'user')->first();
        $roleUser->givePermissionTo(['company.read']);
    }
}
