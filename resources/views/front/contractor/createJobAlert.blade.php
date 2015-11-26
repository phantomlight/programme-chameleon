<?php if(\User::check()) $user = \User::getUser(); ?>

@extends('front.app')

@section('title')
	Create Job Alert | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h2 class="page-header lighten">Create Job Alert</h2>
			<form role="form" data-parsley-validate id="contractorJobAlertForm" class="col-md-6 sc-form" onsubmit="return false;">
				<div class="form-group">
					<label>Job Alert Title</label>
					<input type="text" class="form-control" name="job_alert_title" required placeholder="Name your alert">
				</div>

				<div class="form-group">
					<label>Keywords</label>
					<input type="text" data-role="tagsinput" class="form-control" name="job_tags" required placeholder="Eg Project Manager, London">
				</div>

				<div class="form-group">
					<label>Country</label>
					<select class="form-control" name="country">
						<option>-- Country select --</option>
					</select>
				</div>

				<div class="form-group">
					<label>City</label>
					<select class="form-control" name="country">
						<option>-- City select --</option>
					</select>
				</div>

				<div class="form-group">
					<label>Employment Type</label>
					<div class="form-inline">
						<label class="radio">
							<input type="radio" name="employment_type" value="any"> Any
						</label>
						<label class="radio">
							<input type="radio" name="employment_type" value="contract"> Contract
						</label>
						<label class="radio">
							<input type="radio" name="employment_type" value="full-time"> Full Time
						</label>
					</div>
				</div>

				<div class="form-group">
					<label>Email Alert</label>
					<select class="form-control" name="email_alert">
						<option value="now"> Immediately </option>
						<option value="day"> Daily </option>
						<option value="none"> None </option>
					</select>
				</div>

				<div class="form-group">
					<label>Email To</label>
					<input type="email" required class="form-control" placeholder="Email">
				</div>

				<button type="submit" class="btn">
					<span class="btn-preloader">
						<i class="fa fa-spinner fa-spin"></i>
					</span>
					<span>CREATE</span>
				</button>
			</form>

			<div class="col-md-6">
				<h3 class="lighten">What is Job Alert?</h3>
				<p class="lighten">When a company posted a job that matches the description you provide here, the system will alert you that the job is available.</p>

				<div class="alert alert-info">
					Note that you can only create <strong>1</strong> job alert at a time. If you create another you previous alert will be removed.
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop