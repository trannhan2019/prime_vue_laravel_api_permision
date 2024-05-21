<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserAuthResource;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\DepartmentController;

Route::middleware(['auth:sanctum','permission:company.read'])->get('/user', function (Request $request) {
    return new UserAuthResource($request->user());
    // return $request->user()->getAllPermissions()->pluck('name');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::apiResource('companies', CompanyController::class);
    Route::delete('companies-destroy',[CompanyController::class,'destroyList']);

    Route::apiResource('departments', DepartmentController::class);
});

Route::get('/test', function (Request $request) {
    return $request->user()->getPermissionNames();
})->middleware('auth:sanctum');
