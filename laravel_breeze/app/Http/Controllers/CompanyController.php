<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;
use App\Http\Resources\CompanyResource;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class CompanyController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware("permission:company.read",only:["index","show"]),
            new Middleware("permission:company.create",only:["store"]),
            new Middleware("permission:company.update",only:["update"]),
            new Middleware("permission:company.delete",only:["destroy"]),
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

        $query = Company::query();
        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
            $query->orWhere('alias', 'like', '%' . $search . '%');
        }
        $companies = $query->orderBy($sortField, $sortDirection)->paginate($rows);

        // return response()->json(CompanyResource::collection($companies));
        return CompanyResource::collection($companies);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        $data = $request->validated();
        $company = Company::create($data);

        return new CompanyResource($company);
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return new CompanyResource($company);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        $data = $request->validated();
        $company->update($data);

        return new CompanyResource($company);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        $company->delete();

        return response()->noContent();
    }

    public function destroyList()
    {
        $ids = request('ids');
        Company::destroy($ids);

        return response()->noContent();
    }
}
