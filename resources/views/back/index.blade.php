<?php $user = \User::getUser(); ?>

@extends('back.app')

@section('title')
Admin Dashboard | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-sm-12">
					<h1>Welcome to your dashboard</h1>
					<p>Use one of the menu on the left (top if you are using your mobile phone) to get started.</p>
				</div>
			</div>
		</div>
	</div>
</div>
@stop