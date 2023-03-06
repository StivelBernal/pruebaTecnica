<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class AppWeatherController extends Controller
{
    //
    public static function getDataLocation($lat, $lon, $name) {

        $apiURL = 'https://api.openweathermap.org/data/3.0/onecall?lat='.$lat.'&lon='.$lon.'&appid='.env("MIX_OPEN_WEATHER_API", "").'&units=metric&lang=es&exclude=minutely,alerts,hourly,daily';

        $headers = [
            'X-header' => 'value'
        ];
  
        $response = Http::withHeaders($headers)->get($apiURL);
  
        $responseBody = json_decode($response->getBody(), true);

        DB::table('history')->insert(array(
            'city' => strtolower(str_replace(' ', '', $name)),
            'description' => $responseBody['current']['weather'][0]['description'],
            'icon' => $responseBody['current']['weather'][0]['icon'],
            'temperature' => $responseBody['current']['temp'],
            'humidity' => $responseBody['current']['humidity'],
            'created_at' => date('Y-m-d-H-i-s')
        ));

        return $responseBody;
    }
}
