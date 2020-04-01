<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class sendingMail extends Mailable
{
    use Queueable, SerializesModels;


    public $details;


    //create instance 
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Progresso, your online To-Do list')

                    ->view('emails.sendingEmails');
    }



    
}
