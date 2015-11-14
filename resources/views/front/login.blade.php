@extends('front.app')

@section('title')
Login | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper" class="common-page-wrapper">
		<div class="container">
			<h1 class="page-title">
				Login
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="login-form-wrapper" class="element-bottom-30">
						<form id="login-form" role="form" action="#" method="post">
							<div class="form-group">
								<input class="form-control" name="email" placeholder="Email" required="required" type="email">
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
					<h3 class="sc-title normal"> Not A Member? Register Now </h3>
					<p>Company that would like to register its vacancy?</p>
					<p><a href="{{ route('company.register') }}" target="_self" class="btn sc-button medium btn-primary">COMPANY REGISTER</a></p>

					<p>Contractors that would like to search for jobs/contracts?</p>
					<p><a href="{{ route('contractor.register') }}" target="_self" class="btn sc-button medium btn-success">CONTRACTOR REGISTER</a></p>

					<p>Agency that would like to help contractors and companies to meet?</p>
					<p><a href="{{ route('agency.register') }}" target="_self" class="btn sc-button medium btn-danger">AGENCY REGISTER</a></p>
				</div><!-- /.col-md-7 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop