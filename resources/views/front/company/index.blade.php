<?php if(\User::check()) $user = \User::getUser(); $company = \Company::getCompany(); ?>

@extends('front.app')

@section('title')
	Company 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div class="element-top-30">&nbsp;</div>
		<div class="col-sm-8">
			<div class="panel panel-default">
				<div class="panel-heading">Dashboard</div>
				<div class="panel-body">
					<?php $jobs = $company->jobs; ?>
					@if ($jobs->count() <= 0)
						<div class="alert alert-info">
							You have no jobs posted. <a href="{{ route('company.job.post') }}">Set one up?</a>
						</div>
					@else
						<ul class="list-unstyled list-jobs">
						@foreach ($jobs as $job)
							<li>
								<p>{{ $job->title }}</p>
								<p>Status: {!! $job->status === 'open' ? '<label class="label label-success">Open</label>' : '<label class="label label-warning">Taken</label>' !!}</p>
								<p class="time"><i class="fa fa-clock-o"></i> {{ $job->created_at->toDayDatetimeString() }}</p>
								<div class="btn-group">
									<a href="{{ route('company.job.edit') . '?i=' . $job->id }}" class="btn btn-warning btn-xs">Edit</a>
									<a href="{{ route('company.job.timesheet') . '?i=' . $job->id }}" class="btn btn-primary btn-xs">See Timesheet ({{ $job->timesheets->count() }})</a>
								</div>
							</li>
						@endforeach
						</ul>
					@endif
				</div>
			</div>
		</div>

		<div class="col-sm-4">
			<a href="#" class="btn btn-primary element-bottom-10">
				Subscribe to 6-month contract.
			</a>

			<div class="panel panel-default">
				<div class="panel-heading">Credits</div>
				<div class="panel-body">
					<p>You currently have: 2</p>
					<p><a href="#">buy more?</a></p>
				</div>
			</div>
		</div>
	</div>

	<div class="clearfix element-top-20 element-bottom-20">&nbsp;</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop