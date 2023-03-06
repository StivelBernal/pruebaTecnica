<?php

namespace App\Http\Controllers;

use App\Http\Controllers\AppWeatherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CityController extends Controller
{
    public function index() {
        return view('map',  [
            'title' => 'Inicio',
            'locations' => [
                'NewYork' => AppWeatherController::getDataLocation(40.710196697138045, -73.99848264930623, 'newyork'),
                'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534, 'orlando'),
                'Miami' => AppWeatherController::getDataLocation(25.756729, -80.200279, 'miami'),
            ]
        ]);
    }

    public function cityDetail($city) {
        
        $cityData = null; 

        $cityS = strtolower(str_replace(' ', '', $city));

        switch ($cityS) {
            case 'orlando':
                $cityData = AppWeatherController::getDataLocation(40.710196, -73.998482, $cityS);
                break;
            case 'newyork':
                $cityData = AppWeatherController::getDataLocation(28.552296, -81.406534, $cityS);
                break;
            case 'miami':
                $cityData = AppWeatherController::getDataLocation(25.756729, -80.200279, $cityS);
                break;
            default: 
                return view('map',  [
                    'title' => 'Inicio',
                    'locations' => [
                        'NewYork' => AppWeatherController::getDataLocation(40.710196697138045, -73.99848264930623, 'newyork'),
                        'Orlando' => AppWeatherController::getDataLocation(28.552296, -81.406534, 'orlando'),
                        'Miami' => AppWeatherController::getDataLocation(25.756729, -80.200279, 'miami'),
                    ]
                ]);
            break;

        }

        $history = DB::table('history')->where('city', $cityS)->get();

        return view('city', array(
            'city' => $city,
            'cityData' => $cityData,
            'history' => $history
        ));
    }
}
