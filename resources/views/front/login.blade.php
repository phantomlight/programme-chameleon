<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Login | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h1 class="page-title lighten">
				Login
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="login-form-wrapper" class="element-bottom-30">
						<form id="login-form" role="form" onsubmit="return false;" data-parsley-validate data-route="{{ route('login.front') }}">
							<div class="form-group">
								<input class="form-control" name="email" placeholder="Email" required="required" type="email">
							</div><!-- /.form-group -->
							<div class="form-group">
								<input class="form-control" name="password" placeholder="Password" type="password">
							</div><!-- /.form-group -->
							<input name="action" value="" type="hidden">
							<div class="clearfix"></div>
							<p class="forgetmenot">
								<input name="rememberme" id="rememberme" value="forever" type="checkbox">
								<label for="rememberme">Remember Me</label>
							</p>
							<button type="submit" class="btn btn-login">
								<span class="btn-preloader">
									<i class="fa fa-spinner fa-spin"></i>
								</span>
								<span>Log in</span>
							</button>
							<a class="lost-password-link" href="#">Lost password?</a>
						</form>
					</div><!-- /.login-form-wrapper -->
				</div><!-- /.col-md-5 -->
				<div class="col-md-7">
					<h3 class="sc-title normal lighten"> Not A Member? Register Now </h3>
					<p class="lighten">Company that would like to register its vacancy?</p>
					<p><a href="{{ route('company.register') }}" target="_self" class="btn sc-button medium btn-primary btn-width-fix">REGISTER</a></p>

					<p class="lighten">Contractors that would like to search for jobs/contracts?</p>
					<p class="lighten"><a href="{{ route('contractor.register') }}" target="_self" class="btn sc-button medium btn-success btn-width-fix">REGISTER</a></p>

					<p class="lighten">Agency that would like to help contractors and companies to meet?</p>
					<p class="lighten"><a href="{{ route('agency.register') }}" target="_self" class="btn sc-button medium btn-danger btn-width-fix">REGISTER</a></p>
				</div><!-- /.col-md-7 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop