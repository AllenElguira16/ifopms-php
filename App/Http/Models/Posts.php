<?php
namespace App\Http\Models;

use Core\Database\DB;
use Core\Framework\Model;
use App\Http\Controllers\Auth;

class Posts extends Model{
    protected static $table = "Posts";

    static function add($request, $file){
        // return toJson($request);
        return static::insert([
            "userId" => Auth::user('id'),
            "title" => $request->input('title'),
            "description" => $request->input('desc'),
            "categoryId" => $request->input('category'),
            "preview" => $file['name'],
            // "file" => $request->input('file')['name'],
        ]);
    }
}