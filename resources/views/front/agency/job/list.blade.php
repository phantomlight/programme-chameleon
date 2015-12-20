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
	My Jobs | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.agency.header')
	<div class="container">
		<div class="row element-top-50 element-bottom-50">
			<div class="col-sm-8">
				<div class="panel panel-default">
					<div class="panel-heading">My Jobs</div>
					<div class="panel-body">
						<?php $jobs = $agency->jobs()->orderBy('created_at', 'desc')->paginate(15); ?>
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
										</div>
									</li>
								@endforeach
							</ul>
						@else
							<div class="alert alert-danger">
								You do not have posted any jobs yet
							</div>
						@endif
					</div>

					@if (count($jobs) > 0)
					<div class="panel-footer">
						{!! $jobs->render() !!}
					</div>
					@endif
				</div>
			</div>

			<div class="col-sm-4">
				<a href="{{ route('agency.job.add') }}" class="btn btn-primary">Add Job</a>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop