<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}"  rel="stylesheet">

    </head>
    <body>
        <div class="flex-center position-ref full-height">

        <div class="theme-switch-wrapper">
            <label class="theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" />
                <div class="slider round"></div>
            </label>
            <p class="text-switch">Dark Mode</p>
        </div>

            @if (Route::has('login'))
                <div class="top-right links">
                    @auth
                        <a href="{{ url('/home') }}">Home</a>
                    @else
                        <a href="{{ route('login') }}">Login</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}">Register</a>
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



        <script>
            const prefersColorSchemeDark = window.matchMedia('(prefers-color-scheme: dark)');
            if (prefersColorSchemeDark.matches) {
            console.log(prefersColorSchemeDark, "OUIé")
            }else {
                console.log(prefersColorSchemeDark, "TA GUELE")
            }
            console.log(prefersColorSchemeDark)

            const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

            toggleSwitch.addEventListener('change', switchTheme, false);

            function switchTheme(e) {
                if (e.target.checked) {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                    console.log("blackface")
                }
                else {
                    document.documentElement.setAttribute('data-theme', 'light');
                    localStorage.setItem('theme', 'light');
                    console.log("white privilege")
                }    
            }

            const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

            if (currentTheme) {
                document.documentElement.setAttribute('data-theme', currentTheme);

                if (currentTheme === 'dark') {
                    toggleSwitch.checked = true;
                }
            }
        </script>
    </body>
</html>
