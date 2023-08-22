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
}
