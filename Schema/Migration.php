<?php
namespace Schema;
use Core\Database\Schema;

class Migration
{
    function create()
    {
        // Users Table
        Schema::create('users', [
            "id" => "int|inc|primary|",
            "firstname" => "text",
            "lastname" => "text",
            "email" => "text",
            "username" => "text",
            "password" => "text",
            "file" => "text",
            "type" => "text"
        ]);
        Schema::create('posts', [
            "id" => "int|inc|primary",
            "userId" => "int",
            "categoryId" => "int",
            "title" => "text",
            "description" => "text",
            "preview" => "text",
            "file" => "text",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)",
            "likes" => "int|default(0)",
            "views" => "int|default(0)",
            "comments" => "int|default(0)"
        ]);
        Schema::create('comments', [
            "id" => "int|inc|primary",
            "portfolioId" => "int",
            "userId" => "int",
            "content" => "text",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);
        Schema::create('likes', [
            "id" => "int|inc|primary",
            "userId" => "int",
            "portfolioId" => "int",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)"            
        ]);
        Schema::create('notifications', [
            "id" => "int|inc|primary",
            "userId" => "int",
            "portfolioId" => "int",
            "type" => "text",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);
        Schema::create('Follow', [
            "id" => "int|inc|primary",
            "followerId" => "int",
            "followingId" => "int",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);
        Schema::create('chats', [
            "id" => "int|inc|primary",
            "senderId" => "int",
            "receiverId" => "int",
            "content" => "text",
            "dateCreated" => "timestamp|default(CURRENT_TIMESTAMP)"
        ]);
        Schema::create('contacts', [
            'id' => 'int|inc|primary',
            'user1' => 'int',
            'user2' => 'int',
            'dateCreated' => 'timestamp|default(CURRENT_TIMESTAMP)'
        ]);
        Schema::create('Categories', [
            'id' => 'int|inc|primary',
            'name' => 'text',
            'dateCreated' => 'timestamp|default(CURRENT_TIMESTAMP)'
        ]);
        Schema::create('Jobs', [
            'id' => 'int|inc|primary',
            'userId' => 'int',
            // 'companyName' => 'text',
            'jobTitle' => 'text',
            'jobDescription' => 'text',
            'location' => 'text',
            // 'type' => 'text',
            'dateCreated' => 'timestamp|default(CURRENT_TIMESTAMP)'
        ]);
    }
}