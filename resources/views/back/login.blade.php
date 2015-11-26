@extends('back.app')

@section('title')
	Admin Login | Programme Chameleon
@stop

@section('content')
<div class="middle-box text-center loginscreen animated fadeInDown">
	<div>
		<div>
			<h1 class="logo-name">PC</h1>
		</div>
		<h3>Hello, Admin!</h3>
		<p>Welcome, to your CMS panel.</p>
		<p>Please input email and password.</p>
		<form id="adminLoginForm" class="sc-form element-top-xs-30" role="form" onsubmit="return false;" data-parsley-validate>
			<div class="form-group">
				<input class="form-control" placeholder="Email" name="email" required="" type="email">
			</div>
			<div class="form-group">
				<input class="form-control" placeholder="Password" name="password" required="" type="password">
			</div>
			<button type="submit" class="btn btn-primary block full-width element-bottom-10">
				<span class="btn-preloader">
					<i class="fa fa-spinner fa-spin"></i> logging you in, please wait...
				</span>
				<span>Login</span>
			</button>
			<a href="#"><small>Forgot password?</small></a>
		</form>
	</div>
</div>

@section('post-script')
	$(document).ready(function () {
		$('body').addClass('bg-gray');
	});
@stop