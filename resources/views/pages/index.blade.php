@extends('templates.index')

@section('title', "Bienvenido")

@section('css')
    @include('components.head.css')
@endsection

@section('content')
    <div class="grid-container">
        @include('components.header.index')

        <div class="content">
            <div id="principal">
                <h1>Hola! Bienvenido a Pokemon Builder</h1>
            </div>
        </div>

        @include('components.footer.index')

        @include('components.menu.index')
    </div>
@endsection

@section('javascript')
    @include('components.head.js')
@endsection