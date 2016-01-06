<?php
use App\Utils\Hash;

if (\User::check()) {
	$user = \User::getUser();
	$company = \Company::getCompany();
}

$_hash = new Hash();
$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('title')
{{ $company->name }}| Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div class="element-top-30">&nbsp;</div>
		<div class="col-sm-8">
			<div class="panel panel-default">
				<div class="panel-heading">Jobs</div>
				<div class="panel-body">
					<p>To share your job listing anywhere on your site, paste the code below:</p>
					<input type="text" value='<iframe src="{{ route("job.frame", ["id" => $_hash->encode($company->id), "type" => "company"]) }}" width="560" height="315" frameborder="0" allowfullscreen></iframe>' class="form-control" />
					<?php $jobs = $company->jobs()->orderBy('created_at', 'desc')->paginate(15); ?>
					@if (count($jobs) <= 0)
					<div class="alert alert-info">
						You have not yet posted any jobs. <a href="{{ route('company.job.post') }}">Set one up?</a>
					</div>
					@else
					<ul class="list-unstyled list-jobs">
						@foreach ($jobs as $job)
						<li>
							<p><strong>{{ $job->title }}</strong></p>
							@if ( ! $job->is_active)
							<div class="alert alert-danger">
								<p>JOB NOT ACTIVE.</p>
								<a href="#" class="lighten" onclick="return false;" data-toggle="tooltip" title="<p>This job has exceeded the activation duration (created on: {{ $job->created_at->toDateString() }}), it will not appear on the site, nor contractor can apply for it.</p><p>Click edit to extend the duration, or subscribe to a 6 month contract to re-active this your job.</p>" data-placement="top" data-html="true"><i class="fa fa-question-circle"></i> What does this mean?</a>
							</div>
							@endif
							@if ($job->duration !== '999')
							<?php
							if ($job->duration === '1') $endDate = $job->created_at->addDays(7);
							if ($job->duration === '2') $endDate = $job->created_at->addMonth();
							?>
							<p>Ends in: {{ $endDate->toDateString() }}</p>
							@endif
							<p>Status: {!! $job->status === 'open' ? '<label class="label label-success">Open</label>' : '<label class="label label-warning">Taken</label>' !!}</p>
							<p class="time"><i class="fa fa-clock-o"></i> {{ $job->created_at->toDayDatetimeString() }}</p>
							<div class="btn-group">
								<a href="{{ route('company.job.edit') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-warning">Edit</a>
								<a href="{{ route('company.job.application') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-success">Applications ({{ $job->contractors()->wherePivot('status', 'request')->count() }})</a>
								<a href="{{ route('company.job.detail') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-primary">Timesheets and Expenses</a>
							</div>
						</li>
						@endforeach
					</ul>
					@endif
				</div>
				@if (count($jobs) > 0)
				<div class="panel-footer">
					{!! $jobs->render() !!}
				</div>
				@endif
			</div>

			<div class="panel panel-default">
				<div class="panel-heading">Agency Affiliates</div>
				<div class="panel-body">
					<?php $agencies = $company->agencies()->orderBy('created_at', 'desc')->paginate(15); ?>
					@if (count($agencies) > 0)
					<ul class="list-unstyled sc-list" id="agencyAffiliateList">
						@foreach ($agencies as $agency)
						<li data-id="{{ $_hash->encode($agency->id) }}">
							<div class="media">
								<div class="media-left">
									@if (! is_null($agency->image))
									<img src="{{ asset($agency->image) }}" width="52" />
									@else
									<img data-src="holder.js/52x52?random=yes&text=no-image" />
									@endif
								</div>
							</div>
							<div class="media-body">
								<div class="media-heading">
									<h4>{{ $agency->name }}</h4>
								</div>
								<p>Owner: <strong>{{ $agency->owner_name }}</strong></p>
								<p>Status: <label class="label @if ($agency->pivot->status === 'accept') {{'label-success'}} @else {{'label-danger'}} @endif">{{ ucwords($agency->pivot->status) . 'ed' }}</label></p>
								<p class="text-muted"><i class="fa fa-clock-o"></i> {{ $agency->pivot->created_at->diffForHumans() }}</p>
								<div class="btn-group">
									@if ($agency->pivot->status === 'request')
									<button class="btn btn-xs btn-success" data-id="{{ $_hash->encode($agency->id) }}">
										<i class="fa fa-check"></i> Accept
									</button>
									@endif
									<button class="btn btn-xs btn-danger" data-id="{{ $_hash->encode($agency->id) }}">
										<i class="fa fa-remove"></i> Reject &amp; Remove
									</button>
								</div>
							</div>
						</li>
						@endforeach
					</ul>
					@else
					<div class="alert alert-danger">You don't have any agency affiliate yet.</div>
					@endif
				</div>
				@if (count($agencies) > 0)
				<div class="panel-footer">
					{!! $agencies->render() !!}
				</div>
				@endif
			</div>
		</div>

		<div class="col-sm-4">
			<?php $notifications = $company->notifications()->where('has_read', false)->orderBy('created_at', 'desc'); ?>
			<div class="panel panel-info">
				<div class="panel-heading">
					<label class="label label-danger">{{ $notifications->count() }}</label> <small>New Notifications</small>
					<div class="dropdown pull-right">
						<button id="nLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							More <span class="caret"></span>
						</button>
						<ul class="dropdown-menu" aria-labelledby="nLabel">
							<li><a href="{{ route('company.allNotif') }}">See All</a></li>
							<li><a href="#" onclick="return false;" id="markReadBtn"> Mark all as read </a></li>
							<li><a href="#" onclick="return false;" id="removeReadNotifBtn"> Remove read notifications </a></li>
						</ul>
					</div>
				</div>
				<div class="panel-body">
					<?php $notifications = $notifications->take(10)->get(); ?>
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
			@include('front.company.include.sidebarPayment')
		</div>
	</div>

	<div class="clearfix element-top-20 element-bottom-20">&nbsp;</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop