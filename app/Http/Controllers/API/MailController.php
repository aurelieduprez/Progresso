<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;


class MailController extends Controller
{
 


    public function __construct()
    {
        $this->middleware('auth');
    }

    public function emailSignup(){

        $details = [

            'title' => 'Progresso, your online to-do list.',
    
            'body' => "Thank you for signing up ! 
            Let's organise your buzy work days.
            We think computers should help you manage your projects, so you don't forget what's important.
            Progresso reunites all your task-lists in your Home Page and allows you to easily share them with your team."
    
        ];
    
       
    
        \Mail::to(Auth::user()->email)->send(new \App\Mail\sendingMail($details));
        dd("Email is Sent.");
    
        
    }




    public function emailInvitation($id){


        $details = [

            'title' => 'Progresso, your online to-do list.',
    
            'body' => "You received an invitation to get in a new To-do list. Click the following link to enter : http://localhost:8000/ToDoList/" + $id
    
        ];
    
       
    
        \Mail::to(Auth::user()->email)->send(new \App\Mail\sendingMail($details));
        dd("Email is Sent.");
    }

}
