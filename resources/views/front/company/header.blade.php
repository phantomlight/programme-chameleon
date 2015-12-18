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
				<div class="avatar">
					@if ( ! is_null($company->image))
						<img src="{{ asset($company->image) }}" width="25" height="25" />
					@else
						<img data-src="holder.js/25x25" />
					@endif
					<a href="{{ route('company.account') }}">Hi, {{ $company->name }} !</a>
				</div>
				<a class="btn btn-header-login btn-xs" href="{{ url('logout') }}">LOGOUT</a>
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
							<li class="menu-item"><a href="{{ route('company.index') }}">Home</a></li>
							<li class="menu-item has-children">
								<a href="#">My Account</a>
								<ul class="sub-menu">
									<li class="menu-item"><a href="{{ url('company/account') }}">Settings</a></li>
								</ul>
							</li>
							<li class="menu-item"><a href="{{ route('company.job.post') }}">Post a Job</li>
							<li class="menu-item"><a href="{{ route('resume.search') }}">Resume Search</a></li>
						</ul>
					</nav><!-- /#main-menu -->
				</div><!-- /#menu-wrapper -->
			</div><!-- /.col-md-9 -->
		</div><!-- /.row -->
	</div>
</header>