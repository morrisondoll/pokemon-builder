@extends('templates.index')

@section('title', "Bienvenido")

@section('css')
    @include('components.head.css')
@endsection

@section('content')
    @include('components.header.index')

    <section id="principal" class="container">

    </section>
@endsection

@section('javascript')
    @include('components.head.js')
@endsection