<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\API\MailController;
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
    public function GetId(Request $request)
    {
        $myToDoListUser = User::where('email', $request->input('email'))->first();
        return response($myToDoListUser, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        if ($request->has('user_id')) {
            ToDoListUser::create([
                'user_id' =>  $request->input('user_id'),
                'to_do_list_id' => $request->input('to_do_list_id'),
                'role' => $request->input('role')
            ]);

            // send invitation mail
            $details = [
                'title' => 'Progresso, your online to-do list.',
                'body' => "You received an invitation to get in a new To-do list. Click the following link to enter : http://localhost:8000/todolist/" . $request->input('to_do_list_id')
            ];
            $email = $request->input('email');
            \Mail::to($email)->send(new \App\Mail\sendingMail($details));
        } else {
            ToDoListUser::create([
                'user_id' =>  Auth::user()->id,
                'to_do_list_id' => $request->input('to_do_list_id'),
                'role' => $request->input('role')
            ]);
        }
        return response($request, 200);
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

    public function currentRole($id)
    {
        $myToDoListUser = ToDoListUser::where('to_do_list_id', $id)->get();
        Auth::user()->id;
        for ($i = 0; $i < count($myToDoListUser); $i++) {
            if ($myToDoListUser[$i]->user_id == Auth::user()->id) {
                $user_role = $myToDoListUser[$i]->role;
                break;
            }
        }
        return $user_role;
    }



    public function GetUsers($id)
    {
        $toreturn = [];
        $myToDoListUser = ToDoListUser::where('to_do_list_id', $id)->get();

        for ($i = 0; $i < count($myToDoListUser); $i++) {
            $user = User::where('id', $myToDoListUser[$i]->user_id)->first();
            $profile = ["user_id" => $myToDoListUser[$i]->user_id, "name" => $user->name, "role" => $myToDoListUser[$i]->role];
            array_push($toreturn, $profile);
        }


        return ($toreturn);
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
        $myToDoListUser = ToDoListUser::where('to_do_list_id', $id)->where('user_id', $request->input('user_id'))->first();
        $myToDoListUser->role =  $request->input('role');
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
        $myToDoListuser = ToDoListUser::where('to_do_list_id', $id);
        $myToDoListuser->delete();
        return response(true, 200);
    }
}
