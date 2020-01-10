
Run on laravel on a Apache server:

Clone the project then, from within the projects directory run:

## composer install

Set up the react dependencies with:

## npm install

Create a .env file (this is needed for laravel).

Optional

## Create a database

Migrate the data into laravel using:

## php artisan migrate

Add your database details (variables) to the .env file.

Run the react dev server using 'npm run watch'.

To start the laravel development:

## php artisan server --port=8080