<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Company Register | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h1 class="page-title lighten">
				Company Register
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="register-form-wrapper" class="element-bottom-30">
						<form role="form" id="register-form" onsubmit="return false;" data-parsley-validate data-route="{{ route('company.postRegister') }}">
							<div class="form-group">
								<label>Company Name</label>
								<input class="form-control" name="company_name" placeholder="Company Name" required="required" type="text">
							</div>
							<div class="form-group">
								<label>Company Position</label>
								<input class="form-control" name="company_position" placeholder="Company Position" required="required" type="text">
							</div>
							<div class="form-group">
								<label>Address</label>
								<input class="form-control" name="address" placeholder="Address" required="required" type="text">
							</div>
							<div class="form-group">
								<label>Phone</label>
								<input class="form-control" name="phone" placeholder="Phone" required="required" type="text">
							</div>
							<div class="form-group">
								<label>Email</label>
								<input class="form-control" name="email" placeholder="Email" required="required" type="email">
							</div>
							<div class="form-group">
								<label>Password</label>
								<input class="form-control" name="password" placeholder="Password" required="required" type="password">
							</div>
							<div class="form-group no-border">
								<label for="terms">
									<input type="checkbox" id="terms" name="terms" required> I agree to the <a href="#" data-toggle="modal" data-target="#terms-modal">terms &amp; conditions</a> to advertised job on this site.
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

<div class="modal fade" id="terms-modal" tabindex="-1" role="dialog" aria-labelledby="termsLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="termsLabel">Terms of Using Programme Chameleon Website</h4>
			</div>
			<div class="modal-body">
				<?php $terms = \Site::getDataByKey('terms'); ?>
				@if ($terms)
					{!! $terms->description !!}
				@endif
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop