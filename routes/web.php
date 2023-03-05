<?php

use App\Http\Controllers\AppWeatherController;
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
    return view('map',  [
        'title' => 'Inicio',
        'locations' => [
            'NewYork' => AppWeatherController::getDataLocation(40.710196697138045, -73.99848264930623),
            'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534),
            'Miami' => AppWeatherController::getDataLocation(25.756729, -80.200279),
        ]
    ]);
});

Route::get('/ciudad/{city?}', function ($city = null) {
    if (!isset($city))

        return view('map', [
            'title' => 'Inicio mapa',
            'locations' => [
                'NewYork' => AppWeatherController::getDataLocation(40.710196697138045, -73.99848264930623),
                'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534),
                'Miami' => AppWeatherController::getDataLocation(25.756729, -80.200279)
            ]
        ]);
    else 
        // traeremos los datos de la ciudad
        // switch ($city) {
        //     case 'value':
        //         # code...
        //      'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534, true),
        //         break;
            
        //     default:
        //         # code...
        //         break;
        // }


        return view('city', array(
            'city' => $city
        ));
});
