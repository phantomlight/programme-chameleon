<?php
	if (\User::check()) {
		$user = \User::getUser();

		if ($user->hasAccess('contractor')) {
			$contractor = \Contractor::getContractor();
		}
		elseif ($user->hasAccess('company')) {
			$company = \Company::getCompany();
		}
		elseif ($user->hasAccess('agency')) {
			$agency = \Agency::getAgency();
		}
	}
?>
	
@extends('front.app')

@section('title')
About Us| Programme Chameleon
@stop

@section('content')
<?php $about = \Site::getDataByKey('about'); ?>
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div class="row element-bottom-50">
			<div class="col-sm-8">
				<h2 class="page-header">About Programme Chameleon</h2>
				@if ($about)
					{!! $about->description !!}
				@else
					<p>A place where you can share and work on a project together towards the goal, from start until finish.</p>
				@endif
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop