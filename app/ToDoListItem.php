<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ToDoListItem extends Model
{
    protected $fillable = ['to_do_list_id', 'state', 'content' ];

    public function todolist()
    {
        return $this->belongsTo('App\ToDoList');
    }
}
