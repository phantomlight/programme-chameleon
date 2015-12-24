<?php
	if (\User::check()) {
		$user = \User::getUser();
		$company = \Company::getCompany();
	}
?>
	
@extends('front.app')

@section('title')
Post a Job | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<div class="row element-top-30 element-bottom-10">
				<form class="col-sm-8 col-sm-offset-2 sc-form" id="companyPostJobForm" role="form" onsubmit="return false;">
					<div class="form-section">
						<div class="form-group">
							<label>Job Title</label>
							<input type="text" name="title" class="form-control" required placeholder="Job Title" />
							<span class="help-block">Make sure title stands out, as this plays huge role when contractors are searching for your jobs</span>
						</div>

						<div class="form-group">
							<label>Job Description</label>
							<textarea class="form-control" name="description" required>Some details of your job here.</textarea>
						</div>

						<div class="form-group">
							<label>Min. Experience (in years)</label>
							<input type="number" class="form-control" name="experience_year" required min="0" value="0">
						</div>

						<div class="form-group">
							<label>Start</label>
							<input type="text" class="form-control" required name="start_date" placeholder="Ex. Next week, 1st of June, etc" value="Immediately" />
						</div>

						<div class="form-group">
							<label>Country</label>
							<select class="form-control" id="countrySelector" name="country" data-value="">
								<option>-- Country Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label>City</label>
							<select class="form-control" id="citySelector" name="city" data-value="">
								<option>-- City Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="eligible_to_work_in_country"> Applicant must eligible to work in country specified?
							</label>
						</div>

						<div class="form-group">
							<label>Job Type</label>
							<select class="form-control" name="type">
								<option value="permanent">Permanent</option>
								<option value="contract">Contract</option>
							</select>
						</div>

						@if ( ! $company->is_vip)
							<div class="form-group">
								<label>Job Post Duration</label>
								<select class="form-control" name="job_post_duration">
									<option value="1">1 Week (<strong>1</strong> credit)</option>
									<option value="2">1 Month (<strong>3</strong> credits)</option>
								</select>
								<span class="help-block">You currently have: {{ $company->credit }} credit(s). <a href="#" target="_blank">Buy more?</a></span>
							</div>
						@endif

						<div class="form-group">
							<label>Salary (in GBP)</label>
							<input type="number" class="form-control" min="0" required placeholder="
							Rate/salary for the job" name="salary">
						</div>

						<div class="form-group">
							<label>Salary Rate</label>
							<select class="form-control" name="salary_type" required>
								<option value="hourly">Hourly</option>
								<option value="daily">Daily</option>
								<option value="monthly">Monthly</option>
							</select>
						</div>

						<div class="form-group">
							<label>Work Visa Requirement</label>
							<select class="form-control" name="visa">
								<option value="1">Required</option>
								<option value="0">Not required</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="security_clearance"> Security clearance?
							</label>
						</div>

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
							<span class="help-block">You can select up to 3 industries, contractor with same industries will be alerted.</span>
						</div>

						<div class="form-navigation">
							<button class="btn sc-button next" type="button">Next: Application Information <i class="fa fa-chevron-right"></i></button>
						</div>
					</div>

					<div class="form-section">
						<div class="form-group">
							<label>Contact Name</label>
							<input type="text" class="form-control" required name="contact_name">
						</div>

						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" required name="contact_phone">
						</div>

						<h3>Enter application contact detail</h3>
						<hr>

						<div class="form-group">
							<label class="radio">
								<input type="radio" name="job_apply_type" value="job_apply_by_email" required />
								<div class="radio-clearfix">Application Email: <input type="email" name="job_apply_application_email" class="form-control"></div>
								<div class="radio-clearfix">Direct Email: <input type="email" name="job_apply_direct_email" class="form-control"> </div>
							</label>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="radio" name="job_apply_type" value="job_apply_by_url" required />
								<div>Online application url: <input type="url" name="job_apply_url" class="form-control"></div>
							</label>
						</div>

						<div class="form-navigation">
							<button type="button" class="previous btn btn-danger pull-left">
								<i class="fa fa-chevron-left"></i> Prev: Job Details
							</button>

							<button type="submit" class="btn sc-button pull-right">
								<span class="btn-preloader">
									<i class="fa fa-spinner fa-spin"></i>
								</span>
								<span>Submit Job</span>
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop