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
				<div class="col-sm-3">
					<div class="widget-box">
						<div class="widget-box-image img-responsive">
							<img src="{{ asset('assets/img/sample/image1.jpg') }}" data-image-resize alt="Consulting" />
						</div>
						<div class="widget-box-info">
							<h2>Consulting</h2>
							<p>Utilise our extensive experience in delivering complex IT and Change Programmes and Projects with reliable, experienced consultants.</p>
						</div>
					</div>
				</div>

				<div class="col-sm-3">
					<div class="widget-box">
						<div class="widget-box-image img-responsive">
							<img src="{{ asset('assets/img/sample/image2.jpg') }}" data-image-resize alt="Training" />
						</div>
						<div class="widget-box-info">
							<h2>Training</h2>
							<p>We offer on-site, focused, accredited Prince 2 and AGILE Ttraining.</p>
						</div>
					</div>
				</div>

				<div class="col-sm-3">
					<div class="widget-box">
						<div class="widget-box-image img-responsive">
							<img src="{{ asset('assets/img/sample/image3.jpg') }}" data-image-resize alt="Free Resources" />
						</div>
						<div class="widget-box-info">
							<h2>Free Resources</h2>
							<p><a href="{{ url('free-resources') }}">Click here</a> to access our free resources, project templates, template plans, project logs, meeting minutes, and much more.</p>
						</div>
					</div>
				</div>

				<div class="col-sm-3">
					<div class="widget-box">
						<div class="widget-box-image img-responsive">
							<img src="{{ asset('assets/img/sample/image4.jpg') }}" data-image-resize alt="Free Resources" />
						</div>
						<div class="widget-box-info">
							<h2>Employers</h2>
							<p>Submit your vancany <a href="{{ url('company/post-job') }}">here</a></p>

							<h2>Contractors</h2>
							<p>Submit your CV <a href="{{ url('contractor/account') }}">here</a></p>
						</div>
					</div>
				</div>
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