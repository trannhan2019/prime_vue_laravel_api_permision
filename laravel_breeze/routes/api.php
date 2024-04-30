<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Resources\UserAuthResource;

Route::middleware(['auth:sanctum','permission:company.read'])->get('/user', function (Request $request) {
    return new UserAuthResource($request->user());
    // return $request->user()->getAllPermissions()->pluck('name');
});

Route::resource('companies', \App\Http\Controllers\CompanyController::class);

Route::get('/test', function () {
    return $request->user()->getPermissionNames();
})->middleware('auth:sanctum');
