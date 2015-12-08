<?php if(\User::check()) $user = \User::getUser(); $contractor = \Contractor::getContractor(); ?>
	
@extends('front.app')

@section('title')
	Mr. Contractor 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="jobs-alerts" class="element-top-30">
		<div class="container">
			<div class="row">
				<div class="col-md-4">
					<div class="alert-widget">
						<div class="alert-widget-title"><i class="fa fa-bell"></i> Alerts from agent <label class="label label-danger pull-right">99</label></div>
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

				<div class="col-md-4">
					<div class="alert-widget">
						<div class="alert-widget-title"><i class="fa fa-bell"></i> Alerts from subscribed <label class="label label-danger pull-right">2</label></div>
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

	<div id="jobs-listing" class="related-job-listing featured-job element-bottom-30">
		<div class="container">
			<div class="jobs-listing-title">
				<h3 class="page-header">
					<i class="fa fa-briefcase"></i>
					Latest Job Listings
				</h3>
			</div>
			<div class="jobs-listing-wrapper">
				<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="job-listing-tabs">
					<ul>
						<li><a href="#all_jobs">All</a></li>
						<li><a href="#contract">Contracts</a></li>
						<li><a href="#full-time">Full Time</a></li>
					</ul>

					<div id="all_jobs">
						<div class="job-listing-list row">
							<div class="col-sm-2 col-xs-12 the-list">
								<ul class="list-unstyled hidden-xs" role="tablist">
									@for ($i=1; $i<10;$i++)
									<li>
										<a href="#job-tab-{{ $i }}" aria-controls="home" role="tab" data-toggle="tab">Job {{ $i }}</a>
									</li>
									@endfor
								</ul>

								<ul class="list-unstyled hidden-md hidden-lg hidden-sm">
									@for ($i=1; $i<10;$i++)
									<li>
										<a href="#">Job {{ $i }}</a>
									</li>
									@endfor
								</ul>
							</div>
							<div class="tab-content job-info col-sm-8 hidden-xs">
								@for ($i=1; $i<10;$i++)
								<div role="tabpanel" class="tab-pane @if ($i === 1) {{ 'active' }} @endif" id="job-tab-{{ $i }}">
									<div class="job-info-top">
										<h2> Job {{ $i }} </h2>
										<div>
											<span class="job-type">
												<i class="fa fa-fw fa-user"></i> Contract
											</span>
											<span class="job-city-name">
												<i class="fa fa-fw fa-map-marker"></i> Jakarta
											</span>
											<span class="job-posted-time">
												posted 1 day ago
											</span>
										</div>
										<hr />
									</div>
									<div class="job-info-bottom">
										<span>Location: Jakarta, Indonesia</span>
										<span>Industry: IT</span>
										<span>Start Date: Immediately</span>
										<span>Employment Agency: Agency Name</span>
										<span>Contact: Test</span>
										<span>Email: Test</span>
										<span>Reference: Test</span>
										<span>Posted Date: Test</span>
										<span>Permalink: Test</span>
									</div>
								</div>
								@endfor
							</div>
						</div>
					</div>

					<div id="contract">
						<div class="job-listing-list row">
							<div class="col-sm-2 col-xs-12 the-list">
								<ul class="list-unstyled hidden-xs" role="tablist">
									@for ($i=1; $i<10;$i++)
									<li>
										<a href="#job-tab-{{ $i }}" aria-controls="home" role="tab" data-toggle="tab">Job {{ $i }}</a>
									</li>
									@endfor
								</ul>

								<ul class="list-unstyled hidden-md hidden-lg hidden-sm">
									@for ($i=1; $i<10;$i++)
									<li>
										<a href="#">Job {{ $i }}</a>
									</li>
									@endfor
								</ul>
							</div>
							<div class="tab-content job-info col-sm-8 hidden-xs">
								@for ($i=1; $i<10;$i++)
								<div role="tabpanel" class="tab-pane @if ($i === 1) {{ 'active' }} @endif" id="job-tab-{{ $i }}">
									<div class="job-info-top">
										<h2> Job {{ $i }} </h2>
										<div>
											<span class="job-type">
												<i class="fa fa-fw fa-user"></i> Contract
											</span>
											<span class="job-city-name">
												<i class="fa fa-fw fa-map-marker"></i> Jakarta
											</span>
											<span class="job-posted-time">
												posted 1 day ago
											</span>
										</div>
										<hr />
									</div>
									<div class="job-info-bottom">
										<span>Location: Jakarta, Indonesia</span>
										<span>Industry: IT</span>
										<span>Start Date: Immediately</span>
										<span>Employment Agency: Agency Name</span>
										<span>Contact: Test</span>
										<span>Email: Test</span>
										<span>Reference: Test</span>
										<span>Posted Date: Test</span>
										<span>Permalink: Test</span>
									</div>
								</div>
								@endfor
							</div>
						</div>
					</div>

					<div id="full-time">
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop