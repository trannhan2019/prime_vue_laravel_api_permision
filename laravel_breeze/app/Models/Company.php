<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'alias',
        'is_active',
    ];

    public function departments()
    {
        return $this->hasMany(Department::class);
    }
}
