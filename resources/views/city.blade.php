@extends('layouts.index')

@section('contentIndex')
    <h1>{{ $city ?? 'No se especifico ciudad' }}</h1>
@endsection