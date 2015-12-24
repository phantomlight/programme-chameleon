<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();
		$contractor = \Contractor::getContractor();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>
	
@extends('front.app')

@section('title')
	Submit Timesheet | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper element-top-30">
		<div class="container">
			<h2 class="page-header lighten">Submit a Timesheet</h2>

			<div class="row">
				<div class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-heading">Job Detail</div>
						<div class="panel-body">
							<p>Name: {{ $job->title }}</p>
							<p>Status: {{ $job->status }}</p>
						</div>
						<div class="panel-footer">
							<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" target="_blank" class="btn btn-xs btn-primary">See Details</a>
						</div>
					</div>

					<div class="panel panel-default">
						<div class="panel-heading">Your timesheet on this job</div>
						<div class="panel-body">
							<?php $timesheets = $contractor->timesheets()->orderBy('created_at', 'desc')->get(); ?>
							@if (count($timesheets) > 0)
								<ul class="list-unstyled sc-list" id="dataFileList">
									@foreach ($timesheets as $timesheet)
										<li data-id="{{ $_hash->encode($timesheet->id) }}">
											<p>{{ $timesheet->name }}</p>
											<p class="text-muted"><small><i class="fa fa-clock-o"></i> Submitted {{ $timesheet->created_at->diffForHumans() }}</small></p>
											<div class="btn-group">
												<button class="btn btn-danger btn-xs" data-remove="{{ route('contractor.job.timesheet.remove') }}" data-id="{{ $_hash->encode($timesheet->id) }}">Remove</button>
											</div>
										</li>
									@endforeach
								</ul>
							@else
								<div class="alert alert-danger">
									No timesheet submitted yet.
								</div>
							@endif
						</div>
					</div>
				</div>

				<div class="col-md-8">
					<form class="sc-form" role="form" onsubmit="return false;" id="submitTimesheetForm" data-value="{{ $_hash->encode($job->id) }}" data-parsley-validate>
						<div class="form-group">
							<label>Name/Title</label>
							<input type="text" name="timesheet_name" class="form-control" required value="Timesheet by {{ $user->first_name . ' ' . $user->last_name }}" />
						</div>

						<div class="form-group">
							<label>Timesheet</label>
							<div class="row">
								<div class="col-sm-8">
									<label class="radio">
										<input type="radio" name="timesheet_type" checked="checked" value="data"> Create From Data
									</label>
									<p>Date Range</p>
									<div class="form-group input-group input-daterange">
										<input type="text" data-date-clear-btn="true" data-date-today-btn="true" data-date-today-highlight="true" name="timesheet_date_from" class="form-control" />
										<span class="input-group-addon">to</span>
										<input type="text" data-date-clear-btn="true" data-date-today-btn="true" data-date-today-highlight="true" name="timesheet_date_to" class="form-control" />
									</div>

									<div class="form-group">
										<label>Report</label>
										<select class="form-control" name="report_time">
											<option value="daily" selected="selected"> Daily </option>
											<option value="weekly"> Weekly </option>
											<option value="monthly"> Monthly </option> 
										</select>
									</div>

									<div class="form-group">
										<label><span class="hour-text">hour</span>(s) of working</label>
										<div class="input-group">
											<input type="number" class="form-control" name="num_hours" value="1" min="1" />
											<span class="input-group-addon"><span class="hour-text">hour</span>(s)</span>
										</div>
									</div>
								</div>

								<div class="col-sm-4">
									<label class="radio">
										<input type="radio" name="timesheet_type" value="file"> From File
									</label>
									<input type="file" name="timesheet_file" />
								</div>
							</div>
						</div>

						<button type="submit" class="btn">
							<span>Submit</span>
							<span class="btn-preloader">
								<i class="fa fa-spinner fa-spin"></i> submitting timesheet..
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop