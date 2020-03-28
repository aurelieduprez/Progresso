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
            'user_id' =>  Auth::user(),
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
        $myToDoListUser = ToDoListUser::find(id);   
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
        $myToDoListUser = ToDoList::find($id);
        $myToDoListUser->title = $request->input('user_id');
        $myToDoListUser->state = $request->input('to_do_list_id');
        $myToDoListUser->closed = $request->input('role');
        $myToDoListUser->save();
        return response()->json(["user_id" => $request->input('user_id')], 200); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $myToDoListUser = ToDoListUser::find($id);
        $myToDoListuser->delete();
        return true; 
    }

}
