{{-- Mostramos tarjetas con cada item que nos da el api de openweather --}}
@extends('layouts.index')

@section('contentIndex')
    <h1>{{ $city ?? 'No se especifico ciudad' }}</h1>

    <div>
        <?php var_dump($cityData); ?>
    </div>
@endsection