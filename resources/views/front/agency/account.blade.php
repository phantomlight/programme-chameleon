<?php
	use App\Utils\Hash;

	if (\User::check()) {
		$user = \User::getUser();
		$agency = \Agency::getAgency();
	}
?>

@extends('front.app')

@section('title')
	{{ $agency->name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.agency.header')
	<div class="container">
		<h1 class="page-header text-center">Account Settings</h1>
		<div class="row element-top-50 element-bottom-50">
			<div class="col-sm-8 col-sm-offset-2">
				<form role="form" id="agencyAccountForm" data-parsley-validate onsubmit="return false;" class="sc-form">
					<div class="form-group">
						<label>Image</label>
						<input type="file" name="image" />
						<div class="img-responsive element-top-10">
						@if ( ! is_null($agency->image))
							<img src="{{ asset($agency->image) }}" width="100" class="tmp-img img-thumbnail" />
						@else
							<img data-src="holder.js/100x100" class="tmp-img img-thumbnail" />
						</div>
						@endif
					</div>

					<div class="form-group">
						<label>Email</label>
						<input type="email" class="form-control" readonly="" value="{{ $user->email }}" />
					</div>

					<div class="form-group">
						<label>Password</label>
						<input type="password" class="form-control" name="password">
						<span class="help-block">Only input if you wish to change your password</span>
					</div>

					<div class="form-group">
						<label>Agency Name</label>
						<input type="text" class="form-control" readonly="" value="{{ $agency->name }}">
					</div>

					<div class="form-group">
						<label>Owner Name</label>
						<input type="text" class="form-control" readonly="" value="{{ $agency->owner_name }}">
					</div>

					<div class="form-group">
						<label>Address</label>
						<input type="text" name="address" class="form-control" value="{{ $agency->address }}">
					</div>

					<div class="form-group">
						<label>Phone</label>
						<input type="text" name="phone" class="form-control" value="{{ $agency->phone }}">
					</div>

					<div class="form-group">
						<label>Country</label>
						<select class="form-control" id="countrySelector" name="country" data-value="{{ $agency->country }}">
							<option value="0">-- Country Selector --</option>
						</select>
					</div>

					<div class="form-group">
						<label>City</label>
						<select class="form-control" id="citySelector" name="city" data-value="{{ $agency->city }}">
							<option value="0">-- Country Selector --</option>
						</select>
					</div>

					<div class="form-group">
						<button class="btn btn-primary" type="submit">
							<span class="btn-preloader">updating..</span>
							<span>Update</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop