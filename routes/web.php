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

Route::get('/ciudad/{city}', function ($city) {

        $cityData = null; 

        $cityS = strtolower(str_replace(' ', '', $city));

        switch ($cityS) {
            case 'orlando':
                $cityData = AppWeatherController::getDataLocation(40.710196, -73.998482);
                break;
            case 'newyork':
                $cityData = AppWeatherController::getDataLocation(28.552296, -81.406534);
                break;
            case 'miami':
                $cityData = AppWeatherController::getDataLocation(25.756729, -80.200279);
                break;
            default: 
                return view('map',  [
                    'title' => 'Inicio',
                    'locations' => [
                        'NewYork' => AppWeatherController::getDataLocation(40.710196697138045, -73.99848264930623),
                        'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534),
                        'Miami' => AppWeatherController::getDataLocation(25.756729, -80.200279),
                    ]
                ]);
            break;

        }

        return view('city', array(
            'city' => $city,
            'cityData' => $cityData
        ));
})->where('Orlando', 'NewYork', 'New York', 'Miami');
