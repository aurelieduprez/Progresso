@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card">
                    <div class="card-header">My TODO-list</div>
                    <div class="card-body" id="todolist-preview" >
                    </div>
                </div>

                <div class="card">
                <button onclick="window.location='{{ url("todolist") }}'" >Create new TODO-list</button>
                </div>
        </div>
    </div>
</div>

@endsection
