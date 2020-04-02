composer install
wait
npm i 
wait 
php artisan migrate:fresh
wait
php artisan key:generate
wait
npm run prod
wait
php artisan serve 