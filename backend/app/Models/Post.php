<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'image_url' , "name" ,  "cuisine" , "ingredients"];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function Comments()
    {
        return $this->hasMany(Comment::class);
    }
    
    public function Images()
    {
        return $this->hasMany(Image::class);
    }
    
    public function likedBy(User $user)
    {
        return $this->likes()->where('user_id', $user->id)->exists();
    }

}
