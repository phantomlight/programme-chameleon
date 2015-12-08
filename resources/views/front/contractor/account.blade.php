<?php $user = \User::getUser(); $contractor = \Contractor::getContractor(); ?>

@extends('front.app')

@section('title')
{{ $user->first_name . ' ' . $user->last_name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<h2 class="page-header lighten">Account Settings</h2>
				</div>

				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#tabs-account" aria-controls="tabs-account" role="tab" data-toggle="tab">Account Info</a></li>
					<li role="presentation"><a href="#tabs-cv" aria-controls="tabs-cv" role="tab" data-toggle="tab">Upload CV</a></li>
				</ul>

				<div class="tab-content bg-white">
					<div role="tabpanel" class="tab-pane active" id="tabs-account">
						<div class="form-group all-padding">
							<label>Profile Image</label>
							<input type="file" name="image">
							<br>
							@if (is_null($contractor->image))
							<img data-src="holder.js/100x100?random=yes&text=no-image" class="img-thumbnail tmp-img" />
							@else
							<img src="{{ asset($contractor->image) }}" width="100" class="img-thumbnail tmp-img" />
							@endif
						</div>

						<form class="sc-form col-md-12" id="contractorAccountForm" role="form" onsubmit="return false;">
							<div class="row">
								<div class="col-sm-4">
									<div class="form-group">
										<label>First Name</label>
										<input readonly="readonly" class="form-control" value="{{ $user->first_name }}" />
									</div>

									<div class="form-group">
										<label>Last Name</label>
										<input readonly="readonly" class="form-control" value="{{ $user->last_name }}" />
									</div>

									<div class="form-group">
										<label>Email</label>
										<input class="form-control" value="{{ $user->email }}" readonly="readonly" />
									</div>

									<div class="form-group">
										<label>Password</label>
										<input type="password" name="password" class="form-control" placeholder="only fill if you want to change password." />
										<span class="help-block">* only fill if you want to change it</span>
									</div>

									<div class="form-group">
										<label>Country</label>
										<select class="form-control" id="countrySelector" name="account_country" data-value="{{ $contractor->country }}">
											<option value="0">-- Country Selector --</option>
										</select>
									</div>

									<div class="form-group">
										<label>City</label>
										<select class="form-control" id="citySelector" name="account_city" data-value="{{ $contractor->country }}">>
											<option value="0">-- City Selector --</option>
										</select>
									</div>

									<div class="form-group">
										<label>Address</label>
										<input type="text" name="address" class="form-control" placeholder="Address" value="{{ $contractor->address }}">
									</div>

									<div class="form-group">
										<label>Phone</label>
										<input type="text" name="phone" class="form-control" placeholder="Phone" value="{{ $contractor->phone }}">
									</div>

									<?php $socials = json_decode($contractor->socials); ?>

									<div class="form-group">
										<label>Facebook</label>
										<input type="text" name="socials_facebook" class="form-control" placeholder="Facebook Account" value="@if(isset($socials->facebook)){{$socials->facebook}}@endif">
									</div>

									<div class="form-group">
										<label>Twitter</label>
										<input type="text" name="socials_twitter" class="form-control" placeholder="Twitter Account" value="@if(isset($socials->twitter)){{ $socials->twitter}}@endif">
									</div>

									<div class="form-group">
										<label>Linkedin</label>
										<input type="text" name="socials_linkedin" class="form-control" placeholder="LinkedIn Account" value="@if(isset($socials->linkedin)){{$socials->linkedin}}@endif">
									</div>
								</div>

								<div class="col-sm-8">
									<div class="form-group">
										<label>Occupation</label>
										<select class="form-control" name="occupation">
											<option value="Web Designer">Web Designer</option>
										</select>
									</div>

									<div class="form-group">
										<label>Skills</label>
										<input type="text" data-role="tagsinput" class="form-control" name="skills" value="{{ $contractor->skills }}">
									</div>

									<div class="form-group">
										<label>Tell us a little about yourself</label>
										<textarea class="form-control summernote" name="description" maxlength="5000">{!! $contractor->description !!}</textarea>
									</div>

									<div class="form-group" id="expContainer">
										<label>Experience</label>
										<button class="btn btn-xs btn-success" id="addExp">
											<i class="fa fa-plus"></i> Add Exp.
										</button>
										<?php $experiences = json_decode($contractor->experiences); ?>
										@if (count($experiences) > 0)
										@foreach ($experiences as $experience)
										<div class="row element-top-10">
											<div class="col-md-3">
												<input type="text" name="exp_company" class="form-control" placeholder="Company" value="{{ $experience->company }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="exp_year" class="form-control" placeholder="Year" value="{{ $experience->year }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="exp_salary" class="form-control" placeholder="Salary" value="{{ $experience->salary }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="exp_position" class="form-control" placeholder="Position" value="{{ $experience->position }}" />
											</div>

											<div class="element-top-10">&nbsp;</div>

											<div class="col-sm-10">
												<textarea class="form-control" name="exp_desc" maxlength="1000"></textarea>
											</div>

											<div class="col-sm-2">
												<button class="btn btn-danger btn-xs">
													Remove
												</button>
											</div>
										</div>
										@endforeach
										@endif
									</div>

									<div class="form-group" id="eduContainer">
										<label>Education</label>
										<button class="btn btn-xs btn-success" id="addEducation">
											<i class="fa fa-plus"></i> Add Education
										</button>
										<?php $educations = json_decode($contractor->educations); ?>
										@if (count($educations) > 0)
										@foreach ($educations as $education)
										<div class="row element-top-10">
											<div class="col-md-3">
												<input type="text" name="edu_name" class="form-control" placeholder="Institution Name" value="{{ $education->name }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="edu_type" class="form-control" placeholder="ex. Design/Engineering/Business" value="{{ $education->type }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="edu_gpa" class="form-control" placeholder="GPA/Score" value="{{ $education->gpa }}" />
											</div>

											<div class="col-md-3">
												<input type="text" name="edu_qualification" class="form-control" placeholder="ex. Ph.D" value="{{ $education->qualification }}" />
											</div>

											<div class="col-sm-2 element-top-10">
												<button class="btn btn-danger btn-xs">
													Remove
												</button>
											</div>
										</div>
										@endforeach
										@endif
									</div>

									<div class="form-group" id="urlContainer">
										<label>Website</label>
										<button class="btn btn-xs btn-success" id="addWebsite">
											<i class="fa fa-plus"></i> Add Website
										</button>
										<?php $urls = json_decode($contractor->urls); ?>
										@if (count($urls) > 0)
										@foreach ($urls as $url)
										<div class="row element-top-10">
											<div class="col-md-5">
												<input type="text" name="web_name" class="form-control" placeholder="Name of the web" value="{{ $url->name }}" />
											</div>
											<div class="col-md-5">
												<input type="text" name="web_adress" class="form-control" placeholder="http://www.programmechameleon.com" value="{{ $url->address }}" />
											</div>
											<div class="col-sm-2 element-top-10">
												<button class="btn btn-danger btn-xs">
													Remove
												</button>
											</div>
										</div>
										@endforeach
										@endif
									</div>
								</div>

								<div class="col-md-8 col-md-offset-4">
									<button type="submit" class="btn btn-block">
										<span class="btn-preloader">
											<i class="fa fa-spinner fa-spin"></i>
										</span>
										<span>Update</span>
									</button>
								</div>
							</div>
						</form>
					</div>

					<div role="tabpanel" class="tab-pane all-padding" id="tabs-cv">
						<h3>CV and Salary Settings</h3>
						<div class="row">
							<div class="col-sm-4">
								<label>Upload CV</label>
								<input type="file" name="file_cv">
								<div class="element-top-10 element-bottom-10">
									@if ($resume = $contractor->resume)
									<a href="{{ $resume->file }}" class="lighten btn btn-primary btn-xs" target="_blank"><i class="fa fa-download"></i> Download resume</a>
									@endif

									<p>Please input some salary range below, for the purpose of the company to be able to search for you. <strong>Note 	all values here will be in GBP. And you need to upload a CV file first.</strong></p>

									<form role="form" onsubmit="return false;" data-parsley-validate id="contractorSalaryRangeForm">
										<div class="form-group">
											<label>Salary range from</label>
											<div class="input-group">
												<input type="number" name="range_salary_min" class="form-control" value="{{ isset($resume) ? $resume->range_salary_min : 0 }}" min="0" required />
												<span class="input-group-addon">
													<i class="fa fa-gbp"></i>
												</span>
											</div>

											<label>To</label>
											<div class="input-group">
												<input type="number" name="range_salary_max" class="form-control" value="{{ isset($resume) ? $resume->range_salary_max : 0 }}" min="0" required />
												<span class="input-group-addon">
													<i class="fa fa-gbp"></i>
												</span>
											</div>
										</div>

										<div class="form-group">
											<label>Rate</label>
											<?php $selected = isset($resume) ? $resume->salary_rate : null; ?>
											<select class="form-control" name="salary_rate">
												<option value="hourly" @if ($selected === 'hourly') {{ 'selected="selected"' }} @endif> Hourly </option>
												<option value="daily" @if ($selected === 'daily') {{ 'selected="selected"' }} @endif> Daily </option>
												<option value="weekly" @if ($selected === 'weekly') {{ 'selected="selected"' }} @endif> Weekly </option>
												<option value="monthly" @if ($selected === 'monthly') {{ 'selected="selected"' }} @endif> Monthly </option>
											</select>
										</div>

										<button type="button" class="btn btn-primary">
											<span>UPDATE SALARY</span>
											<span class="btn-preloader">
												<i class="fa fa-spinner fa-spin"></i> updating...
											</span>
										</button>
									</form>
								</div>
							</div>
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