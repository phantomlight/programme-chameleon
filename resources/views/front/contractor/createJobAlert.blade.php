<?php 
	if (\User::check()) {
		$user = \User::getUser();
		$contractor = \Contractor::getContractor();
	}
?>

@extends('front.app')

@section('title')
	Creating a Job Alert | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<h2 class="page-header lighten">Creating a Job Alert</h2>
			<div class="row">
				<div class="col-md-6">
					<form role="form" data-parsley-validate id="contractorJobAlertForm" class="sc-form" onsubmit="return false;">
						<div class="form-group">
							<label>Industries</label>
							<?php $industries = \Job::getAllIndustries(); ?>
							<select class="form-control" name="job_industry" multiple="multiple" data-parsley-mincheck="1" data-parsley-maxcheck="3" required>
								@if ($industries->count() > 0)
								@foreach ($industries as $industry)
								<option value="{{ $industry->id }}">{{ $industry->title }}</option>
								@endforeach
								@else
								<option value="0">No industry has been set yet</option>
								@endif
							</select>
							<span class="help-block">You can select up to 3 industries</span>
						</div>

						<div class="form-group">
							<label>Country</label>
							<select class="form-control" name="country" id="countrySelector" required="required" @if ( ! is_null($contractor->country)) {!! 'data-value="' . $contractor->country . '"' !!} @endif>
							</select>
						</div>

						<div class="form-group">
							<label>City</label>
							<select class="form-control" name="city" id="citySelector" required="required" @if ( ! is_null($contractor->city)) {!! 'data-value="' . $contractor->city . '"' !!} @endif>
							</select>
						</div>

						<div class="form-group">
							<label>Employment Type</label>
							<div class="form-inline">
								<label class="radio">
									<input type="radio" name="type" checked="" value="any"> Any
								</label>
								<label class="radio">
									<input type="radio" name="type" value="contract"> Contract
								</label>
								<label class="radio">
									<input type="radio" name="type" value="full-time"> Full Time
								</label>
							</div>
						</div>

						<div class="form-group">
							<label>Email To</label>
							<input type="email" required class="form-control" placeholder="Email" value="{{ $user->email }}" name="email" />
						</div>

						<button type="submit" class="btn">
							<span class="btn-preloader">
								<i class="fa fa-spinner fa-spin"></i>
							</span>
							<span> Create </span>
						</button>
					</form>
				</div>

				<div class="col-md-6">
					<div class="panel panel-info">
						<div class="panel-heading">What is Job Alert?</div>
						<div class="panel-body">
							<p>When a company posts a job that matches the description you provide here, the system will alert you that the job is available.</p>
							<p class="text-muted">You can only create <strong>1</strong> job alert at a time. If you create another you previous alert will be removed.</p>
						</div>
					</div>

					<div class="panel panel-default">
						<div class="panel-heading">Your current alert</div>
						<?php $alerts = $contractor->jobAlerts(); ?>
						<div class="panel-body">
							@if ($alerts->count() > 0)
								<ul class="sc-list">
								@foreach($alerts->get() as $alert)
									<li>
										<p>Industry: <strong>{{ $alert ? $alert->title : 'Not found' }}</strong></p>
										<p class="text-muted">{{ $alert->pivot->country }}, {{ $alert->pivot->city }}</p>
										<p class="text-muted">
											<small>Email to: {{ $alert->pivot->email }}</small>
										</p>
									</li>
								@endforeach
								</ul>
							@else
								<div class="alert alert-danger">You didn't have any alerts yet.</div>
							@endif
						</div>
						<div class="panel-footer">
							<button class="btn btn-danger" type="button" id="removeAlertBtn">
								<span class="btn-preloader">
									<i class="fa fa-spinner fa-spin"></i>
								</span>
								<span>Remove Alert</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop