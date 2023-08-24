<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Illuminate\Support\Facades\Log;

class ImageController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Get the authenticated user
            $user = $request->user();

            // Validate the request data
            $validatedData = $request->validate([
                'post_id' => 'required|exists:posts,id',
                'images' => 'required|array',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $imagePaths = [];

            // Store uploaded images
            foreach ($request->file('images') as $imageFile) {
                $imagePath = $imageFile->getClientOriginalName();
                $imageFile->move(public_path('images'), $imagePath);
                $imagePaths[] = $imagePath;
            }

            $images = [];
            foreach ($imagePaths as $imagePath) {
                Log::info("Creating image: User ID - {$user->id}, Post ID - {$validatedData['post_id']}, Image URL - $imagePath");
                
                $image = Image::create([
                    'user_id' => $user->id,
                    'post_id' => $validatedData['post_id'],
                    'image_url' => $imagePath,
                ]);
                $images[] = $image;
            }

            return response()->json(['message' => 'Images created successfully', 'images' => $images], 201);
        } catch (\Exception $e) {
            Log::error("Error creating images: {$e->getMessage()}");
            return response()->json(['message' => 'Error creating images', 'error' => $e->getMessage()], 500);
        }
    }
}
