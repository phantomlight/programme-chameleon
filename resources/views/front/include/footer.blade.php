<nav id="footer-navigation" class="footer-navigation" role="navigation">
	<div>
		<ul id="footer-menu" class="menu">
			<li class="menu-item"><a href="{{ url('/') }}">Home</a></li>
			<li class="menu-item"><a href="{{ route('company.job.post') }}">Post A Job</a></li>
			<li class="menu-item"><a href="{{ route('contractor.account') }}">Upload CV</a></li>
			<li class="menu-item"><a href="#">Blog</a></li>
		</ul>
	</div>		
</nav>

<footer id="footer">
	<div class="container">
		<div id="footer-widgets">
			<div class="row">
				<div class="col-md-6 widget-container">
					<div id="text-2" class="widget widget_text">
						<h3 class="footer-widget-title">About Us</h3>
						<?php $about = \Site::getDataByKey('about'); ?>
						<div class="textwidget">{!! $about->description !!}</div>
					</div>
				</div><!-- /.col-md-3 -->

{{-- 				<div class="col-md-3 widget-container">
					<div id="nav_menu-2" class="widget widget_nav_menu">
						<h3 class="footer-widget-title">Useful Links</h3>
						<div class="menu-useful-links-container">
							<ul id="menu-useful-links" class="menu">
								<li class="menu-item"><a href="#">Link 1</a></li>
								<li class="menu-item"><a href="#">Link 2</a></li>
								<li class="menu-item"><a href="#">Link 3</a></li>
								<li class="menu-item"><a href="#">Link 4</a></li>
								<li class="menu-item"><a href="#">Link 5</a></li>
							</ul>
						</div>
					</div>
				</div><!-- /.col-md-3 --> --}}

				<div class="col-md-6 widget-container">
					<div id="text-3" class="widget widget_text">
						<h3 class="footer-widget-title">Signup For Newsletter</h3>
							<div class="textwidget"><p>Get latest listing on your email</p>
							<form role="form">
								<div class="form-group">
									<input class="input-newsletter" type="email" placeholder="Input your email here" class="form-control">
								</div>
								<button type="button" class="btn-newsletter">Sign Up</button>
							</form>
							<a href="" target="blank"><i class="media-footer footer-twitt"></i></a>
							<a href="" target="blank"><i class="media-footer footer-fb"></i></a>
							<a href="" target="blank"><i class="media-footer footer-linkedin"></i></a>
							<a href="" target="blank"><i class="media-footer footer-yahoo"></i></a>
							<a href="" target="blank"><i class="media-footer footer-blog"></i></a>
							<a href="" target="blank"><i class="media-footer footer-rss"></i></a></div>
					</div>
				</div><!-- /.col-md-3 -->
			</div><!-- /.row -->
		</div><!-- /#footer-widgets -->
	</div><!-- /.container -->

	<div id="footer-text" class="container">
		2016 &copy; <a href="">Programme Chameleon</a>, All Rights Reserved 
	</div>		
</footer>