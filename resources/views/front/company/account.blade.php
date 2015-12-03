<?php

use Carbon\Carbon;

if(\User::check()) $user = \User::getUser();
$company = \Company::getCompany();

?>

@extends('front.app')

@section('title')
Account Settings | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div class="element-top-30">&nbsp;</div>
		<div class="col-sm-8">
			<div class="panel panel-default">
				<div class="panel-heading">Account Info</div>
				<div class="panel-body">
					<form id="companyEditAccountForm" role="form" data-parsley-validate onsubmit="return false;">
						<div class="form-group">
							<label>Email</label>
							<input type="email" readonly="" class="form-control" value="{{ $user->email }}">
						</div>

						<div class="form-group">
							<label>Password</label>
							<input type="password" class="form-control" name="password">
							<span class="help-block">Empty if you do not want to change password</span>
						</div>

						<div class="form-group">
							<label>Short overview about your company</label>
							<textarea class="form-control" maxlength="1000" name="overview"></textarea>
						</div>

						<div class="form-group">
							<label>Short description of your company</label>
							<textarea class="form-control" maxlength="1000" name="about"></textarea>
						</div>

						<?php $socials = json_decode($company->socials); ?>

						<div class="form-group">
							<label>Facebook</label>
							<input type="text" name="socials_facebook" class="form-control" placeholder="Facebook Account" value="@if(isset($socials->facebook)){{$socials->facebook}}@endif">
						</div>

						<div class="form-group">
							<label>Twitter</label>
							<input type="text" name="socials_twitter" class="form-control" placeholder="Twitter Account" value="@if(isset($socials->twitter)){{ $socials->twitter}}@endif">
						</div>

						<div class="form-group">
							<label>Google+</label>
							<input type="text" name="socials_google" class="form-control" placeholder="Google+ Account" value="@if(isset($socials->google)){{$socials->google}}@endif">
						</div>

						<div class="form-group">
							<label>Website</label>
							<input type="url" name="socials_url" class="form-control" placeholder="Website" value="@if(isset($socials->google)){{$socials->google}}@endif">
						</div>

						<div class="form-group">
							<label>Industries you focus on.</label>
							<?php $industries = \Job::getAllIndustries(); ?>
							<select class="form-control" name="industry" multiple="multiple" data-parsley-mincheck="1" data-parsley-maxcheck="5">
								@if ($industries->count() > 0)
									@foreach ($industries as $industry)
										<option value="{{ $industry->title }}">{{ $industry->title }}</option>
									@endforeach
								@else
									<option value="0">No industry has been set yet</option>
								@endif
							</select>
							<span class="help-block">You can select up to 5 industries</span>
						</div>

						<button type="submit" class="btn btn-primary">
							<span>Update</span>
							<span class="btn-preloader">
								<i class="fa fa-spinner fa-spin"></i>
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>

		<div class="col-sm-4">
			@if ( ! $company->is_vip)
			<div class="panel panel-danger">
				<div class="panel-heading">Not a VIP</div>
				<div class="panel-body">
					<a href="#" data-toggle="modal" data-target="#whatis-contract-modal">What is a VIP/6-month contract?</a>

					<button class="btn btn-primary element-top-10 element-bottom-10" data-checkout-type="1">
						<span class="btn-preloader">
							<i class="fa fa-spinner fa-spin"></i> checking out with paypal, please wait..
						</span>
						<span>Subscribe to 6-month contract.</span>
					</button>

					<div class="element-top-10">
						<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif">
					</div>
				</div>
			</div>
			@else
			<div class="panel panel-success">
				<div class="panel-heading">VIP</div>
				<div class="panel-body">
					<p>You are subscribed to 6 month contract</p>
					<?php
					$vip_since = Carbon::createFromFormat('Y-m-d H:i:s', $company->vip_start);
					$vip_until = Carbon::createFromFormat('Y-m-d H:i:s', $company->vip_end);
					?>
					<p>Since: {{ $vip_since->diffForHumans() }}</p>
					<p>Until: {{ $vip_until->toDayDateTimeString() }}</p>
				</div>
			</div>
			@endif

			<div class="panel panel-default clearfix">
				<div class="panel-heading">Credits</div>
				<div class="panel-body">
					<p>You currently have: {{ $company->credit }}</p>
					<p>Buy more?</p>
					<form method="post" role="form" data-parsley-validate onsubmit="return false;">
						<div class="form-group">
							<input value="1" placeholder="amount of credits" type="number" name="_cred_amt" min="1" class="form-control" />
							<span class="help-block">Each credit is <i class="fa fa-gbp"></i>10</span>
						</div>
						<button type="submit" class="btn btn-primary" data-checkout-type="2">
							<span>Buy Credits</span>
							<span class="btn-preloader">
								<i class="fa fa-spinner fa-spin"></i> checking out with paypal, please wait..
							</span>
						</button>
					</form>

					<div class="element-top-10">
						<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" align="left">
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="clearfix element-top-20 element-bottom-20">&nbsp;</div>
</div>

<div class="modal fade" id="whatis-contract-modal" tabindex="-1" role="dialog" aria-labelledby="whatisContractLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="whatisContractLabel">What is a 6 months contract?</h4>
			</div>
			<div class="modal-body">
				<h2>Programme Chameleon 6 Month Contract - Company</h2>
				<p>Companies Full Service</p>
				<p>Functionality:</p>
				<ul>
					<li>Receive electronic timesheets through Programme Chameleon.</li>
					<li>Submit vacancies on programme chameleon.
						Search for candidates.</li>
						<li>Companies have jobs page to show own jobs incorporated into their website.</li>
						<li>Unlimited Job posting.</li>
					</ul>
					<p>Charging:</p>
					<ul>
						<li>If hosting (i.e Jobs page on their site).
							6 Month contract minimum.</li>
							<li>£1800 for 6 Months – purchased by buying one off credit.</li>
							<li>Sell set up as free if sign up by March 2016.</li>
						</ul>
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