<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\ToDoListUser;
use App\User;
use Illuminate\Support\Facades\Auth;
//use App\User;
class ToDoListUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        ToDoListUser::create([
            'user_id' =>  Auth::user()->id,
            'to_do_list_id' => $request->input('to_do_list_id')
        ]);
        return response(true, 200); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $myToDoListUser = ToDoListUser::where('to_do_list_id', $id)->get();   
        return $myToDoListUser;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $myToDoListUser = ToDoListUser::where('to_do_list_id', $id)->where('user_id', $request->input('user_id'))->get();
        $myToDoListUser-> $request->input('role');
        $myToDoListUser->save();
        return response(true, 200); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $myToDoListuser = ToDoListUser::where('to_do_list_id',$id);
        $myToDoListuser->delete();
        return response(true,200); 
    }

}
