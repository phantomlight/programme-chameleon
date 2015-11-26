@if (!isset($user))
	<header id="header">
		<div id="header-bar">
			<div class="container">
				<ul class="header-social-media">
					<li><a href=""><i class="fa fa-facebook"></i></a></li>
					<li><a href=""><i class="fa fa-google-plus"></i></a></li>
					<li><a href=""><i class="fa fa-twitter"></i></a></li>
					<li><a href=""><i class="fa fa-youtube"></i></a></li>
					<li><a href=""><i class="fa fa-linkedin"></i></a></li>
					<li><a href=""><i class="fa fa-rss"></i></a></li>
					<li><a href=""><i class="fa fa-flickr"></i></a></li>
					<li><a href=""><i class="fa fa-vimeo-square"></i></a></li>
					<li><a href=""><i class="fa fa-dribbble"></i></a></li>
					<li><a href=""><i class="fa fa-tumblr"></i></a></li>
				</ul><!-- /.social-media -->
				<div class="header-login-register clearfix">
					<div class="dropdown btn btn-header-register">
						<a data-toggle="dropdown">REGISTER</a>
						<ul class="dropdown-menu">
							<li><a href="{{ route('company.register') }}">Register as Employer/Company</a></li>
							<li><a href="{{ route('contractor.register') }}">Register as Job Seeker</a></li>
							<li><a href="{{ route('agency.register') }}">Register as Agency</a></li>
						</ul>
					</div>
					<a class="btn btn-header-login" href="{{ url('login') }}">LOG IN</a>
				</div>
			</div><!-- /.container -->
		</div><!-- /#header-bar -->

		<div class="container">
			<div class="row">
				<div class="col-md-3">
					<div class="logo-wrapper">
						<a href="{{ url('/') }}" class="header-logo" title="Programme Chameleon">
							<img src="{{ asset('assets/img/logo.png') }}" alt="Programme Chameleon">
						</a>
					</div><!-- /.logo-wrapper -->
				</div><!-- /.col-md-3 -->
				<div class="col-md-9">
					<div id="menu-wrapper">
						<button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target="#main-menu">
							<span class="sr-only">Toggle navigation</span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<nav id="main-menu" class="clearfix collapse navbar-collapse" role="navigation">
							<ul class="nav-menu">
								<li class="menu-item">
									<a href="{{ url('contractor/search-job') }}">Job Search</a>
								</li>
								<li class="menu-item has-children">
									<a href="#">Services</a>
									<ul class="sub-menu">
										<li class="menu-item"><a href="{{ url('job/job-sample') }}">Sample Job Detail Page</a></li>
										<li class="menu-item"><a href="{{ url('contractor/contractor-sample') }}">Sample CV Page</a></li>
										<li class="menu-item"><a href="{{ url('company/company-sample') }}">Sample Company Page</a></li>
									</ul>
								</li>
								<li class="menu-item"><a href="{{ url('free-resources') }}">Resources</a></li>
								<li class="menu-item"><a href="{{ url('login') }}">Register CV</a></li>
								<li class="menu-item"><a href="{{ url('login') }}">Submit Vacancy</a></li>
							</ul>
						</nav><!-- /#main-menu -->
					</div><!-- /#menu-wrapper -->
				</div><!-- /.col-md-9 -->
			</div><!-- /.row -->
		</div>
	</header>
@else
	@if ($user->hasAccess('contractor'))
		@include('front.contractor.header')
	@elseif ($user->hasAccess('company'))
		@include('front.company.header')
	@elseif ($user->hasAccess('agency'))
		@include('front.agency.header')
	@endif
@endif