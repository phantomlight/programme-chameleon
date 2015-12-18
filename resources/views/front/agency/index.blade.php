<?php
	use App\Utils\Hash;

	if (\User::check()) {
		$user = \User::getUser();
		$agency = \Agency::getAgency();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('title')
	{{ $agency->name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.agency.header')
	<div class="container">
		<div class="row element-top-50 element-bottom-50">
			<div class="col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">Recent Notifications</div>
					<div class="panel-body"></div>
				</div>
			</div>

			<div class="col-sm-6">
				<div class="panel panel-default">
					<div class="panel-heading">
						My Jobs <a href="{{ route('agency.job.add') }}" class="btn pull-right btn-xs btn-primary">Add a New Job</a>
					</div>
					<div class="panel-body"></div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop