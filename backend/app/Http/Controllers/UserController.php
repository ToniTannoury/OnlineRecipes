<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;
use App\Models\Like;
use App\Models\Meal;
use App\Models\ShoppingList;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function getProfile(Request $request)
    {
        $currentUser = $request->user();

        return response()->json(['user' =>  $currentUser]);
    }
    public function getLikedPosts()
    {
        $user = Auth::user();
        
        $likedPostIds = Like::where('user_id', $user->id)->pluck('post_id');
        $likedPosts = Post::whereIn('id', $likedPostIds)->get();
        
        return response()->json(['liked_posts' => $likedPosts]);
    }

    public function getShoppingLists()
    {
        $user = Auth::user();
        
        $shoppingLists = ShoppingList::where('user_id', $user->id)->get(); // Retrieve shopping lists
        return response()->json(['shopping_lists' => $shoppingLists]);
    }
    public function planMeal(Request $request)
    {
        $user = $request->user();
        $serving_day = $request->input('serving_day');
        $post_id = $request->input('post_id');

        $meal = new Meal([
            'user_id' => $user->id,
            'serving_day' => $serving_day,
            'post_id' => $post_id,
        ]);

        $user->meals()->save($meal);

        return response()->json(['message' => 'Meal planned successfully', 'data' => $meal], 201);
    }

}
