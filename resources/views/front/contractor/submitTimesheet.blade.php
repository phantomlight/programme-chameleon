@extends('front.app')

@section('title')
	Submit Timesheet | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper element-bottom-30 element-top-30">
		<div class="container">
			<h2 class="page-header">Submit a Timesheet</h2>

			<form class="sc-form col-md-8">
				<div class="form-group">
					<label>Timesheet Name</label>
					<input type="text" name="timesheeet_name" class="form-control" required>
				</div>

				<div class="form-group">
					<div class="row">
						<div class="col-sm-6">
							<select class="form-control" name="job_id">
								<option>-- Job selector --</option>
							</select>
						</div>

						<div class="col-sm-6">
							<select class="form-control" name="company_id">
								<option>-- Company selector --</option>
							</select>
						</div>
					</div>
				</div>

				<div class="form-group">
					<label>Timesheet</label>
					<div class="row">
						<div class="col-sm-8">
							<label class="radio">
								<input type="radio" name="timesheet_type" value="data"> Create From Data
							</label>
							<p>Date Range</p>
							<div class="form-group input-group input-daterange">
								<input type="text" name="timesheet_date_from" class="form-control" />
								<span class="input-group-addon">to</span>
								<input type="text" name="timesheet_date_to" class="form-control" />
							</div>

							<div class="form-group">
								<label>Report</label>
								<select class="form-control" name="report_time">
									<option value="daily"> Daily </option>
									<option value="weekly"> Weekly </option>
									<option value="monthly"> Monthly </option> 
								</select>
							</div>

							<div class="form-group">
								<label>Hours of working</label>
								<div class="input-group">
									<input type="number" class="form-control" name="num_hours" value="1" min="1" />
									<span class="input-group-addon">hour(s)</span>
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

				<button type="submit" class="btn">Submit</button>
			</form>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop