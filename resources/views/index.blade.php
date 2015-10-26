@extends('app')

@section('title')
Home | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="job-search">
		<div class="container">
			<div class="job-search-wrapper">
				<h2 class="job-search-title">Find a Job</h2>
				<form id="job-search-form" role="form" action="" method="get">
					<div id="search-text-input" class="row">
						<div class="col-md-7">
							<div class="form-group has-feedback">
								<label class="text-label" for="keyword">Search</label>
								<input class="form-control" name="keyword" id="keyword" placeholder="Keywords (IT Engineer, Shop Manager, Hr Manager...)" required="required" type="text">
								<span class="fa fa-search form-control-feedback"></span>
							</div>
						</div>
						<div class="col-md-5">
							<div class="form-group has-feedback">
								<label class="text-label" for="location">Location</label>
								<select class="form-control" name="location" id="location">
									<option value="" selected="selected">Any</option><option value="denver">Denver</option><option value="melbourne">Melbourne</option><option value="new-york">New York</option><option value="remote">Remote</option><option value="san-fransisco">San Fransisco</option><option value="texas">Texas</option><option value="washington">Washington</option>
								</select>
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
						<div class="form-group sallary">
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
					<div id="search-btn-wrap" class="row">
						<div class="col-md-8">
						</div>
						<div class="col-md-4 search-btn-group">
							<button class="btn btn-default btn-job-search " type="submit" name="submit" value="true">Search</button>
							<button class="btn btn-default advance-search-toggle" name="advance-search">Advanced Search</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<?php
		$jobs = [
			'contract'	=>	[
				0 =>	[
					'title'			=>	'Department Head',
					'link'			=>	'#',
					'image'			=>	asset('assets/img/logo/1.png'),
					'summary'		=>	'Description for Department Head on this job.',
					'location'	=>	'Washington',
				],
				1 =>	[
					'title'		=>	'Content and Social Media Specialist',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/2.png'),
					'summary'	=>	'Description for Content and Social Media Specialist on this job.',
					'location'	=>	'Remote',
				]
			],

			'freelance'	=>	[
				0 =>	[
					'title'		=>	'Creative Designer',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/3.png'),
					'summary'	=>	'Description for Creative Designer on this job.',
					'location'	=>	'Denver',
				],
				1 =>	[
					'title'		=>	'Technical Business Analyst / Systems Analyst',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/4.jpg'),
					'summary'	=>	'Description for Technical Business Analyst / Systems Analyst on this job.',
					'location'	=>	'Melbourne',
				],
			],

			'full-time'	=>	[
				0 =>	[
					'title'		=>	'Store General Manager',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/5.jpg'),
					'summary'	=>	'Description for Store General Manager on this job.',
					'location'	=>	'San Fransisco',
				],
				1 =>	[
					'title'		=>	'Web Analyst',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/6.jpg'),
					'summary'	=>	'Description for Web Analyst on this job.',
					'location'	=>	'New York',
				],
			],

			'part-time'	=>	[
				0 =>	[
					'title'		=>	'Web Developer',
					'link'		=>	'#',
					'image'		=>	asset('assets/img/logo/7.jpg'),
					'summary'	=>	'Description for Web Developer on this job.',
					'location'	=>	'Texas',
				],
			]
		];
	?>

	<div id="home-services">
		<div class="container">
			<div class="row">
				<div class="col-md-12 home-services-title">
					<h2>
						<i class="fa fa"></i>
						Our Services
					</h2>
				</div>

				<div class="col-md-3 col-sm-3 home-services-widget">
					<div class="image-wrapper">
						<img src="{{ asset('assets/img/sample/image1.jpg') }}" />
					</div>

					<div class="widget-content">
						<h3 class="title"> Consulting </h3>
						<p> Utilise our extensive experience in delivering complex IT and Change Programmes and Projects with reliable, experienced professionals. </p>
					</div>
				</div>

				<div class="col-md-3 col-sm-3 home-services-widget">
					<div class="image-wrapper">
						<img src="{{ asset('assets/img/sample/image2.jpg') }}" />
					</div>
					<div class="widget-content">
						<h3 class="title"> Training </h3>
						<p> We offer on-site, focused, and accredited Prince 2 and AGILE training. </p>
					</div>
				</div>

				<div class="col-md-3 col-sm-3 home-services-widget">
					<div class="image-wrapper">
						<img src="{{ asset('assets/img/sample/image3.jpg') }}" />
					</div>
					<div class="widget-content">
						<h3 class="title"> Free Resources </h3>
						<p> Access our free resources of project templates, plans, logs, and see meeting minutes easily. </p>
					</div>
				</div>

				<div class="col-md-3 col-sm-3 home-services-widget">
					<div class="image-wrapper">
						<img src="{{ asset('assets/img/sample/image4.jpg') }}" />
					</div>
					<div class="widget-content">
						<h4> Employers </h4>
						<p> Submit your vancany <a href="#">here</a> </p>

						<h4 class="element-top-20"> Contractors </h4>
						<p> Submit your CV <a href="#">here</a> </p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="jobs-listing" class="related-job-listing featured-job">
		<div class="container">
			<div class="jobs-listing-title">
				<h3>
					<i class="fa fa-briefcase"></i>
					JOBS
				</h3>
			</div>
			<div class="jobs-listing-wrapper">
				<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="job-listing-tabs">
					<ul>
						<li><a href="#all_jobs">All</a></li>
						<li><a href="#contract-12">Contract</a></li>
						<li><a href="#freelance-18">Freelance</a></li>
						<li><a href="#full-time-20">Full Time</a></li>
						<li><a href="#part-time-30">Part Time</a></li>
					</ul>

					<div id="all_jobs">
						@foreach ($jobs as $k=>$job)
							@foreach ($job as $j)
								<div class="job-listing-row clearfix">
									<div class="job-company-logo">
										<img src="{{ $j['image'] }}" alt="Company Name" height="36" width="120" />
									</div>
									<div class="job-listing-name">
										<h4>{{ $j['title'] }}</h4>
										<p class="job-listing-summary">{{ $j['summary'] }}</p>
									</div>
									<div class="job-listing-region">
										<i class="fa fa-fw fa-map-marker"></i>
										{{ $j['location'] }}
									</div>
									<div class="job-listing-type">
										<i class="fa fa-fw fa-user"></i>
										{{ ucwords(str_replace('-', ' ', $k)) }}
									</div>
									<div class="job-listing-view">
										<a href="#" class="btn btn-view-job">View Job</a>
									</div>
								</div>
							@endforeach
						@endforeach
					</div>

					<div id="contract-12">
						@foreach ($jobs['contract'] as $j)
							<div class="job-listing-row clearfix">
								<div class="job-company-logo">
									<img src="{{ $j['image'] }}" alt="Company Name" height="36" width="120" />
								</div>
								<div class="job-listing-name">
									<h4>{{ $j['title'] }}</h4>
									<p class="job-listing-summary">{{ $j['summary'] }}</p>
								</div>
								<div class="job-listing-region">
									<i class="fa fa-fw fa-map-marker"></i>
									{{ $j['location'] }}
								</div>
								<div class="job-listing-type">
									<i class="fa fa-fw fa-user"></i>
									{{ ucwords(str_replace('-', ' ', $k)) }}
								</div>
								<div class="job-listing-view">
									<a href="#" class="btn btn-view-job">View Job</a>
								</div>
							</div>
						@endforeach
					</div>
										
					<div id="freelance-18">
						@foreach ($jobs['freelance'] as $j)
							<div class="job-listing-row clearfix">
								<div class="job-company-logo">
									<img src="{{ $j['image'] }}" alt="Company Name" height="36" width="120" />
								</div>
								<div class="job-listing-name">
									<h4>{{ $j['title'] }}</h4>
									<p class="job-listing-summary">{{ $j['summary'] }}</p>
								</div>
								<div class="job-listing-region">
									<i class="fa fa-fw fa-map-marker"></i>
									{{ $j['location'] }}
								</div>
								<div class="job-listing-type">
									<i class="fa fa-fw fa-user"></i>
									{{ ucwords(str_replace('-', ' ', $k)) }}
								</div>
								<div class="job-listing-view">
									<a href="#" class="btn btn-view-job">View Job</a>
								</div>
							</div>
						@endforeach
					</div>

					<div id="full-time-20">
						@foreach ($jobs['full-time'] as $j)
							<div class="job-listing-row clearfix">
								<div class="job-company-logo">
									<img src="{{ $j['image'] }}" alt="Company Name" height="36" width="120" />
								</div>
								<div class="job-listing-name">
									<h4>{{ $j['title'] }}</h4>
									<p class="job-listing-summary">{{ $j['summary'] }}</p>
								</div>
								<div class="job-listing-region">
									<i class="fa fa-fw fa-map-marker"></i>
									{{ $j['location'] }}
								</div>
								<div class="job-listing-type">
									<i class="fa fa-fw fa-user"></i>
									{{ ucwords(str_replace('-', ' ', $k)) }}
								</div>
								<div class="job-listing-view">
									<a href="#" class="btn btn-view-job">View Job</a>
								</div>
							</div>
						@endforeach
					</div>
										
					<div id="part-time-30">
						@foreach ($jobs['part-time'] as $j)
							<div class="job-listing-row clearfix">
								<div class="job-company-logo">
									<img src="{{ $j['image'] }}" alt="Company Name" height="36" width="120" />
								</div>
								<div class="job-listing-name">
									<h4>{{ $j['title'] }}</h4>
									<p class="job-listing-summary">{{ $j['summary'] }}</p>
								</div>
								<div class="job-listing-region">
									<i class="fa fa-fw fa-map-marker"></i>
									{{ $j['location'] }}
								</div>
								<div class="job-listing-type">
									<i class="fa fa-fw fa-user"></i>
									{{ ucwords(str_replace('-', ' ', $k)) }}
								</div>
								<div class="job-listing-view">
									<a href="#" class="btn btn-view-job">View Job</a>
								</div>
							</div>
						@endforeach
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="featured-job">
		<div class="container">
			<div class="jobs-listing-title">
				<h3> TOP JOB OPENING </h3>
			</div>
			<div class="clearfix featured-job-wrapper owl-carousel owl-theme owl-loaded">
				@foreach ($jobs as $job)
					@foreach($job as $k => $j)
						<div class="featured-job-item">
							<div class="featured-job-item">
								<div class="featured-job-thumbnail">
									<img src="{{ $j['image'] }}" class="attachment-jobboard-featured-job-thumbnail" alt="Company Name" height="63" width="232">
								</div>
								<div class="featured-job-detail">
									<div class="featured-job-title">{{ $j['title'] }}</div>
									<div class="featured-job-desc">{{ $j['summary'] }}</div>
									<a href="#" class="btn btn-view-featured-job">View Job</a>
								</div>
								<div class="featured-job-type clearfix">
									<div class="featured-job-location">
										<i class="fa fa-map-marker"></i>
										{{ $j['location'] }}
									</div>
									<div class="featured-job-contract">
										<i class="fa fa-fw fa-user"></i>
										{{ ucwords(str_replace('-', ' ', $k)) }}
									</div>
								</div>
							</div>
						</div>
					@endforeach
				@endforeach
			</div>
		</div>
	</div>
	
	@include('include.footer-query')
	@include('include.footer')
@stop