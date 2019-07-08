<?php
namespace App\Http\Middlewares;
use Core\Http\Request;
use Closure;
class Validate{
    function Signin(Request $request, Closure $next)
    {
        $validator = $request->validate([
            "username" => "required",
            "password" => "required"
        ]);
        // dump($request);
        if($validator->fails()){
            return $next($request);
        }
        // echo "gg";
        // return true;
    }
}