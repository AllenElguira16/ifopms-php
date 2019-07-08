<?php 
/**
 * Basic Web Routing
 * 
 * This is were URL will handle request and be served to the browser
 */
use Core\Cookies\Session;
use Core\Database\DB;
use Core\Http\Response;
use Core\BroadCast;
use App\Controllers\Auth;

$route->get('/dashboard', function() {
    return view('dashboard');
});

$route->get('/dashboard/projects', function() {
    return view('dashboard');
});

$route->get('/dashboard/jobs', function() {
    return view('dashboard');
});

$route->get('/dashboard/reports', function() {
    return view('dashboard');
});

$route->get("*", function (){
    return view("base");
});
