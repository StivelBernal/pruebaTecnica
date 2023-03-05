<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('map');
});

Route::get('/ciudad/{city?}', function ($city = null) {
    if (!isset($city))
        return view('map');
    else 
        return view('city', array(
            'city' => $city
        ));
});
