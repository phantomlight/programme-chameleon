@extends('front.app')

@section('title')
	Agency 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div id="agency-dashboard" class="element-top-30">
			<div class="row">
				<div class="col-sm-6">
					<h4 class="page-header">Recent notifs <small><a href="{{ route('agency.notif.all') }}">[see all]</small></h4>
					<ul class="list-unstyled sc-list list-notif">
						<li class="alert alert-info"><a href="#">Company 1</a> need you to distribute <a href="#">job 1</a> to one of your contractor.</li>
						<li class="alert alert-info">NOTICE: <a href="#">Company 1</a> has accepted your contractor for <a href="#">job 3</a>. <button class="btn btn-primary btn-xs">See Timesheet</button></li>
						<li class="alert alert-danger">NOTICE: <a href="#">Contractor 1</a> has rejected your job offer.</li>
					</ul>
				</div>

				<div class="col-sm-6">
					<h4 class="page-header">My Contractor List</h4>
					<div class="agency-contractor-list">
						<ul class="list-group">
							<li class="list-group-item">
								<div class="pull-left media">
									<div class="media-left">
										<a href="#">
											<img data-src="holder.js/50x50?random=yes" />
										</a>
									</div>
									<div class="media-body">
										<h4><a href="#">Contractor 1</a></h4>
										<p>Status: <label class="label label-success">Available</label></p>
									</div>
								</div>

								<div class="pull-right btn-group">
									<button class="btn btn-danger btn-xs">Remove from list</button>
									<button class="btn btn-success btn-xs">Offer a Job</button>
								</div>
							</li>

							<li class="list-group-item">
								<div class="pull-left media">
									<div class="media-left">
										<a href="#">
											<img data-src="holder.js/50x50?random=yes" />
										</a>
									</div>
									<div class="media-body">
										<h4><a href="#">Contractor 2</a></h4>
										<p>Status: <label class="label label-danger">Working</label></p>
									</div>
								</div>

								<div class="pull-right btn-group">
									<button class="btn btn-danger btn-xs">Remove from list</button>
									<button class="btn btn-success btn-xs">Offer a Job</button>
								</div>
							</li>

							<li class="list-group-item">
								<div class="pull-left media">
									<div class="media-left">
										<a href="#">
											<img data-src="holder.js/50x50?random=yes" />
										</a>
									</div>
									<div class="media-body">
										<h4><a href="#">Contractor 3</a></h4>
										<p>Status: <label class="label label-danger">Working</label></p>
									</div>
								</div>

								<div class="pull-right btn-group">
									<button class="btn btn-danger btn-xs">Remove from list</button>
									<button class="btn btn-success btn-xs">Offer a Job</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div id="jobs-listing" class="element-bottom-30">
			<div class="container">
				<div class="jobs-listing-title">
					<h3>
						<i class="fa fa-briefcase"></i>
						LATEST JOB LISTINGS
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
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop