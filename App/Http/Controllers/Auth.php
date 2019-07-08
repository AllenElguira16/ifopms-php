<?php
namespace App\Http\Controllers;
use App\Http\Models\User;
use Core\Cookies\Session;
use Core\Hashing\Hash;

class Auth  
{
	function user($param = null)
	{
		return !is_null($param) ? Session::get('user')[$param] : Session::get('user');
	}

	function SignOut()
	{
		return Session::remove('user') ? true : false;	
	}

	function SignIn($userData)
	{
		$user = User::select('*', $userData["query"])[0];
        if (!Hash::verify($userData["verify"], $user["password"])) {
            return false;
        }
		Session::set("user", $user);
		return true;
	}

	function signup($request)
	{
		$auth = User::insert($request);
		if($auth){
			Session::set("user", User::select('*', [
				"id" => $auth->id()
			])[0]);
			return true;
		}
		return false;
		// if($request->input('password') != $request->input('repassword')){
		// 	return toJson(["error" => "password doesn't match!"]);
		// }
		// $validator = $request->validate([
		// 	"firstname" => "required",
		// 	"lastname" => "required",
		// 	"email" => "required",
		// 	"username" => "required", 
		// 	"password" => "required",
		// 	"userType" => "required"
		// ]);
		// if($validator->fails()){
		// 	return toJson($validator->errors());
		// }
		// if(User::Exists($request->input('username'))){
		// 	return toJson(["error" => "User Exists!"]);
		// }
		// $db = User::insert([
		// 	"firstname" =>  $request->input("firstname"),
		// 	"lastname" =>  $request->input("lastname"),
		// 	"email" =>  $request->input("email"),
		// 	"username" =>  $request->input("username"),
		// 	"password" =>  Hash::make($request->input("password")),
		// 	"status" => $request->input("userType")
		// ]);
		// Session::set('username', $request->input('username'));
		// return toJson(["success" => true]);
	}
}
