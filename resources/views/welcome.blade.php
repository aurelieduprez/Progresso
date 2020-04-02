<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <script src="{{ asset('js/app.js') }}" defer></script>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}"  rel="stylesheet">

    </head>
    <body>
        <div class="flex-center position-ref full-height">

        <div class="theme-switch-wrapper" id="switch-welcome">
            <label class="theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" />
                <div class="slider round"></div>
            </label>
        </div>

        @if (Route::has('login'))
                <div class="links">
                    @auth
                        <span id="boxHome">
                            <a href="{{ url('/home') }}" class="welcome-link">Home</a>
                        </span>
                    @else
                        <span id="boxLogin">
                            <a href="{{ route('login') }}" class="welcome-link">Login</a>    
                        </span>
                        @if (Route::has('register'))
                        <span id="boxRegister">
                            <a href="{{ route('register') }}" class="welcome-link">Register</a>
                        </span>
                        @endif
                    @endauth
                </div>
            @endif

            <div class = "boxTitle">
                <div class="title">
                    Progresso
                </div>
                <div class="subtitle">
                    for your easy to-do lists
                </div>
            </div>
        </div>
    </body>
</html>
