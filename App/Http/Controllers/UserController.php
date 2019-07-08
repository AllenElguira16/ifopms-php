<?php 
namespace App\Http\Controllers;
use App\Http\Models\User;
use Core\Http\Request;
use Core\Http\Response;
use Core\Hashing\Hash;
use Core\File;

class UserController
{
    protected $SigninInputRules = [
        "username" => "required",
        "password" => "required"
    ];
    protected $SignupInputRules = [
        "firstname"     => "required",
        "lastname"      => "required",
        "username"      => "required",
        "email"         => "required",
        "password"      => "required",
        "repassword"    => "required",
        "file"          => "required"
    ];
    public function SignIn($request): Response
    {
        $validator = $request->validate($this->SigninInputRules);
        if($validator->fails()){
            return toJson(["error" => "All fields are Required"]);
        } 
        if(!User::Exists($request->input('username'))){
            return toJson(['error' => 'User doesnt exists']);
        }
        $check = Auth::SignIn([
            "query" => [
                "username" => $request->input('username'),
            ],
            "verify" => $request->input('password')
        ]);
        if(!$check){
            return toJson(["error" => "Password is incorrect"]);
        }
        return toJson(["success" => true]);
    }
    
    public function SignUp($request): Response
    {
        // return toJson($request->all());
        // Rules
        $validator = $request->validate($this->SignupInputRules);
        // Validating
        if($validator->fails()){
            // if Fails returns error to Vue
            return toJson(["error" => "All fields are Required"]);
        } else {
            if(User::Exists($request->input('username'))){
            	return toJson(["error" => "User Exists!"]);
            }
            if($request->input('password') !== $request->input('repassword')){
                return toJson(["error" => "Password doesn't match"]);
            }
            // if not fail Signing in
            $check = Auth::SignUp([
                "firstname" => $request->input('firstname'),
                "lastname" => $request->input('lastname'),
                "username" => $request->input('username'),
                "email" => $request->input('email'),
                "password" => Hash::make($request->input('password')),
                "type" => $request->input('type'),
                "file" => $request->input('file')['name']
            ]);
            // SignIn
            if($check){
                $userId = Auth::user('id');
                if(File::move("Public/uploads/profiles/{$userId}/", $request->input('file'))){
                    return toJson(["success" => true]);
                }
            }
            // If signin fails
            return toJson(["error" => "Error signin in"]);
        }
    }
}