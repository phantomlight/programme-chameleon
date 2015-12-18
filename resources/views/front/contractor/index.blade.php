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
				<div class="col-md-8">
					<div class="panel panel-success">
						<div class="panel-heading">Current Job(s)</div>
						<?php $jobs = $contractor->jobs(); ?>
						<div class="panel-body">
							@if ($jobs->count() > 0)
								<?php $jobs = $jobs->orderBy('created_at', 'desc')->paginate(15); ?>
								<ul class="list-unstyled sc-list">		
								@foreach ($jobs as $job)
									<li>
										<p><span>{{ $job->title }}</span> accepted on {{ $job->created_at->toDayDateTimeString() }}</p>
										<div class="btn-group">
											<a class="btn btn-xs btn-primary" href="{{ route('contractor.job.timesheet') . '?i=' . $_hash->encode($job->id) }}">Timesheets</a>
											<a class="btn btn-xs btn-info" href="{{ route('contractor.job.expense') . '?i=' . $_hash->encode($job->id) }}">Expenses</a>
										</div>
									</li>
								@endforeach
								</ul>
							@else
								<div class="alert alert-danger">
									You haven't been accepted to any job yet.
								</div>
							@endif
						</div>
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