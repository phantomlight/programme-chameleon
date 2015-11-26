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
							<div class="alert alert-info">
								Posting a job require 1 credit. You currently have <strong>10,000</strong>
							</div>	
						</div>

						<div class="form-group">
							<label>Job Title</label>
							<input type="text" name="job_title" class="form-control" required placeholder="Job Title" />
							<span class="help-block">Make sure title stands out, as this plays huge role when contractors are searching for your jobs</span>
						</div>

						<div class="form-group">
							<label>Job Description</label>
							<textarea class="form-control" name="job_description" required>Some details of your job here.</textarea>
						</div>

						<div class="form-group">
							<label>Country</label>
							<select class="form-control" name="job_country">
								<option>-- Country Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label>City</label>
							<select class="form-control" name="job_country">
								<option>-- City Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="check_eligible"> Applicant must eligible to work in country specified?
							</label>
						</div>

						<div class="form-group">
							<label>Job Type</label>
							<select class="form-control" name="job_type">
								<option value="full-time">Permanent</option>
								<option value="contract">Contract</option>
							</select>
						</div>

						<div class="form-group">
							<label>Job Post Duration</label>
							<select class="form-control" name="job_post_duration">
								<option value="1week">1 Week</option>
								<option value="1month">1 Month</option>
							</select>
						</div>

						<div class="form-group">
							<label>Rate / Salary</label>
							<input type="number" class="form-control" min="0" required placeholder="Rate/salary for the job">
						</div>

						<div class="form-group">
							<label>Work Visa Requirement</label>
							<select class="form-control" name="job_visa_requirement">
								<option value="required">Required</option>
								<option value="considered">Considered</option>
								<option value="not-required">Not required</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="check_security"> Security clearance?
							</label>
						</div>

						<div class="form-group">
							<label>Industries</label>
							<select class="form-control" name="job_industry" multiple="multiple" required>
								<option value="1">IT</option>
								<option value="2">Engineering</option>
								<option value="3">Marketing</option>
								<option value="4">Other</option>
							</select>
						</div>

						<div class="form-navigation">
							<button class="btn sc-button next" type="button">Next: Application Information <i class="fa fa-chevron-right"></i></button>
						</div>
					</div>

					<div class="form-section">
						<div class="form-group">
							<label>Contact Name</label>
							<input type="text" class="form-control" required name="job_contact_name">
						</div>

						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" required name="job_contact_phone">
						</div>

						<h3>Provide a way of how contractors will apply</h3>
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
								Submit Job
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