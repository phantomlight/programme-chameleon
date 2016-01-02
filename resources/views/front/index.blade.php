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
Home | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="job-search">
		<div class="container">
			<div class="job-search-wrapper">
				@include('front.include.jobSearchForm')
			</div>
		</div>
	</div>

	<div id="home-menu-listing" class="element-top-30">
		<div class="container">
			<div class="row">
				<?php $services = \Site::getAllServices(); ?>
				@if (count($services) > 0)
					@foreach ($services as $service)
						<div class="col-sm-3">
							<div class="widget-box">
								<div class="widget-box-image img-responsive">
									<img src="{{ asset($service->file) }}" data-image-resize alt="{{ $service->title }}" />
								</div>
								<div class="widget-box-info">
									<h2>{{ $service->title }}</h2>
									{!! $service->description !!}
								</div>
							</div>
						</div>
					@endforeach
				@endif
			</div>
		</div>
	</div>

	<div id="jobs-listing" class="element-bottom-30">
		<div class="container">
			<div class="jobs-listing-title">
				<h3 class="page-header">
					<i class="fa fa-briefcase"></i>
					Latest Job Listings
				</h3>
			</div>
			@include('front.include.jobListingWithoutSearch')
		</div>
	</div>
	
	@include('front.include.footer-query')
	@include('front.include.footer')
@stop