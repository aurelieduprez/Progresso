<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ToDoList;

class ToDoListController extends Controller
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
        $todo = ToDoList::create([
            'title' => $request->input('title'),
            'state' => $request->input('state'),
            'closed' => $request->input('closed'),
        ]);
        return response()->json(["id" => $todo->id], 200); 
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
        $myToDoList->title = $request->input('title');
        $myToDoList->state = $request->input('state');
        $myToDoList->closed = $request->input('closed');
        $myToDoList->save();
        return response()->json(["title" => $request->input('title')], 200); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $myToDoList = ToDoList::find($id);
        $myToDoList->delete();
        return true; 
    }
}
