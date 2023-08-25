<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Meal;

class MealController extends Controller
{
    public function getUserMeals(Request $request)
    {
        $user = $request->user();

        $meals = $user->meals; // Retrieve all meals associated with the user

        return response()->json(['data' => $meals]);
    }
    public function deleteMealsByPostId(Request $request, $postId)
    {
        $user = $request->user();

        $mealsToDelete = $user->meals()->where('post_id', $postId)->get();

        $deletedMealIds = [];

        foreach ($mealsToDelete as $meal) {
            $meal->delete();
            $deletedMealIds[] = $meal->id;
        }

        return response()->json(['deleted_meal_ids' => $deletedMealIds]);
    }
}
