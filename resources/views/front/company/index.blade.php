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
					<?php $jobs = $company->jobs()->orderBy('created_at', 'desc')->get(); ?>
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
								<a href="{{ route('company.job.edit') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-warning">Edit</a>
								<a href="{{ route('company.job.application') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-success">Applications ({{ $job->contractors()->wherePivot('status', 'request')->count() }})</a>
								<a href="{{ route('company.job.detail') . '?i=' . $_hash->encode($job->id) }}" class="btn btn-primary">Timesheet and Expenses</a>
							</div>
						</li>
						@endforeach
					</ul>
					@endif
				</div>
			</div>

			<div class="panel panel-default">
				<div class="panel-heading">Agency Request</div>
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
								<p>Status: <strong>{{ ucwords($agency->pivot->status) }}</strong></p>
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
			@include('front.company.include.sidebarPayment')
		</div>
	</div>

	<div class="clearfix element-top-20 element-bottom-20">&nbsp;</div>
</div>

<div class="modal fade" id="whatis-contract-modal" tabindex="-1" role="dialog" aria-labelledby="whatisContractLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="whatisContractLabel">What is a 6 months contract?</h4>
			</div>
			<div class="modal-body">
				<h2>Programme Chameleon 6 Month Contract - Company</h2>
				<p>Companies Full Service</p>
				<p>Functionality:</p>
				<ul>
					<li>Receive electronic timesheets through Programme Chameleon.</li>
					<li>Submit vacancies on programme chameleon.
						Search for candidates.</li>
						<li>Companies have jobs page to show own jobs incorporated into their website.</li>
						<li>Unlimited Job posting.</li>
					</ul>
					<p>Charging:</p>
					<ul>
						<li>If hosting (i.e Jobs page on their site).
							6 Month contract minimum.</li>
							<li>£1800 for 6 Months – purchased by buying one off credit.</li>
							<li>Sell set up as free if sign up by March 2016.</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>

		@include('front.include.footer-query')
		@include('front.include.footer')
		@stop