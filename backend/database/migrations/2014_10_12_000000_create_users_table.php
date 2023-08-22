<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->text('password');
            $table->text('pic_url');
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); 
            $table->string('image_url');
            $table->string('name');
            $table->string('cuisine');
            $table->string('ingredients');
            $table->timestamps();
        });
      
        {
            Schema::create('likes', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id'); 
                $table->unsignedBigInteger('post_id'); 
                $table->timestamps();
            });
        }
        {
            Schema::create('comments', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id'); 
                $table->unsignedBigInteger('post_id'); 
                $table->string('content'); 
                $table->timestamps();
            });
        }
        {
            Schema::create('images', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('image_url'); 
                $table->unsignedBigInteger('post_id'); 
                $table->timestamps();
            });
        }
        {
            Schema::create('shopping_lists', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id'); 
                $table->string('list'); 
                $table->timestamps();
            });
        }
        {
            Schema::create('meals', function (Blueprint $table) {
                $table->id();
                $table->date('serving_day'); 
                $table->unsignedBigInteger('post_id'); 
                $table->timestamps();
            });
        }
        
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
