<?php

namespace App;

use App\ToDoList;
use Illuminate\Database\Eloquent\Model;

class ToDoListUser extends Model
{


    protected $table = 'to_do_list_user';

    protected $fillable = ['user_id', 'to_do_list_id', 'role'];
    public function todolistusers()
    {
        return $this->belongsTo('App\ToDoList');
    }

    public function users()
    {
        return $this->belongsTo('App\User');
    }
}
