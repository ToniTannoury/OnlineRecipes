<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\Like;
use App\Models\Comment;
class PostController extends Controller
{
    public function createPost(Request $request)
    {
        $user = $request->user();
    
        if ($request->hasFile('image_url')) {
            try {
                $uploadedFile = $request->file('image_url');
                $name = $uploadedFile->getClientOriginalName();
                $uploadedFile->move(public_path('images'), $name);
    
                $post = new Post([
                    'user_id' => $user->id,
                    'image_url' => $name,
                    "name" => $request->name,
                    "cuisine" => $request->cuisine,
                    "ingredients" => $request->ingredients,
                ]);
    
                $user->posts()->save($post);
    
                $post->load(['user' , 'comments', 'likes', 'images']);
    
                return response()->json([
                    'message' => 'Post created successfully',
                    'data' => $post,
                ], 201);
            } catch (Exception $e) {
                error_log('Exception: ' . $e->getMessage());
                return response()->json(['message' => 'Error creating post'], 500);
            }
        } else {
            try {
                $post = new Post([
                    'user_id' => $user->id,
                    'image_url' => "cuisine.png",
                    "name" => $request->name,
                    "cuisine" => $request->cuisine,
                    "ingredients" => $request->ingredients,
                ]);
    
                $user->posts()->save($post);
    
                $post->load(['user' , 'comments', 'likes', 'images']);
    
                return response()->json([
                    'message' => 'Post created successfully',
                    'data' => $post,
                ], 201);
            } catch (Exception $e) {
                error_log('Exception: ' . $e->getMessage());
                return response()->json(['message' => 'Error creating post'], 500);
            }
        }
    }
    
public function searchRecipesByName(Request $request, $name)
{
    $query = $this->searchByField('name', $name);
    $perPage = $request->query('per_page', 10);
    $recipes = $query->paginate($perPage);
    return response()->json(['recipes' => $recipes]);
}

public function searchRecipesByCuisine(Request $request, $cuisine)
{
    $query = $this->searchByField('cuisine', $cuisine);
    $perPage = $request->query('per_page', 10);
    $recipes = $query->paginate($perPage);
    return response()->json(['recipes' => $recipes]);
}

public function searchRecipesByIngredients(Request $request, $ingredients)
{
    $query = $this->searchByField('ingredients', $ingredients);
    $perPage = $request->query('per_page', 10);
    $recipes = $query->paginate($perPage);
    return response()->json(['recipes' => $recipes]);
}

private function searchByField($field, $value)
{
    return Post::where($field, 'like', '%' . $value . '%');
}
public function likeRecipe(Request $request)
{
    $user = $request->user();
    $post_id = $request->input('post_id');
    
    $recipe = Post::find($post_id); 

    if (!$recipe) {
        return response()->json(['message' => 'Recipe not found'], 404);
    }


    if ($recipe->likedBy($user)) {
        return response()->json(['message' => 'Recipe already liked'], 409);
    }

    $like = new Like(['user_id' => $user->id]);
    $recipe->likes()->save($like);
    
    return response()->json(['message' => 'Recipe liked successfully']);
}
public function unlikeRecipe(Request $request)
{
    $user = $request->user();
    $post_id = $request->input('post_id');
    
    $recipe = Post::find($post_id); 

    if (!$recipe) {
        return response()->json(['message' => 'Recipe not found'], 404);
    }

    if (!$recipe->likedBy($user)) {
        return response()->json(['message' => 'Recipe not liked by the user'], 409);
    }

    $like = $recipe->likes()->where('user_id', $user->id)->first();

    if ($like) {
        $like->delete();
        return response()->json(['message' => 'Recipe unliked successfully']);
    } else {
        return response()->json(['message' => 'Error unliking recipe'], 500);
    }
}



public function commentRecipe(Request $request)
{
    $user = $request->user();
    $post_id = $request->input('post_id');
    $content = $request->input('content');
    
    $recipe = Post::find($post_id); 

    if (!$recipe) {
        return response()->json(['message' => 'Recipe not found'], 404);
    }
    
    $comment = new Comment([
        'user_id' => $user->id,
        'content' => $content,
        'post_id' => $post_id,
    ]);
    
    $recipe->comments()->save($comment);
    $comment->load('user');

    return response()->json(['message' => 'Comment added successfully', 'comment' => $comment]);
}

public function getLikesForRecipe(Post $recipe)
{
    $likes = $recipe->likes()->get(); 
    return response()->json(['likes' => $likes]);
}
public function getCommentsForRecipe(Post $recipe)
{
    $comments = $recipe->comments()->with('user')->get(); 
    return response()->json(['comments' => $comments]);
}
public function updatePost(Request $request , $id)
{

    $post = Post::findOrFail($id);

    $data= $request->only(['name', 'cuisine', 'ingredients']);

    if ($request->hasFile('image_url')) {
        $uploadedFile = $request->file('image_url');
        $name = $uploadedFile->getClientOriginalName();
        $uploadedFile->move(public_path('images'), $name);
        $data['image_url'] = $name;
    }
    
    $post->update($data); 
   
    return response()->json(['message' => 'Post updated successfully', 'updated_post' => $post]);
}

public function deletePost($id)
{   error_log($id);
    error_log(11);
    $post = Post::find($id);

    if (!$post) {
        return response()->json(['message' => 'Post not found'], 404);
    }

    $post->delete(); // Delete the post

    return response()->json(['message' => 'Post deleted successfully']);
}
}


