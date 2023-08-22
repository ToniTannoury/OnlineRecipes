<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingList;

class ShoppingListController extends Controller
{
    public function createShoppingList(Request $request)
    {
        $user = $request->user();

        $shoppingList = new ShoppingList([
            'user_id' => $user->id,
            'list' => $request->input('list'),
        ]);

        $shoppingList->save();

        return response()->json(['message' => 'Shopping list created successfully', 'shopping_list' => $shoppingList]);
    }
}
