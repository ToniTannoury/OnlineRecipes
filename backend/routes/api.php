<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MealController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ShoppingListController;
use Illuminate\Support\Facades\Auth;

Route::group(["middleware" => "auth:api"], function(){
    $user = Auth::user(); 
    
    Route::group(["prefix" => "user"], function(){
        Route::post("logout", [AuthController::class, "logout"]);
        Route::post("refresh", [AuthController::class, "refresh"]);
        Route::get('get-profile', [UserController::class,"getProfile"]);
        Route::post('create-post', [PostController::class , "createPost"]);
        Route::get('/recipes/searchByName/{name}',[PostController::class , "searchRecipesByName"]);
        Route::get('/recipes/searchByCuisine/{cuisine}', [PostController::class , "searchRecipesByCuisine"]);
        Route::get('/recipes/searchByIngredients/{ingredients}',[PostController::class , "searchRecipesByIngredients"]);
        Route::post('/like_recipe',[PostController::class , "likeRecipe"]);
        Route::post('/comment_recipe',[PostController::class , "commentRecipe"]);
        Route::get('/recipes/{recipe}/likes',[PostController::class , "getLikesForRecipe"]);
        Route::get('/recipes/{recipe}/comments',[PostController::class , "getCommentsForRecipe"]);
        Route::patch('/update_post/{id}',[PostController::class , "updatePost"]);
        Route::delete('/delete_post/{id}',[PostController::class , "deletePost"]);
        Route::get('/liked-posts', [UserController::class,"getLikedPosts"]);
        Route::get('/liked-posts', [UserController::class,"getLikedPosts"]);
        Route::post('/shopping-lists',  [ShoppingListController::class,"createShoppingList"]);
        Route::get('/shopping-lists',  [UserController::class,"getShoppingLists"]);
        Route::post('/plan-meal',  [UserController::class , "planMeal"]);
        Route::get('/get-meals',  [MealController::class , "getUserMeals"]);
    });
});


Route::group(["prefix" => "guest"], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post("login", [AuthController::class, "login"]);
    Route::post("register", [AuthController::class, "register"]);
});


