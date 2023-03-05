@extends('layouts.index')

@section('title'){{ $title ?? '' }}@endsection

@section('contentIndex')
    <h1>{{ $title ?? '' }}</h1>

    <div class="MapComponent" data-cities='<?php echo json_encode($locations, JSON_UNESCAPED_SLASHES); ?>'></div>

@endsection