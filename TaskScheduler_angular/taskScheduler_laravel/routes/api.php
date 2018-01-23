<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

   Route::get('/getData',['uses'=>'LoginController@getData']);

   Route::get('/getTasks/{id}',['uses'=>'LoginController@getTasks']);

   Route::get('/getTaskAssignee/{id}',['uses'=>'LoginController@getTaskAssignee']);

   Route::post('/saveData',['uses' => 'LoginController@saveData']);

   Route::post('/validateData',['uses' => 'LoginController@validateData']);

   Route::post('/changeData',['uses' => 'LoginController@changeData']);

   Route::get('/getTask/{id}',['uses' => 'LoginController@getTask']);

   Route::put('/updateTask/{id}',['uses' => 'LoginController@updateTask']);

   Route::get('/deleteTask/{id}',['uses' => 'LoginController@deleteTask']);

   Route::post('/addTask',['uses' => 'LoginController@addTask']);

   Route::get('/getMyTasks/{id}',['uses'=>'LoginController@getMyTasks']);

   Route::post('/updateStatus',['uses'=>'LoginController@updateStatus']);