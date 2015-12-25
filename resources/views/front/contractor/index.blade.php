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
	{{ $user->first_name . ' ' . $user->last_name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="jobs-alerts" class="element-top-30 element-bottom-30">
		<div class="container">
			<div class="row">
				<div class="col-sm-8">
					<div class="panel panel-success">
						<div class="panel-heading">Current Job(s)</div>
						<?php $jobs = $contractor->jobs(); ?>
						<div class="panel-body">
							@if ($jobs->count() > 0)
								<?php $jobs = $jobs->orderBy('created_at', 'desc')->paginate(15); ?>
								<ul class="list-unstyled sc-list">		
								@foreach ($jobs as $job)
									<li>
										<p><strong>{{ $job->title }}</strong> <span class="text-muted"><small>applied on {{ $job->created_at->toDayDateTimeString() }}</small></span></p>
										@if ($job->pivot->status !== 'accept')
											<div class="alert alert-danger">You haven't been awarded to this job yet.</div>
										@else
											<div class="btn-group">
												<a class="btn btn-xs btn-primary" href="{{ route('contractor.job.timesheet') . '?i=' . $_hash->encode($job->id) }}">Timesheets</a>
												<a class="btn btn-xs btn-info" href="{{ route('contractor.job.expense') . '?i=' . $_hash->encode($job->id) }}">Expenses</a>
											</div>
										@endif
									</li>
								@endforeach
								</ul>
							@else
								<div class="alert alert-danger">
									You have not yet had a response to your application.
								</div>
							@endif
						</div>
					</div>
				</div>

				<div class="col-sm-4">
					<div class="panel panel-info">
						<div class="panel-heading">
							<i class="fa fa-bell"></i> Notifications
							<button class="btn btn-danger btn-xs pull-right" id="removeReadNotifBtn">Remove read notifications</button>
						</div>
						<?php $notifications = $contractor->notifications()->where('has_read', false)->orderBy('created_at', 'desc')->paginate(15); ?>
						<div class="panel-body @if (count($notifications) > 0) {{ 'no-padding' }} @endif">
							@if (count($notifications) > 0)
								<ul class="list-group" id="listNotif">
								@foreach ($notifications as $notification)
									<li class="list-group-item" data-id="{{ $notification->id }}">
										<a href="{{ $notification->url }}" target="_blank">
											<p>@if ( ! $notification->has_read) <label class="label label-danger">Unread</label> @endif {{ $notification->title }}</p>
											<p class="text-muted">
												<small><i class="fa fa-clock-o"></i> {{ $notification->created_at->diffForHumans() }}</small>
											</p>
										</a>
										<div class="btn-group">
											<button data-id="{{ $notification->id }}" class="btn btn-primary btn-xs btn-mark-notif">Mark as read</button>
										</div>
									</li>
								@endforeach
								</ul>
							@else
								<div class="alert alert-danger">No New Notifications</div>
							@endif
						</div>
						@if (count($notifications) > 0)
							<div class="panel-footer">
								{!! $notifications->render() !!}
							</div>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>

	<div id="job-search">
		<div class="container">
			<div class="job-search-wrapper">
				@include('front.include.jobSearchForm')
			</div>
		</div>
	</div>

	<div id="jobs-listing" class="element-bottom-30">
		<div class="container">
			<div class="jobs-listing-title">
				<h3 class="page-header">
					<i class="fa fa-briefcase"></i>
					Latest Job Listings
				</h3>
			</div>
			@include('front.include.jobListingWithoutSearch')
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop