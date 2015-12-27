<?php if (\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Reset Password | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h1 class="page-title lighten">
				Reset your password
			</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="login-form-wrapper" class="element-bottom-30">
						<form id="resetPasswordForm" role="form" onsubmit="return false;" data-parsley-validate>
							<!-- do not tamper with these or you will be in trouble -->
							<input type="hidden" name="c" required value="{{ \Input::get('c') }}" />
							<input type="hidden" name="e" required value="{{ \Input::get('e') }}" />
							<div class="form-group">
								<label class="lighten">Password</label>
								<input class="form-control" id="password" name="password" placeholder="New Password" required="required" type="password">
							</div><!-- /.form-group -->
							<div class="form-group">
								<label class="lighten">Re-type Password</label>
								<input class="form-control" placeholder="Re-type your new password" required="required" type="password" data-parsley-equalto="#password" />
							</div><!-- /.form-group -->
							<button type="submit" class="btn btn-primary">
								<span class="btn-preloader">
									<i class="fa fa-spinner fa-spin"></i>
								</span>
								<span>Reset</span>
							</button>
						</form>
					</div><!-- /.login-form-wrapper -->
				</div><!-- /.col-md-5 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')

@stop