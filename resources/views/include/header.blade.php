<header id="header">
	<div id="header-bar">
		<div class="container">
			<ul class="jobboard-social-media">
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
			<div class="jobboard-login-register clearfix">
				<a class="btn btn-header-register" href="{{ url('register') }}">REGISTER</a>
				<a class="btn btn-header-login" href="{{ url('login') }}">LOG IN</a>
			</div>
		</div><!-- /.container -->
	</div><!-- /#header-bar -->

	<div class="container">
		<div class="row">
			<div class="col-md-3">
				<div class="logo-wrapper">
					<a href="{{ url('/') }}" class="header-logo" title="Programme Chameleon">
						<img src="{{ asset('assets/img/logo.png') }}" width="300" alt="Programme Chameleon">
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
							<li class="menu-item menu-item-has-children">
								<a href="#">Home</a>
								<ul class="sub-menu">
									<li class="menu-item"><a href="{{ url('job-detail') }}">Sample Job Detail Page</a></li>
									<li class="menu-item"><a href="{{ url('resume-detail') }}">Sample Resume Page</a></li>
									<li class="menu-item"><a href="{{ url('company-detail') }}">Sample Company Page</a></li>
								</ul>
							</li>
							<li class="menu-item"><a href="#">Register CV</a></li>
							<li class="menu-item"><a href="#">Submit Vacancy</a></li>
							<li class="menu-item menu-item-has-children">
								<a href="#">Services</a>
								<ul class="sub-menu">
									<li class="menu-item"><a href="#">Sub Menu 1</a></li>
									<li class="menu-item"><a href="#">Sub Menu 2</a></li>
									<li class="menu-item"><a href="#">Sub Menu 3</a></li>
								</ul>
							</li>
							<li class="menu-item"><a href="#">About Us</a></li>
							<li class="menu-item"><a href="#">Contact Us</a></li>
						</ul>
					</nav><!-- /#main-menu -->
				</div><!-- /#menu-wrapper -->
			</div><!-- /.col-md-9 -->
		</div><!-- /.row -->
	</div>
</header>