<?php

use Illuminate\Support\Facades\Route;

use App\ToDoList;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');


Route::get('/todolist/{url}', 'ToDoListController@index');


Route::get('/items', function(){
    return ToDoList::find(1)->users;
});






Route::namespace('API')->group(function () {

    Route::get('api/ToDoList', 'ToDoListController@index');
    Route::get('api/ToDoList/{id}', 'ToDoListController@find');
    Route::post('api/ToDoList', 'ToDoListController@create');
    Route::put('api/ToDoList/{id}', 'ToDoListController@update');
    Route::delete('api/ToDoList/{id}', 'ToDoListController@destroy');


    //Route::apiResource('ToDoListItem', 'api\ToDoListItemController');
    //Route::get('api/ToDoList/{id]/items', 'ToDoListItemController@index');
    Route::post('api/ToDoList/{id}/items', 'ToDoListItemController@store');
    Route::put('api/ToDoList/{id}/items', 'ToDoListItemController@update');
    Route::delete('api/ToDoList/items/{id_item}', 'ToDoListItemController@destroy');
    Route::post('api/ToDoListUser', 'ToDoListUserController@create');

    //Route::apiResource('ToDoListUser', 'api\ToDoListUserController');
});

