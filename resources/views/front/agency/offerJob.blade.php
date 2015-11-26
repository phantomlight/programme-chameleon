@extends('front.app')

@section('title')
	Offer a Job | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="element-top-30" id="agency-offer-job">
		<h2 class="page-header text-center">Offer a Job</h2>
		<form role="form" onsubmit="return false;" data-parsley-validate class="sc-form col-sm-6 col-sm-offset-3">
			<div class="form-group">
				<label>Contractor</label>
				<select class="form-control" name="contractor_id">
					<option>-- Contractor Selector --</option>
				</select>
			</div>

			<div class="form-group">
				<label>Company</label>
				<select class="form-control" name="company_id">
					<option>-- Company Selector --</option>
				</select>
			</div>

			<div class="form-group">
				<label>Job</label>
				<select class="form-control" name="job_id">
					<option>-- Job Selector --</option>
				</select>
			</div>

			<div class="form-group">
				<label>Message</label>
				<textarea class="form-control" maxlength="2000">Message for contractor</textarea>
			</div>

			<button class="btn" type="submit">Send</button>
		</form>
	</div>
</div>

<div class="element-bottom-30">&nbsp;</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop