<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ToDoListItem;

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
        ToDoList::create([
            'to_do_list_id' => $request->input('to_do_lidt_id'),
            'state' => $request->input('state'),
            'content' => $request->input('content'),
        ]);
        return response()->json(["conten" => $request->input('content')], 200); 
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        {
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
        $myToDoListItem->state = $request->input('state');
        $myToDoListItem->closed = $request->input('content');
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
        $myToDoListItem = ToDoListItem::find($id);
        $myToDoListItem->delete();
        return true; 
    }
}
