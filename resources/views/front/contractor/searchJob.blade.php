@extends('front.app')

@section('title')
Job Search | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.contractor.header')
	<div class="common-page-wrapper">
		<div id="job-search">
			<div class="container">
				<div class="job-search-wrapper">
					<form id="job-search-form" role="form" action="" method="get">
						<div id="search-text-input" class="row">
							<div class="col-md-5">
								<div class="form-group has-feedback">
									<label class="text-label" for="keyword">Search Vacancies</label>
									<input class="form-control" name="keyword" id="keyword" placeholder="Keywords (IT Engineer, Shop Manager, Hr Manager...)" required="required" type="text">
									<span class="fa fa-search form-control-feedback"></span>
								</div>
							</div>
							<div class="col-md-4">
								<div class="form-group has-feedback">
									<label class="text-label" for="location">Location</label>
									<select class="form-control" name="location" id="location">
										<option value="" selected="selected">Any</option><option value="denver">Denver</option><option value="melbourne">Melbourne</option><option value="new-york">New York</option><option value="remote">Remote</option><option value="san-fransisco">San Fransisco</option><option value="texas">Texas</option><option value="washington">Washington</option>
									</select>
								</div>
							</div>
							<div class="col-md-3">
								<div class="search-btn-group">
									<button class="advance-search-toggle" name="advance-search">Advanced Search</button>
									<button class="btn btn-job-search " type="submit" name="submit" value="true">Search</button>
								</div>
							</div>
						</div>
						<div id="advance-search-option">
							<div class="row">
								<div class="col-md-7">
									<div class="form-group job-filter-dropdown">
										<label class="text-label" for="location">Category</label>
										<div class="job-category-select-wrapper">
											<select id="job-category-dropdown" name="job_category">
												<option value="accountingfinance">Accounting/Finance</option>
												<option value="adminhuman-resources">Admin/Human Resources</option>
												<option value="buildingconstruction">Building/Construction</option>
												<option value="computerinformation-technology">Computer/Information Technology</option>
												<option value="educationtraining">Education/Training</option>
												<option value="engineering">Engineering</option>
												<option value="hotelrestaurant">Hotel/Restaurant</option>
												<option value="management">Management</option>
												<option value="manufacturing">Manufacturing</option>
												<option value="media-advertising">Media &amp; Advertising</option><option value="others">Others</option>
												<option value="salesmarketing">Sales/Marketing</option>
												<option value="sciences">Sciences</option>
												<option value="services">Services</option>
												<option value="website">Website</option>
											</select>
										</div>
									</div>
								</div>
								<div class="col-md-5">
									<div class="form-group job-filter-dropdown">
										<label class="text-label" for="location">Type</label>
										<div class="job-type-select-wrapper">
											<select id="job-type-dropdown" name="job_type">
												<option value="contract">Contract</option>
												<option value="freelance">Freelance</option>
												<option value="full-time">Full Time</option>
												<option value="part-time">Part Time</option>
											</select>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group experience">
								<fieldset>
									<label class="slider-label">Experience (-/+)<span class="ex-min"></span> - <span class="ex-max"></span></label>
									<select class="init-slider" name="experience_min" id="experience_min">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
									<select class="init-slider" name="experience_max" id="experience_max">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5">5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</fieldset>
							</div>
							<div class="form-group salary">
								<label class="slider-label">Salary ($) / per year</label>
								<select class="init-slider" name="sallary_min" id="sallary_min">
									<option value="10000">10K</option>
									<option value="20000">20K</option>
									<option value="50000">50K</option>
									<option value="75000">75K</option>
									<option value="100000">100K</option>
									<option value="150000">150K</option>
									<option value="200000">200K</option>
									<option value="250000">250K</option>
									<option value="300000">300K</option>
									<option value="400000">400K</option>
									<option value="500000">500K</option>
								</select>
								<select class="init-slider" name="sallary_max" id="sallary_max">
									<option value="10000">10K</option>
									<option value="20000">20K</option>
									<option value="50000">50K</option>
									<option value="75000">75K</option>
									<option value="100000">100K</option>
									<option value="150000">150K</option>
									<option value="200000">200K</option>
									<option value="250000">250K</option>
									<option value="300000">300K</option>
									<option value="400000">400K</option>
									<option value="500000">500K</option>
								</select>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>

		<div class="container">
			<ul class="breadcrumb sc-breadcrumb">
				<li><a href="#">Dashboard</a></li>
				<li class="active"><a href="#">Job Search</a></li>
			</ul>
		</div>

		<div id="jobs-listing" class="no-padding">
			<div class="container">
				<div class="jobs-listing-title">
					<h3 class="lighten page-header no-margin">Search Result</h3>
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
										@for ($i=1; $i<20;$i++)
										<li>
											<a href="#job-tab-{{ $i }}" aria-controls="home" role="tab" data-toggle="tab">Job {{ $i }}</a>
										</li>
										@endfor
									</ul>

									<ul class="list-unstyled hidden-md hidden-lg hidden-sm">
										@for ($i=1; $i<20;$i++)
										<li>
											<a href="#">Job {{ $i }}</a>
										</li>
										@endfor
									</ul>
								</div>
								<div class="tab-content job-info col-sm-8 hidden-xs">
									@for ($i=1; $i<20;$i++)
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