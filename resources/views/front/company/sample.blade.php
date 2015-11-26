<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Company 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div class="container">
			<h1 class="page-header">Company Profile</h1>
			<div id="company-header">
				<div id="company-main-logo">
					<a href="#">
						<img data-src="holder.js/191x58?random=yes" alt="Company Logo" />
					</a>
				</div>
			</div>
			<div id="company-head-menu">
				<ul class="company-head-menu first-menu">
					<li class="i-web"><a target="_blank" href="http://web.com"><i class="fa fa-link"></i> Website</a></li>
					<li class="i-twitter"><a target="_blank" href="http://twitter.com"><i class="fa fa-twitter"></i> Twitter</a></li>
					<li class="i-facebook"><a target="_blank" href="http://facebook.com"><i class="fa fa-facebook"></i> Facebook</a></li>
					<li class="i-googleplus"><a target="_blank" href="http://plus.google.com"><i class="fa fa-google-plus"></i> Google +</a></li>
				</ul>
				<ul class="company-head-menu second-menu">
					<li class="i-bar"><a href="#jobs"><i class="fa fa-list"></i> More Jobs</a></li>
				</ul>
			</div>
			<div class="row about-company-content">
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">Overview</h2>
						<article>
							At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
						</article>
				</div>
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">About Us</h2>
					<article>
						On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
					</article>
				</div>
			</div>
		</div>
	</div>

	<div id="company_experience">
		<div class="container">
			<h1 class="uppercase page-header">Expertise</h1>
				<div class="section-subtitle">This company mainly focus on these industries: </div>
				<ul class="company_experience_group">
					<li>account management</li>
					<li>front end development</li>
					<li>writing</li>
					<li>ui design</li>
					<li>finance</li>
				</ul>
		</div>
	</div>

	<div id="jobs-listing" class="company_page_section element-bottom-30">
		<div class="container">
			<div class="jobs-listing-title">
				<h3 id="jobs" class="page-header">
					<i class="fa fa-briefcase"></i>
					Related Job Listings
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