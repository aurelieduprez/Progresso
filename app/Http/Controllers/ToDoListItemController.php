<?php

namespace App\Http\Controllers;

use App\ToDoListItem;
use Illuminate\Http\Request;

class ToDoListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ToDoListItem  $toDoListItem
     * @return \Illuminate\Http\Response
     */
    public function show(ToDoListItem $toDoListItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ToDoListItem  $toDoListItem
     * @return \Illuminate\Http\Response
     */
    public function edit(ToDoListItem $toDoListItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ToDoListItem  $toDoListItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ToDoListItem $toDoListItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ToDoListItem  $toDoListItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(ToDoListItem $toDoListItem)
    {
        //
    }
}
