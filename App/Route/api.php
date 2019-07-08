<?php
use Core\Hashing\Hash;
use Core\Http\{Request, Response};
// use Core\Http\Request;
use Core\Cookies\Session;
use Core\Database\DB;

use App\Http\Controllers\Auth;
use App\Http\Models\{User, Posts, Comments};
// use App\Http\Models\Posts;
// use App\Http\Models\Comments;
use Core\BroadCast;
use Core\File;

/**
 * Routing for REST API
 *
 * Same as web routing but the only difference are
 * you must return an array or string instead of
 * using toJson function to render it to the browser
 * for a better and cleaner code
 */

$route->get('/getCategories', function(Request $request): Response{
    return toJson(DB::select('categories', '*'));
});

$route->get('/getJobs', function(Request $request): Response{
    return toJson(DB::select('jobs', [
        '[>]users' => ['userId' => 'id']
    ], '*'));
});
 
$route->post('/addJobs', function(Request $request): Response{
    $validator = $request->validate([
        // 'companyName' => 'required',
        'jobDescription' => 'required',
        'jobTitle' => 'required',
        'location' => 'required',
        // 'type' => 'required',
    ]);
    if($validator->fails()){
        return toJson(['success' => false, 'msg' => 'All fields are required']);
    }
    $check = DB::insert('jobs', [
        'userId' => Auth::user('id'),
        // 'companyName' => $request->input('companyName'),
        'jobDescription' => $request->input('jobDescription'),
        'jobTitle' => $request->input('jobTitle'),
        'location' => $request->input('location'),
        // 'type' => $request->input('type'),
    ]);
    if(!$check){
        return toJson(['success' => false, 'msg' => 'Error inserting to Database']);        
    }
    return toJson(['success' => true, 'msg' => 'Saved!']);    
});

function reFactorMultipleFilels($file_post) {
    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}

// $route->get('/search/:search', function(Request $request): Response{
//     if($request->input('search') !== ''){

//         $user = User::select('*', [
//             "firstname[~]" => $request->input('search'),
//             "lastname[~]" => $request->input('search'),
//             "email[~]" => $request->input('search'),
//             "username[~]" => $request->input('search')
//         ]);
//         $portfolio = Posts::select('*', [
//             "title[~]" => $request->input('search'),
//             "description[~]" => $request->input('search'),
//             "category[~]" => $request->input('search'),
//             "file[~]" => $request->input('search'),
//         ]);
//         return toJson([
//             "portfolios" => $portfolio,
//             "users" => $user
//         ]);
//     }
//     return toJson([]);
// });

$route->post('/totalFollow', function(Request $request): Response{
    // return toJson($request->all());
    $data = [];
    $data['follower'] = DB::count('follow', [
        'followingId' => $request->input('id')
    ]);
    $data['following'] = DB::count('follow', [
        'followerId' => $request->input('id')
    ]);
    return toJson($data);
});

$route->post('/checkIfFollowed', function(Request $request): Response{
    return toJson(DB::has('follow', [
        'followerId' => $request->input('id'),
        'followingId' => Auth::user('id')
    ]));
});

$route->post('/follow', function(Request $request): Response{
    if(!DB::has('follow', [
        'followerId' => $request->input('following'),
        'followingId' => Auth::user('id')
    ])){
        $check = DB::insert('follow', [
            'followerId' => Auth::user('id'),
            'followingId' => $request->input('following')
        ]);
        return toJson(['success' => true]);
    } else {
        $check = DB::delete('follow', [
            'followerId' => Auth::user('id'),
            'followingId' => $request->input('following')
        ]);
        return toJson(['success' => true]);
    }
    return toJson(['success' => false]);
});

$route->post('/updateProfile', function(Request $request): Response{
    return toJson($request->all());
    User::update([
        'firstname' => $request->input('firstname'),
        'lastname' => $request->input('lastname'),
        'username' => $request->input('username'),
        'location' => $request->input('location'),
        'about' => $request->input('about'),
    ], [
        'id' => Auth::user('id')
    ]);
    return toJson(['success' => true]);
});

$route->get('/contacts', function($request){
    $dbs = DB::select('contacts', '*');
    if(Session::has('user')){
        $data = [];
        foreach($dbs as $db){
            if($db['user1'] != Auth::user('id')){
                array_push($data, User::select('*', ['id' => $db['user1']])[0]);
            }
            elseif($db['user2'] != Auth::user('id')){
                array_push($data, User::select('*', ['id' => $db['user2']])[0]);
            }
        }
        return toJson($data);
    }
    return toJson([]);
});
$route->post('/messages', function($request){
    return toJson(DB::select('chats', [
        'id', 'senderId', 'receiverId', 'content', 'dateCreated'
    ], [
        'OR #asdasd' => [
            'AND #asdasd' => [
                'receiverId' => $request->input('receiverId'),
                'senderId' => Auth::user('id')
            ],
            'AND #asdasdasd' => [
                'receiverId' => Auth::user('id'),
                'senderId' => $request->input('receiverId'),
            ]
        ]
    ]));
});

$route->get('/search/:content', function($request){
    $db['projects'] = DB::select('posts', '*', [
        "title[~]" => $request->input('content')
    ]);
    $db['users'] = User::select('*', [
        "OR" => [
            'firstname[~]' => $request->input('content'),
            'lastname[~]' => $request->input('content'),
            'email[~]' => $request->input('content'),
            'username[~]' => $request->input('content')
        ]
    ]);
    return toJson($db);
});

$route->post('/addToContacts', function(Request $request) {
    // return toJson($request->all());
    // if($request->input('content') !== ''){
        $check = DB::has('contacts', [
            'OR #asdasd' => [
                "AND #asdasd" => [
                    'user1' => $request->input('id'),
                    'user2' => Auth::user('id'),
                ],
                "AND #asdsad" => [
                    'user1' => Auth::user('id'),
                    'user2' => $request->input('id')
                ]
            ]
        ]);
        // return toJson($check);
        if(!$check && $request->input('id') !== '' && Session::has('user')){
            DB::insert('contacts', [
                'user1' => $request->input('id'),
                'user2' => Auth::user('id')
            ], [
                'user1' => Auth::user('id'),
                'user2' => $request->input('id')
            ]);
            return toJson(['success' => true]);
        }
        return toJson(['error' => 'Already in Contacts']);
    // }
    // return toJson(['error' => 'error sending message']);
});

$route->get('/checkIfAlreadyInContacts/:id', function($request){
    return toJson(DB::has('contacts', [
        'OR #asdasd' => [
            "AND #asdasd" => [
                'user1' => $request->input('id'),
                'user2' => Auth::user('id'),
            ],
            "AND #asdsad" => [
                'user1' => Auth::user('id'),
                'user2' => $request->input('id')
            ]
        ]
    ]));
});

$route->post('/newMessage', function($request): Response{
    if($request->input('content') !== ''){
        $check = DB::has('contacts', [
            'OR #asdasd' => [
                "AND #asdasd" => [
                    'user1' => $request->input('receiver')->id,
                    'user2' => Auth::user('id'),
                ],
                "AND #asdsad" => [
                    'user1' => Auth::user('id'),
                    'user2' => $request->input('receiver')->id
                ]
            ]
        ]);
        // return toJson($check);
        if(!$check && $request->input('receiver')->id !== '' && Session::has('user')){
            DB::insert('contacts', [
                'user1' => $request->input('receiver')->id,
                'user2' => Auth::user('id')
            ], [
                'user1' => Auth::user('id'),
                'user2' => $request->input('receiver')->id
            ]);
        }
        $db = DB::insert('chats', [
            'senderId' => Auth::user('id'),
            'receiverId' => $request->input('receiver')->id,
            'content' => $request->input('content')
        ]);
        if($db->id()){
            $broadcast = new BroadCast();
            $broadcast->emit('newMessage');
            $broadcast->close();
            return toJson(['success' => true]);
        }
        return toJson(['error' => 'error sending message']);
    }
    return toJson(['error' => 'Input Fields are empty']);
});

$route->post('/users', function($request){
    return $request->input('user') ? toJson(User::select('*', [
        "username[~]" => $request->input('user')
    ])): toJson([]);
});

$route->post('/portfolio/content', function ($request) {
    // $file = "Public/upload/portfolios/{$request->input('title')}";
    // $mimeType = File::getMimeType($file);
    // if(preg_match("/image\/.+/", $mimeType)){
    //     $fetch = File::imgToBase64($file);
    // }
    // return $fetch;
    // return toJson($request->all());
    // return toJson($request->all());
    function formatFile($file){
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        return [
            'name' => basename($file),
            'date' => date("F/d/y H:i:s", filemtime($file)),
            'type' => mime_content_type($file),
            'size' => filesize($file)
        ];
    }
    function loadDir($dir){
        $looseFiles = glob("$dir/*");
        $files = [];
        foreach($looseFiles as $looseFile){
            $files[] = formatFile($looseFile);
        }
        return $files;
    }
    $files = loadDir("../Public/uploads/portfolios/{$request->input('id')}/{$request->input('title')}");
    return toJson($files);
});

$route->get('/notifications', function($request){
    if(Session::has('user')){
        return toJson(DB::select('notifications', [
            '[>]posts' => ['portfolioId' => 'id'],
            '[>]users' => ['userId' => 'id']
        ], [
            'posts.userId(ownerId)', 'posts.id(portfolioId)',
            'notifications.id', 'notifications.userId(fellowId)', 'notifications.type',
            'users.file', 'users.username'
        ], [
            'posts.userId' => Auth::user('id')
        ]));
    }
    return toJson([]);
});

$route->get('/example/:id', function(){
    return toJson('Hello');
}, 'Validate::signin');

$route->post('/getFileContent', function(Request $request): Response{
    $file = "Public/uploads/portfolios/{$request->input('filename')}";
    $mimeType = File::getMimeType($file);
    if(preg_match("/image\/.+/", $mimeType)){
        $fetch = File::imgToBase64($file);
    } else {
        $fetch = File::readAsText($file);
    }
    // $data = $fetch ;
    return toJson([
        "data" => $fetch,
        "type" => $mimeType,
        "title" => "file.name"
    ]);
    return toJson($text);
});

$route->post('/file', function(Request $request): Response{
    // return toJson($request->all());
    function formatFile($file){
        $ext = pathinfo($file, PATHINFO_EXTENSION);
        return [
            'name' => basename($file),
            'date' => date("F/d/y H:i:s", filemtime($file)),
            'type' => mime_content_type($file),
            'size' => filesize($file)
        ];
    }
    function loadDir($dir){
        $looseFiles = glob("$dir/*");
        $files = [];
        foreach($looseFiles as $looseFile){
            $files[] = formatFile($looseFile);
        }
        return $files;
    }
    $files = loadDir("../Public/uploads/portfolios/{$request->input('dir')}");
    return toJson($files);
});

$route->get('/userDetails', function($request){
    return toJson(Auth::user());
});

$route->post('/like/:portfolioId', function(Request $request){
    if(Session::has('user')){
        $check = DB::has('likes', [
            "userId" => Auth::user('id'),
            "portfolioId" => $request->input('portfolioId')
        ]);
        if(!$check){
            $attempt = DB::insert('likes', [
                "userId" => Auth::user('id'),
                "portfolioId" => $request->input('portfolioId')
            ]);
            Posts::update(['likes[+]' => 1], [
                "id" => $request->input('portfolioId')
            ]);
            if(!$attempt->id()){
                return toJson(['error' => true]);
            }
            DB::insert('notifications', [
                'userId' => Auth::user('id'),
                'portfolioId' => $request->input('portfolioId'),
                'type' => 'like'
            ]);
            $broadcast = new BroadCast();
            $broadcast->emit('updateLike');
            $broadcast->close();
            // return toJson(['success' => true]);
        } else {
            DB::delete('likes', [
                "userId" => Auth::user('id'),
                "portfolioId" => $request->input('portfolioId')
            ]);
            $broadcast = new BroadCast();
            $broadcast->emit('updateLike');
            $broadcast->close();
        }
        return toJson(['success' => true]);
    }
    return toJson([]);
});

$route->get("/user/:username", function($request){
    return toJson(User::select('*', [
        "username" => $request->input('username')
    ]));
});

$route->post('/portfolios/:username', function($request){
    return toJson(Posts::select([
        "[>]users" => ["userId" => "id"]
    ], [
        "users.id(userId)", "users.username", "users.file(profile)",
        "posts.id", "posts.title", "posts.description", "posts.file", "posts.preview", "posts.likes", "posts.views", "posts.comments"
    ], [
        "ORDER" => [$request->input('sort') => "DESC"],
        "username" => $request->input('username')
    ]));
});

$route->get('/myportfolios', function(){
    return toJson(Posts::select('*', [
        "id" => Auth::user('id')
    ]));
});

$route->get('/comments', function($request){
    return toJson(Comments::select('*'));
});

$route->post('/newComments', function($request){
    $validator = $request->validate([
        // "userId" => "required",
        // "portfolioId" => $request->input('portfolioId'),
        "comment" => "required"
    ]);
    if(!$validator->fails()){
        $check = Comments::insert([
            "userId" => Auth::user('id'),
            "portfolioId" => $request->input('portfolioId'),
            "content" => $request->input('comment')
        ]);
        Posts::update(['comments[+]' => 1], [
            'id' => $request->input('portfolioId')
        ]);
        DB::insert('notifications', [
            'userId' => Auth::user('id'),
            'portfolioId' => $request->input('portfolioId'),
            'type' => 'comment'
        ]);
        if($check->id()){
            $broadcast = BroadCast::start();
            $broadcast->emit('newComment');
            $broadcast->close();
            return toJson(['success' => 'true']);
        }
    }
    return toJson(['error' => 'false']);
});

$route->get('/portfolio/:id/comments', function($request){
    return toJson(Comments::select([
        "[>]users" => ["userId" => "id"]
    ], [
        "comments.content", "comments.id", "comments.dateCreated",
        "users.username"
    ], [
        "ORDER" => ["dateCreated" => "DESC"],
        'portfolioId' => $request->input('id')
    ]));
});

$route->get('/test', function($request){
    return toJson(DB::select('likes', '*'));
});

$route->get('/portfolio/:id/likes', function(Request $request){
    return toJson(DB::select('likes', '*', [
        "portfolioId" => $request->input('id')
    ]));
});

$route->get('/portfolio/:id', function($request){
    Posts::update(['views[+]' => 1], [
        'id' => $request->input('id')
    ]);
    return toJson(Posts::select([
        "[>]users" => ["UserId" => "id"]
    ], [
        "posts.id", "posts.title", "posts.description", "posts.file", "posts.preview",
        "users.username", "users.id(userId)"
    ], [
        "ORDER" => ["dateCreated" => "DESC"],
        "posts.id" => $request->input('id')
    ]));
});

// $route->get('/portfolio', function($request){
//     $data = Posts::select([
//         "[>]users" => ["UserId" => "id"]
//     ], [
//         "users.id(userId)", "users.username", "users.file(profile)",
//         "posts.id", "posts.title", "posts.description", "posts.file", "posts.preview", "posts.likes", "posts.views", "posts.comments"
//     ], [
//         "ORDER" => ["dateCreated" => "DESC"]
//     ]);
//     return toJson($data);
// });

$route->post('/portfolio', function($request){
    // return toJson($request->all());
    if($request->input('categoryId') !== null){
        $where = [
            "categoryId" => $request->input('categoryId'),
            "ORDER" => [$request->input('sort') => "DESC"],
        ];
    } else {
        $where = [
            // "categoryId" => $request->input('categoryId'),
            "ORDER" => [$request->input('sort') => "DESC"],
        ];
    }
    $data = Posts::select([
        "[>]users" => ["UserId" => "id"]
    ], [
        "users.id(userId)", "users.username", "users.file(profile)",
        "posts.id", "posts.title", "posts.description", "posts.file", "posts.preview", "posts.likes", "posts.views", "posts.comments"
    ], $where);
    return toJson($data);
});
// 
$route->post('/newPost', function($request){
    // return toJson($request->all());
    $files = reFactorMultipleFilels($request->input('file'));
    $validator = $request->validate([
        "title" => "required",
        "desc" => "required",
        // "preview" => "required",
        "file" => "required",
        "category" => "required"
    ]);
    if($validator->fails()){
        // return toJson($validator->error());
        return toJson(["error" => "All fields are required"]);
    }
    $db = Posts::add($request, $files[0]);
    if(!$db->id()){
        return toJson(["error" => "Upload failed"]);
    } else {
        $userId = Auth::user('id');
        File::move("Public/uploads/preview/{$userId}/{$request->input('title')}/", $files[0]);
        foreach($files as $key => $file){
            File::move("Public/uploads/portfolios/{$userId}/{$request->input('title')}/", $file);
        }
        // if(
            //     File::move("Public/uploads/preview/{$userId}/{$request->input('title')}/", 
            //     $request->input('preview')) && 
            //     File::extractZip("Public/uploads/portfolios/{$userId}/{$request->input('title')}/", 
            //     $request->input('file')))
            // {
        $broadcast = BroadCast::start();
        $broadcast->emit('newPortfolio');
        $broadcast->close();
                // }
        return toJson(["success" => "Portfolio submitted!"]);
    }
});
// Sign in
$route->post('/login', 'UserController::Signin');
// Sign up
$route->post('/register', 'UserController::Signup');

$route->get('/users', function($request){
    return toJson(DB::select('users', '*'));
});

$route->get('/getPortfolios', function($request){
    return toJson(DB::select('posts', '*'));
});

$route->get('/getAllJobs', function($request){
    return toJson(DB::select('jobs', '*'));
});

$route->get('/getUser', function($request){
    if(Session::has('user')){
        return toJson(User::select('*', [
            "id" => Auth::user('id')
        ])[0]);
    }
    return toJson([]);
});

$route->get('/logout', function($request){
    Auth::SignOut();
    return redirect('/');
});