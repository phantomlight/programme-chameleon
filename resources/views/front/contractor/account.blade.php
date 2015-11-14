@extends('front.app')

@section('title')
Contractor 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper" class="common-page-wrapper">
		<div class="container">
			<div class="row">
				<h2 class="page-header text-center">Account Settings</h2>
				<form class="sc-form col-md-6 col-md-offset-3" role="form" data-parsley-validate>
					<div class="form-group">
						<label>First Name</label>
						<input readonly="" class="form-control" value="John" />
					</div>

					<div class="form-group">
						<label>Last Name</label>
						<input readonly="" class="form-control" value="Doe" />
					</div>

					<div class="form-group">
						<label>Email</label>
						<input readonly="" class="form-control" value="myemail@email.org" />
					</div>

					<div class="form-group">
						<label>Password</label>
						<input type="password" name="password" class="form-control" placeholder="only fill if you want to change password." />
						<span class="help-block">* only fill if you want to change it</span>
					</div>

					<div class="form-group">
						<label>Country</label>
						<select class="form-control" name="account_country">
							<option value="0">-- Country Selector --</option>
						</select>
					</div>

					<div class="form-group">
						<label>City</label>
						<select class="form-control" name="account_city">
							<option value="0">-- City Selector --</option>
						</select>
					</div>

					<div class="form-group">
						<label>Address</label>
						<input type="text" name="account_address" class="form-control" placeholder="Address">
					</div>

					<div class="form-group">
						<label>Upload CV</label>
						<input type="file" name="account_cv">
					</div>

					<div class="form-group">
						<label>Profile Image</label>
						<input type="file" name="account_avatar">
					</div>

					<button type="submit" class="btn">Update</button>
				</form>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop