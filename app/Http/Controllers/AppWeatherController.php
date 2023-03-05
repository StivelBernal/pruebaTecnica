<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class AppWeatherController extends Controller
{
    //
    public static function getDataLocation($lat, $lon) {

        $apiURL = 'https://api.openweathermap.org/data/3.0/onecall?lat='.$lat.'&lon='.$lon.'&appid='.env("MIX_OPEN_WEATHER_API", "").'&units=metric&lang=es&exclude=minutely,alerts,hourly,daily';

        $headers = [
            'X-header' => 'value'
        ];
  
        $response = Http::withHeaders($headers)->get($apiURL);
  
        $responseBody = json_decode($response->getBody(), true);

        return $responseBody;
    }
}
