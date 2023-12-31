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
 $post = Post::find($post_id); // Assuming you have a Post model
    if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
    }
    $meal->post = $post;
        return response()->json(['message' => 'Meal planned successfully', 'data' => $meal], 201);
    }
  

    public function getUserDetails(Request $request)
    {
        $user = $request->user();
        $userDetails = [
            'user' => $user,
            'posts' => $user->posts->load(['images', 'likes', 'user', 'comments.user']),
            'meals' => $user->meals->map(function ($meal) {
                $post = $meal?->post?->load(['images', 'likes', 'user', 'comments.user']);
                if ($post !== null) {
                    $post->num_likes = $post?->likes->count();
                }
                return [
                    'meal' => $meal,
                    'post' => $post,
                ];
            }),
            'liked_posts' => $user->likes->map(function ($like) {
                $post = $like?->post?->load(['images', 'likes', 'user', 'comments.user']);
                if ($post !== null) {
                    $post->num_likes = $post?->likes->count();
                    $post->comments = $post?->comments;
                }
                return $post;
            }),
            'shopping_lists' => $user->shoppingLists,
        ];
        return response()->json(['data' => $userDetails]);
    }
    

    public function removeMeal(Request $request, $mealId)
    {
        $meal = Meal::find($mealId);
    
        if (!$meal) {
            return response()->json(['message' => 'Meal not found'], 404);
        }
    
        if ($request->user()->id !== $meal->user_id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    
        $meal->delete();
    
        return response()->json(['message' => 'Meal removed successfully'], 200);
    }
    
    }
    
    

