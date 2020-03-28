<?php

namespace App;
use App\ToDoList;
use Illuminate\Database\Eloquent\Model;

class ToDoListUser extends Model
{
    protected $fillable = ['user_id', 'to_do_list_id', 'role'];
    public function todolistusers()
    {
        return $this->belongsTo('App\ToDoList');
        return $this->belongsTo('App\User');
    }
}
