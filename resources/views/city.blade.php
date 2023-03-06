{{-- Mostramos tarjetas con cada item que nos da el api de openweather --}}
@extends('layouts.index')
@section('title'){{ $city ?? '' }}@endsection

@section('contentIndex')
    <div class="page-city">

        <div class="page-city-left">
            <div class="title-container">
                <h1>{{ $city ?? 'No se especifico ciudad' }}</h1>
            </div>
    
            <div class="content-info-current">
                <div class="content-info-location-img">
                    <img src="/assets/img/clima/{{$cityData['current']['weather'][0]['icon'] }}.svg" />
                </div>
    
                <div class="content-info-location-data">
                    <div class="content-info-location-data-item">
                        <strong>Humedad: </strong> {{number_format($cityData['current']['humidity'], 0, '.', "")}}%
                    </div> 
                    <div class="content-info-location-data-item">
                        <strong>Temperatura: </strong> {{number_format($cityData['current']['temp'], 0, '.', "")}}°
                    </div> 
                    <div class="content-info-location-data-item">
                        <strong>Clima: </strong> {{$cityData['current']['weather'][0]['description']}}
                    </div> 
                </div> 
            </div> 
        </div>

        <div class="page-city-right">
            <div class="title">Historial de consultas</div>
            <div class="history">
                <div class="history-header">
                    <div class="history-header-item">ID</div>
                    <div class="history-header-item">FECHA/HORA</div>
                    <div class="history-header-item">CLIMA</div>
                    <div class="history-header-item">TEMP</div>
                    <div class="history-header-item">HUMEDAD</div>
                </div>

                <div class="history-content">
                    @foreach($history as $historyItem)
                        <div class="history-item">
                            <div>{{$historyItem->id}}</div>
                            <div>{{$historyItem->created_at}}</div>
                            <div>{{$historyItem->description}}</div>
                            <div>{{$historyItem->temperature}}</div>
                            <div>{{$historyItem->humidity}}</div>
                        </div>
                    @endforeach
                </div>



            </div>
        </div>

    </div> 

@endsection