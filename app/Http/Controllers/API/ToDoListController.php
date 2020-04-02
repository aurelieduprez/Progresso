<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ToDoListItem;
use App\ToDoList;
use App\ToDoListUser;
use App\User;

class ToDoListController extends Controller
{


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = Auth::user()->todolists;
        return response()->json($list, 200);
    }

    public function find($id)
    {
        $todolist = ToDoList::find($id);

        $items = ToDoListItem::where('to_do_list_id', $id)->get();

        $toreturn =
            [
                "title"   => $todolist->title,
                "todo" => $items
            ];

        if ($todolist == NULL || $items == NULL) {
            return response('', 404);
        }
        $user_role = ToDoListUser::where('user_id', Auth::id())->where('to_do_list_id', $id)->first();

        if ($user_role != false && $user_role->role != 0) {
            return response($toreturn, 200);
        } else {
            return response('', 401);
        }
    }




    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function create(Request $request)
    {
        $todo = ToDoList::create([
            'title' => $request->input('title'),
            'closed' => false,
            'user_id' => Auth::id()
        ]);

        $request_object = (object) $request->input('content');

        for ($i = 0; $i < count($request->input('content')); $i++) {
            if (!property_exists(((object) $request_object->{$i}), 'title')) {
                ToDoListItem::create([
                    'to_do_list_id' => $todo->id,
                    'content' => ((object) $request_object->{$i})->value,
                    'state' => ((object) $request_object->{$i})->done
                ]);
            }
        }
        return response()->json($todo, 200);
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $myToDoList = ToDoList::find($id);
        return $myToDoList;
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
        $myToDoList = ToDoList::find($id);
        if ($myToDoList == NULL) {
            return response('', 404);
        }
        $myToDoList->title = $request->input('title');
        $myToDoList->closed = $request->input('closed');
        $myToDoList->save();

        return response()->json($myToDoList, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $myToDoList = ToDoList::find($id);
        if ($myToDoList == NULL) {
            return response('', 404);
        }
        $myToDoList->delete();
        return response('');
    }
}
