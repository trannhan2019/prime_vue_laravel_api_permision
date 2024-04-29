<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $actions = [
            'create',
            'read',
            'update',
            'delete',
        ];
        $resources = [
            'user',
            'role',
            'permission',
            'company'
        ];

        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                Permission::create([
                    'name' => $resource . '.' . $action,
                    'guard_name' => 'web',
                ]);
            }
        }
    }
}
