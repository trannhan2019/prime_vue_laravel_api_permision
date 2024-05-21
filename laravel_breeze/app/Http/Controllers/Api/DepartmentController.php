<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Http\Requests\StoreDepartmentRequest;
use App\Http\Requests\UpdateDepartmentRequest;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Http\Resources\DepartmentResource;

class DepartmentController extends Controller implements HasMiddleware
{
    // middleware
    public static function middleware(): array
    {
        return [
            new Middleware("permission:department.read",only:["index","show"]),
            new Middleware("permission:department.create",only:["store"]),
            new Middleware("permission:department.update",only:["update"]),
            new Middleware("permission:department.delete",only:["destroy"]),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rows = request('rows', 10);
        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", "desc");
        $search = request("search");

        $query = Department::query();
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
            $query->orWhere('alias', 'like', '%' . $search . '%');
        }
        $departments = $query->orderBy($sortField, $sortDirection)->paginate($rows);

        // return response()->json(CompanyResource::collection($companies));
        return DepartmentResource::collection($departments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDepartmentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }
}
