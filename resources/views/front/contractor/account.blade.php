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
								<select class="form-control" id="countrySelector" name="account_country">
									<option value="0">-- Country Selector --</option>
								</select>
							</div>

							<div class="form-group">
								<label>City</label>
								<select class="form-control" id="citySelector" name="account_city">
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
												<input type="text" name="exp_year" class="form-control" placeholder="Year" value="{{ $experience->company }}" />
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

						<div class="col-md-6 element-top-50">
							<h3>CV and Avatar Settings</h3>
							<div class="form-group">
								<label>Upload CV</label>
								<input type="file" name="file_cv">
							</div>

							<div class="form-group">
								<label>Profile Image</label>
								<input type="file" name="image">
								<br>
								@if (is_null($contractor->image))
									<img data-src="holder.js/100x100?text:No-image" class="img-thumbnail tmp-img" />
								@else
									<img src="{{ asset($contractor->image) }}" width="100" class="img-thumbnail tmp-img" />
								@endif
							</div>
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