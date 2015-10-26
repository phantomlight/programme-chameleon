@extends('app')

@section('title')
Register | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="page-title-wrapper" class="register-page-wrapper">
		<div class="container">
			<h1 class="page-title">Register</h1>
			<div class="row">
				<div class="col-md-5">
					<div id="register-form-wrapper" class="">
						<form id="register-form" action="#" method="post">
							<div class="form-group">
								<input class="form-control" name="register_name" id="register_name" placeholder="Username" required="required" type="text">
							</div><!-- /.form-group -->
							<div class="form-group">
								<input class="form-control" name="register_email" id="register_email" placeholder="Email" required="required" type="email">
							</div><!-- /.form-group -->
							<div class="form-group">
								<input class="form-control" name="register_password" id="register_password" placeholder="Password" required="required" type="password">
							</div><!-- /.form-group -->
							<div class="row">
								<div class="col-sm-6">
									<div class="form-radio-group">
										<input name="register_role" id="register_role_job_lister" value="job_lister" type="radio"><label for="register_role_job_lister">Job Lister</label>
									</div><!-- /.form-radio-group -->
								</div><!-- /.col-sm-6 -->
								<div class="col-sm-6">
									<div class="form-radio-group">
										<input name="register_role" id="register_role_job_seeker" value="job_seeker" checked="" type="radio"><label for="register_role_job_seeker">Job Seeker</label>
									</div><!-- /.form-radio-group -->
								</div><!-- /.col-sm-6 -->
							</div><!-- /.row -->
							<input name="action" value="jobboard_proccess_login_form" type="hidden">
							<button type="submit" name="user_submit" id="user_submit" value="1" class="btn btn-register">Register</button>
						</form>
					</div><!-- /.login-form-wrapper -->
				</div><!-- /.col-md-5 -->
				<div class="col-md-7">
					<div class="post-181 page type-page status-publish hentry">
						<article id="page-181">
							<h3 class="sc-title normal">Already A Member? Log in Here</h3>
							<p>Are you a business or contractor? If have an account you can login from the button below.</p>
							<p><a href="{{ url('login') }}" target="_self" class="btn sc-button medium grey">Log In</a></p>
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