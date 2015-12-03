<?php if(\User::check()) $user = \User::getUser(); $company = \Company::getCompany(); ?>
	
@extends('front.app')

@section('title')
{{ $job->title }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<div class="row element-top-30 element-bottom-10">
				<form class="col-sm-8 col-sm-offset-2 sc-form" id="companyEditJobForm" role="form" onsubmit="return false;" data-job="{{ $job->id }}">
					<div class="form-section">
						<div class="form-group">
							<label>Job Title</label>
							<input type="text" name="title" class="form-control" required placeholder="Job Title" value="{{ $job->title }}" />
							<span class="help-block">Make sure title stands out, as this plays huge role when contractors are searching for your jobs</span>
						</div>

						<div class="form-group">
							<label>Job Description</label>
							<textarea class="form-control" name="description" required>{{ $job->description }}</textarea>
						</div>

						<div class="form-group">
							<label>Min. Experience (in year)</label>
							<input type="number" class="form-control" name="experience_year" required min="0" value="{{ $job->experience_year }}">
						</div>

						<div class="form-group">
							<label>Country</label>
							<select class="form-control" id="countrySelector" name="country" data-value="{{ $job->country }}">
								<option>-- Country Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label>City</label>
							<select class="form-control" id="citySelector" name="city" data-value="{{ $job->city }}">
								<option>-- City Selector --</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="eligible_to_work_in_country" @if ($job->eligible_to_work_in_country) {{ 'checked="checked"' }} @endif> Applicant must eligible to work in country specified?
							</label>
						</div>

						<div class="form-group">
							<label>Job Type</label>
							<select class="form-control" name="type">
								<option value="permanent" @if ($job->type === 'permanent') {{ 'selected="selected"' }}  @endif>Permanent</option>
								<option value="contract" @if ($job->type === 'contract') {{ 'selected="selected"' }}  @endif>Contract</option>
							</select>
						</div>

						<div class="form-group">
							<label>Job Post Duration</label>
							<select class="form-control" name="job_post_duration">
								<option value="0" selected="selected">Leave as it is</option>
								<option value="1">Add 1 Week (<strong>1</strong> credit)</option>
								<option value="2">Add 1 Month (<strong>3</strong> credits)</option>
							</select>
							<span class="help-block">If you have add the duration, you have to use credit again. You currently have: {{ $company->credit }} credit(s). <a href="#" target="_blank">Buy more?</a></span>
						</div>

						<div class="form-group">
							<label>Salary (in GBP)</label>
							<input type="number" class="form-control" min="0" required placeholder="
							Rate/salary for the job" name="salary" value="{{ number_format($job->salary, 0) }}">
						</div>

						<div class="form-group">
							<label>Salary Rate</label>
							<select class="form-control" name="salary_type" required>
								<option value="hourly" @if ($job->salary_type === 'hourly') {{ 'seleced="selected"' }} @endif>Hourly</option>
								<option value="monthly" @if ($job->salary_type === 'monthly') {{ 'seleced="selected"' }} @endif>Monthly</option>
								<option value="one-time" @if ($job->salary_type === 'one-time') {{ 'seleced="selected"' }} @endif>One Time</option>
							</select>
						</div>

						<div class="form-group">
							<label>Work Visa Requirement</label>
							<select class="form-control" name="visa">
								<option value="1" @if ($job->visa) {{ 'seleced="selected"' }} @endif>Required</option>
								<option value="0" @if ( ! $job->visa) {{ 'seleced="selected"' }} @endif>Not required</option>
							</select>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="checkbox" name="security_clearance" @if ($job->security_clearance) {{ 'checked="checked"' }} @endif> Security clearance?
							</label>
						</div>

						<div class="form-group">
							<label>Industries</label>
							<?php $industries = \Job::getAllIndustries(); $currentIndustriesArr = []; foreach ($job->industries as $currentIndustry) array_push($currentIndustriesArr, $currentIndustry->id); ?>
							<select class="form-control" name="job_industry" multiple="multiple" data-parsley-mincheck="1" data-parsley-maxcheck="3" required>
								@if ($industries->count() > 0)
									@foreach ($industries as $industry)
										<option value="{{ $industry->id }}" @if (in_array($industry->id, $currentIndustriesArr)) {{ 'selected="selected"' }} @endif>{{ $industry->title }}</option>
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
							<label>Job Status</label>
							<select class="form-control" name="status">
								<option value="open" @if ($job->status === 'open') {{ 'selected="selected"' }} @endif>Open</option>
								<option value="taken" @if ($job->status === 'taken') {{ 'selected="selected"' }} @endif>Taken</option>
							</select>
						</div>

						<div class="form-group">
							<label>Contact Name</label>
							<input type="text" class="form-control" value="{{ $job->contact_name }}" required name="contact_name">
						</div>

						<div class="form-group">
							<label>Phone</label>
							<input type="text" class="form-control" value="{{ $job->contact_phone }}" required name="contact_phone">
						</div>

						<h3>Provide a way of how contractors will apply</h3>
						<hr>

						<?php $jobApply = json_decode($job->job_apply_details); ?>

						<div class="form-group">
							<label class="radio">
								<input type="radio" name="job_apply_type" value="job_apply_by_email" @if ($jobApply->type === 'email') {{ 'checked="checked"' }} @endif required />
								<div class="radio-clearfix">Application Email: <input type="email" name="job_apply_application_email" class="form-control" value="{{ isset($jobApply->application_email) ? $jobApply->application_email : '' }}"></div>
								<div class="radio-clearfix">Direct Email: <input type="email" name="job_apply_direct_email" class="form-control" value="{{ isset($jobApply->direct_email) ? $jobApply->direct_email : '' }}"> </div>
							</label>
						</div>

						<div class="form-group">
							<label class="radio">
								<input type="radio" name="job_apply_type" value="job_apply_by_url" required @if ($jobApply->type === 'url') {{ 'checked="checked"' }} @endif />
								<div>Online application url: <input type="url" name="job_apply_url" class="form-control" value="{{ isset($jobApply->url) ? $jobApply->url : '' }}" /></div>
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
								<span>Update Job</span>
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