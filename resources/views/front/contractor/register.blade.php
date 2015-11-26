<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Contractor Register | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h1 class="page-title lighten">
				Contractor Register
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="register-form-wrapper" class="element-bottom-30">
						<form role="form" id="register-form" onsubmit="return false;" data-parsley-validate data-route="{{ route('contractor.postRegister') }}">
							<div class="form-group">
								<input class="form-control" name="first_name" placeholder="First Name" required="required" type="text">
							</div>
							<div class="form-group">
								<input class="form-control" name="last_name" placeholder="Last Name" type="text">
							</div>
							<div class="form-group">
								<input class="form-control" name="address" placeholder="Address" required="required" type="text">
							</div>
							<div class="form-group">
								<input class="form-control" name="phone" placeholder="Phone" required="required" type="text">
							</div>
							<div class="form-group">
								<input class="form-control" name="email" placeholder="Email" required="required" type="email">
							</div>
							<div class="form-group">
								<input class="form-control" name="password" placeholder="Password" required="required" type="password">
							</div>
							<div class="form-group no-border">
								<label for="terms">
									<input type="checkbox" required id="terms" name="terms"> I agree to the <a href="#">terms &amp; conditions</a> to be a contractor/job seeker on this site.
								</label>
							</div>
							<button type="submit" class="btn">
								<span class="btn-preloader">
									<i class="fa fa-spinner fa-spin"></i>
								</span>
								<span>Register</span>
							</button>
						</form>
					</div>
				</div>
				<div class="col-md-7">
					<h3 class="sc-title normal lighten"> Already Registered? </h3>
					<p class="lighten">Go ahead and login from button below</p>
					<p><a href="{{ url('login') }}" target="_self" class="btn sc-button medium btn-primary">LOGIN</a></p>
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop