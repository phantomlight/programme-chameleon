@extends('app')

@section('title')
Login | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="page-title-wrapper" class="login-page-wrapper">
		<div class="container">
			<h1 class="page-title">
				Login
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="login-form-wrapper" class="no-animated">
						<form id="login-form" action="#" method="post">
							<div class="form-group">
								<input class="form-control" name="the_user_login" id="user_login" placeholder="Username" required="required" type="text">
							</div><!-- /.form-group -->
							<div class="form-group">
								<input class="form-control" name="the_user_password" id="user_password" placeholder="Password" type="password">
							</div><!-- /.form-group -->
							<input name="action" value="" type="hidden">
							<div class="clearfix"></div>
							<p class="forgetmenot">
								<label for="rememberme">
								<input name="rememberme" id="rememberme" value="forever" type="checkbox">Remember Me</label>
							</p>
							<button type="submit" name="user_submit" id="user_submit" value="1" class="btn btn-login">Log in</button>
							<a class="lost-password-link" href="#">Lost password?</a>
						</form>
					</div><!-- /.login-form-wrapper -->
				</div><!-- /.col-md-5 -->
				<div class="col-md-7">
					<div class="post-179 page type-page status-publish hentry">
						<article id="page-179">
							<h3 class="sc-title normal">Not A Member? Register Now</h3>
							<p>Company that would like to register its vacancy? Or Contractor that would like to look for a contract? Sign up.</p>
							<p><a href="{{ url('register') }}" target="_self" class="btn sc-button medium grey">REGISTER</a></p>
							<div class="row">
								<div class="col-sm-6 col-sm-offset-0">
									<ul class="sc-ul">
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Dislike men who are so beguiled and</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Charms of pleasure of the moment</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Duty through weakness of will, which is</li>
									</ul>
								</div>
								<div class="col-sm-6 col-sm-offset-0">
									<ul class="sc-ul">
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Dislike men who are so beguiled and</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Charms of pleasure of the moment</li>
										<li><i style="color:#4CAF50" class="fa fa-fw fa-arrow-right"></i> Duty through weakness of will, which is</li>
									</ul>
								</div>
							</div>
						</article>
					</div><!-- /#content -->
				</div><!-- /.col-md-7 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('include.footer-query')
@include('include.footer')
@stop