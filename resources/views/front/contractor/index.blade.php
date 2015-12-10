<?php
	if (\User::check()) {
		$user = \User::getUser();
		$contractor = \Contractor::getContractor();
	}
?>
@extends('front.app')

@section('title')
	{{ $user->first_name . ' ' . $user->last_name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="jobs-alerts" class="element-top-30 element-bottom-30">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-heading">Current Job(s)</div>
						<?php $jobs = $contractor->jobs(); ?>
						<div class="panel-body">
							@if ($jobs->count() > 0)
								<?php $jobs = $jobs->orderBy('created_at', 'desc')->paginate(15); ?>
								<ul class="list-unstyled sc-list">		
								@foreach ($jobs as $job)
									<li><span>{{ $job->title }}</span> accepted on {{ $job->created_at->toDayDateTimeString() }}</li>
								@endforeach
								</ul>
							@else
								<div class="alert alert-danger">
									You haven't been accepted to any job yet.
								</div>
							@endif
						</div>
					</div>
				</div>

				<div class="col-md-4">
					<div class="alert-widget">
						<div class="alert-widget-title"><i class="fa fa-bell"></i> Jobs available <label class="label label-danger pull-right"> 3 </label></div>
						<div class="alert-widget-content">
							<ul class="list-unstyled list-group">
								<li class="list-group-item">
									<p><a href="#">Job Title</a></p>
									<a href="#" class="btn btn-primary btn-xs">View</a>
									<button class="btn btn-success btn-xs">Apply</button>
									<button class="btn btn-danger btn-xs">Marked as read</button>
								</li>
								<li class="list-group-item">
									<p><a href="#">Job Title</a></p>
									<a href="#" class="btn btn-primary btn-xs">View</a>
									<button class="btn btn-success btn-xs">Apply</button>
									<button class="btn btn-danger btn-xs">Marked as read</button>
								</li>
								<li class="list-group-item">
									<p><a href="#">Job Title</a></p>
									<a href="#" class="btn btn-primary btn-xs">View</a>
									<button class="btn btn-success btn-xs">Apply</button>
									<button class="btn btn-danger btn-xs">Marked as read</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="job-search">
		<div class="container">
			<div class="job-search-wrapper">
				@include('front.include.jobSearchForm')
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
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop