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

@extends('app')

@section('title')
Web Developer | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="job-detail">
		<div class="container">
			<h1 class="job-detail-title"> Job Detail </h1>
			<div class="company-job-detail clearfix">
				<div class="company-logo">
					<a href="{{ url('company-detail') }}"><img src="{{ asset('assets/img/logo/1.png') }}" class="attachment-jobboard-job-detail-company" alt="Company Name" height="49" width="160"></a>
				</div><!-- /.company-logo -->
				<div class="company-details">
					<span class="company-website">
						<i class="fa fa-fw fa-chain"></i>
						<a href="http://web.com" target="_blank">Website</a>
					</span><!-- /.company-website -->
					<span class="company-twitter">
						<i class="fa fa-fw fa-twitter"></i>
						<a href="http://twitter.com" target="_blank">Twitter</a>
					</span><!-- /.company-twitter -->
					<span class="company-facebook">
						<i class="fa fa-fw fa-facebook"></i>
						<a href="http://facebook.com" target="_blank">Facebook</a>
					</span><!-- /.company-facebook -->
					<span class="company-google-plus">
						<i class="fa fa-fw fa-google-plus"></i>
						<a href="http://plus.google.com" target="_blank">Google+</a>
					</span><!-- /.company-google-plus -->
				</div><!-- /.company-details -->
			</div><!-- /.company-job-detail -->

			<div class="the-job-details clearfix">
				<div class="the-job-title">
					<h3>Web Developer</h3>
					<p> Part time web programmer/assistant </p>
				</div><!-- /.the-job-title -->
				<div class="the-job-company">
					Company
				</div><!-- /.the-job-company -->
				<div class="the-job-location">
					<i class="fa fa-fw fa-map-marker"></i>
					Texas
				</div><!-- /.the-job-location -->
				<div class="the-job-type">
					<i class="fa fa-fw fa-user"></i>
					Part Time
				</div><!-- /.the-job-type -->
				<div class="the-job-button"></div><!-- /.the-job-button -->
			</div><!-- /.the-job-details -->
			
			<div class="the-job-aditional-details">
				<span class="the-job-aditional-title job-cat-links">Category : 
					<a href="#">Accounting/Finance</a>
				</span>
				
				<span class="the-job-aditional-title">
					Salary : $75,000
				</span>
				<span class="the-job-aditional-title">Experience(s) : 1&nbsp;Year</span>
			</div><!-- /.the-job-aditional-details -->

			<div id="job-description" class="row element-top-20">
				<div class="col-md-6">
					<article id="job-overview-231">
						<h1>Overview</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
						</p>
					</article><!-- /#job-overview-231 -->
				</div><!-- /.col-md-6" -->
				<div class="col-md-6">
					<article id="about-company-231">
						<h1>About&nbsp;company</h1>
						<p>
							On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
						</p>
					</article>
				</div>
			</div>
		</div>
	</div>

	<div class="the-job-content">
		<div class="container">
			<article>
				<h3 class="sc-title normal">Benefits</h3>
				<div class="row">
					<div class="col-sm-4 col-sm-offset-0">
						<ul class="sc-ul">
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
						</ul>
					</div>
					<div class="col-sm-4 col-sm-offset-0">
						<ul class="sc-ul">
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
						</ul>
					</div>
					<div class="col-sm-4 col-sm-offset-0">
						<ul class="sc-ul">
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
						</ul>
					</div>
				</div>

				<h3 class="sc-title normal">Qualifications</h3>
				<div class="row">
					<div class="col-sm-6 col-sm-offset-0">
						<ul class="sc-ul">
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i> I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Expound the actual teachings of the great explorer of the truth.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences.</li>
						</ul>
					</div>
					<div class="col-sm-6 col-sm-offset-0">
						<ul class="sc-ul">
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i> I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Expound the actual teachings of the great explorer of the truth.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical.</li>
							<li><i style="color:#6EC071" class="fa fa-fw fa-chevron-right"></i>  Right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences.</li>
						</ul>
					</div>
				</div>
			</article>
		</div>
	</div>

	<div id="jobs-listing" class="related-job-listing">
		<div class="container">
			<div class="jobs-listing-title">
				<h3>
					<i class="fa fa-briefcase"></i>
					Related Jobs
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

	<div id="upload-post-job">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<div class="upload-post-job-wrapper resume">
						<h4>Upload Your Resume</h4>
						<p>Want to stand out amongst other contractors?</p>
						<a style="background:#565656; color:#FFFFFF;" href="#" class="btn btn-upload-post resume">
							Upload Your Resume<i class="fa fa-upload"></i>
						</a>
					</div><!-- /.upload-post-job-wrapper -->
				</div><!-- /.col-sm-6 -->
				<div class="col-sm-6">
					<div class="upload-post-job-wrapper job">
						<h4>Post Job Now</h4>
						<p>Got a new project needed to be done?</p>
						<a style="background:#1abc9c; color:#FFFFFF;" href="" class="btn btn-upload-post resume">
							Post A Job Now
						</a>
					</div><!-- /.upload-post-job-wrapper -->
				</div><!-- /.col-sm-6 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('include.footer-query')
@include('include.footer')
@stop