<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ToDoListItem;
use App\ToDoList;

class ToDoListItemController extends Controller
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
    public function store(Request $request)
    {

        $item =  ToDoListItem::create([
            'to_do_list_id' => $request->input('id'),
            'content' => $request->input('content'),
            'state' => "0"
        ]);

        return response()->json($item->id, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    { {
            $myToDoListItem = ToDoListItem::find($id);
            return $myToDoListItem;
        }
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
        $myToDoListItem = ToDoListItem::find($id);
        $myToDoListItem->content = $request->input('content');
        $myToDoListItem->state = $request->input('state');
        $myToDoListItem->save();
        return response()->json(["content" => $request->input('content')], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $myToDoListItem = ToDoListItem::where('id', $id);
        $myToDoListItem->delete();
        return response(true, 200);
    }
    
    public function doneToggle($id)
    {
        $myToDoListItem = ToDoListItem::where('id', $id)->first();
        if($myToDoListItem->state){
            $myToDoListItem->state = 0;
            $myToDoListItem->save();
        }
        else{
            $myToDoListItem->state = 1;
            $myToDoListItem->save();
        }
        
        return response(true, 200);
    }
}
