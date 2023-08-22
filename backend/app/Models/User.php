<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject{

    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims() {
        return [];
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function Comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function shoppingLists()
    {
        return $this->hasMany(ShoppingList::class);
    }

}