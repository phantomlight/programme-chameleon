@extends('app')

@section('title')
Company Detail | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="page-title-wrapper" class="back-light">
		<div class="container">
			<h1 class="page-title">Company Profile</h1>
			<div id="company-header">
				<div id="company-main-logo">
					<a href="#"><img src="{{ asset('assets/img/logo/1.png') }}" alt="Company Name" height="" width=""></a>
				</div>
				<div id="company-head-menu">
					<ul class="company-head-menu first-menu">
						<li class="i-web"><a target="_blank" href="http://web.com"><i class="fa fa-link"></i> Website</a></li>
						<li class="i-twitter"><a target="_blank" href="http://twitter.com"><i class="fa fa-twitter"></i> Twitter</a></li>
						<li class="i-facebook"><a target="_blank" href="http://facebook.com"><i class="fa fa-facebook"></i> Facebook</a></li>
						<li class="i-googleplus"><a target="_blank" href="http://plus.google.com"><i class="fa fa-google-plus"></i> Google +</a></li>
					</ul>
					
					<ul class="company-head-menu second-menu">
						<li class="i-bar">
							<a href="#jobs"><i class="fa fa-list"></i> More Jobs</a>
						</li>
					</ul>
				</div>
			</div>

			<div class="row abount-company-content">
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">Overview</h2>
					<article>
						At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
					</article>
				</div>
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">About Company</h2>
					<article>
						On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
					</article>
				</div>
			</div>
		</div><!-- /.container -->
	</div>

	<div id="company_ourservice" class="company_page_section">
		<div class="container">
			<h1 class="jobboard-section-title uppercase">Our Service</h1>
			<div class="section-subtitle">Charms of pleasure of the moment duty through weakness of will.</div>
			
			<div class="row">
				<div class="col-md-4 company-service-item">
					<span class="section-icon"><i class="fa  fa-bank"></i></span>
					<h2>Text Head</h2>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
				</div><!-- /.col-md-4 -->
				<div class="col-md-4 company-service-item">
					<span class="section-icon"><i class="fa fa-bullhorn"></i></span>
					<h2>Text Head</h2>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
				</div><!-- /.col-md-4 -->
				<div class="col-md-4 company-service-item">
					<span class="section-icon"><i class="fa fa-coffee"></i></span>
					<h2>Text Head</h2>
					Lorem Ipsum is simply dummy text of the printing and
					typesetting industry. Lorem Ipsum has been the
					standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled
				</div><!-- /.col-md-4 -->
			</div>
		</div><!-- /.container -->
	</div>

	<div id="company_experience" class="company_page_section company_page_odd_section">
		<div class="container">
			<h1 class="jobboard-section-title uppercase">Expertise</h1>
			<div class="section-subtitle">Charms of pleasure of the moment duty through weakness of will.</div>
			<ul class="company_experience_group">
				<li> account management </li>
				<li> front end development </li>
				<li> writing </li>
				<li> ui design </li>
				<li> finance </li>
			</ul>
		</div><!-- /.container -->
	</div>

	<div id="company_clients" class="company_page_section">
		<div class="container">
			<h1 class="jobboard-section-title uppercase">Clients</h1>
			<div class="section-subtitle">The super awesome company headline goes here</div>
			<div class="row">
				<div class="col-md-4">
					<h2 class="clinet-name uppercase">Johnson &amp; Johnsons</h2>
					<div class="client-date">2001 - 2010</div>
					<div class="client-web"><a rel="nofollow" target="_blank" href="http://www.website.com">http://www.website.com</a></div>
					<div class="client-content">
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
				</div><!-- /.col-md-4 -->

				<div class="col-md-4">
					<h2 class="clinet-name uppercase">P &amp; G</h2>
					<div class="client-date">2001 - 2010</div>
					<div class="client-web"><a rel="nofollow" target="_blank" href="http://www.website.com">http://www.website.com</a></div>
					<div class="client-content">
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
				</div><!-- /.col-md-4 -->

				<div class="col-md-4">
					<h2 class="clinet-name uppercase">P &amp; G</h2>
					<div class="client-date">2001 - 2010</div>
					<div class="client-web"><a rel="nofollow" target="_blank" href="http://www.website.com">http://www.website.com</a></div>
					<div class="client-content">
						<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
					</div>
				</div><!-- /.col-md-4 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
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
	<div id="company_related_jobs" class="company_page_section">
		<div class="container">
			<div id="jobs-listing" class="related-job-listing">
				<div class="container">
					<div class="jobs-listing-title">
					<h3 id="jobs" class="uppercase">
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
		</div>
	</div>
</div>

@include('include.footer-query')
@include('include.footer')
@stop