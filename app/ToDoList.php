<?php

namespace App;
use Illuminate\Database\Eloquent\Model;
use App\ToDoListItem;


class ToDoList extends Model
{
    protected $fillable = ['title', 'state', 'closed', 'user_id' ];

      public function items()
    {
        return $this->hasMany('App\ToDoListItem');
    }

    public function users()
    {
        return $this->belongsToMany('App\User');
    }


}

