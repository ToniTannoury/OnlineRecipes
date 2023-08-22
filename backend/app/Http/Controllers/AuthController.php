<?php 

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller{


    public function unauthorized(Request $request){
        return response()->json([
            'status' => 'Error',
            'message' => 'Unauthorized',
        ], 200);
    }

    public function login(Request $request){
        error_log($request->email);
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
 
        if (!$token) {
            return response()->json([
                'status' => 'Error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        $user->token = $token;
        
        return response()->json([
                'status' => 'Success',
                'data' => $user
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);
        if ($request->hasFile('image_url')) {
            error_log(112); 
            $uploadedFile = $request->file('image_url');
            $name = $uploadedFile->getClientOriginalName();
            $uploadedFile->move(public_path('images'), $name);
            $user = new User; 
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->pic_url =$name;
            error_log($user->pic_url);
            $user->save();
            $token = Auth::login($user);
            $user->token = $token;
            return response()->json([
                'message' => 'User created successfully',
                'data' => $user,
            ], 201);
        }
        $user = new User; 
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->pic_url = "emptyProfile.png";
        $user->save();

        $token = Auth::login($user);
        $user->token = $token;

        return response()->json([
            'status' => 'Success',
            'data' => $user
        ]);
    }

    public function logout(){
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh() {
        $user = Auth::user();
        $user->token = Auth::refresh();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

}