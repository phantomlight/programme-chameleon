<?php
use App\Utils\Hash;

if (\User::check()) {
	$user = \User::getUser();
	$agency = \Agency::getAgency();
}

$_hash = new Hash();
$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('title')
{{ $agency->name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.agency.header')
	<div class="container">
		<div class="row element-top-50 element-bottom-50">
			<div class="col-sm-8">
				<div class="panel panel-default">
					<div class="panel-heading">
						My Recent Jobs
						<div class="pull-right btn-group">
							<a href="{{ route('agency.job.list') }}" class="btn btn-xs btn-info">All My Jobs</a>
							<a href="{{ route('agency.job.add') }}" class="btn btn-xs btn-primary">Add a New Job</a>
						</div>
					</div>
					<div class="panel-body">
						<?php $jobs = $agency->jobs()->orderBy('created_at', 'desc')->take(5)->get(); ?>
						@if (count($jobs) > 0)
						<ul class="list-unstyled sc-list">
							@foreach ($jobs as $job)
							<li>
								<p>{{ $job->title }}</p>
								<p>Status: {!! $job->status === 'open' ? '<label class="label label-success">Open</label>' : '<label class="label label-warning">Taken</label>' !!}</p>
								<p class="time"><i class="fa fa-clock-o"></i> {{ $job->created_at->toDayDatetimeString() }}</p>
								<div class="btn-group">
									<a href="{{ route('agency.job.edit') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-warning">Edit</a>
									<a href="{{ route('agency.job.application') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-success">Applications ({{ $job->contractors()->wherePivot('status', 'request')->count() }})</a>
									<a href="{{ route('agency.job.detail') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-primary">Timesheets and Expenses</a>
								</div>
							</li>
							@endforeach
						</ul>
						@else
						<div class="alert alert-danger">
							You have not yet posted any jobs.
						</div>
						@endif
					</div>
				</div>
			</div>

			<div class="col-sm-4">
				<?php $notifications = $agency->notifications()->where('has_read', false)->orderBy('created_at', 'desc'); ?>
				<div class="panel panel-info">
					<div class="panel-heading">
						<label class="label label-danger">{{ $notifications->count() }}</label> <small>New Notifications</small>
						<div class="dropdown pull-right">
							<button id="nLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								More <span class="caret"></span>
							</button>
							<ul class="dropdown-menu" aria-labelledby="nLabel">
							<li><a href="{{ route('agency.allNotif') }}">See All</a></li>
								<li><a href="#" onclick="return false;" id="markReadBtn"> Mark all as read </a></li>
								<li><a href="#" onclick="return false;" id="removeReadNotifBtn"> Remove read notifications </a></li>
							</ul>
					</div>
					<div class="panel-body">
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
				</div>

				@include('front.agency.include.sidebarPayment')
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop