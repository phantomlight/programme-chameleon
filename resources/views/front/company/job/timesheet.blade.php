<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();
		$company = \Company::getCompany();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>
	
@extends('front.app')

@section('title')
{{ $job->title }}| Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<h1 class="page-header"> {{ $job->title }} - <small class="lighten">Timesheets Submitted</small> </h1>

		<div class="row">
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading">Contractors Applied</div>
					<div class="panel-body">
						<?php $timesheets = $job->timesheets(); ?>
						@if ($timesheets->count() > 0)
						<?php $timesheets = $timesheets->orderBy('created_at', 'desc')->paginate(15); ?>
						<ul class="timesheet-list list-unstyled">
							@foreach ($timesheets as $timesheet)
							<?php $contractor = $timesheet->contractor; ?>
							@if ($contractor && $cUser = $contractor->user)
							<?php $slug = Str::slug($cUser->first_name . ' ' . $cUser->last_name); ?>
							<li>
								<div class="media">
									<div class="media-left img-responsive">
										@if ( ! is_null($contractor->image))
										<img src="{{ asset($contractor->image) }}" width="52" />
										@else
										<img data-src="holder.js/52x52?random=yes&text=no-image" />
										@endif
										<section class="element-top-10">
											{{ $cUser->first_name . ' ' . $cUser->last_name . ' (' . $cUser->email . ')' }}
										</section>
									</div>

									<div class="media-body">
										<p>Type: {{ ucwords($timesheet->type) }}</p>
										<p>Submitted on: {{ $timesheet->created_at->toDayDateTimeString() }}</p>

										<div class="element-top-10 element-bottom-10">
										@if ($timesheet->type === 'file')
											<a href="{{ asset($timesheet->file) }}" class="btn btn-xs btn-primary" download="" target="_blank"> <i class="fa fa-download"></i> Download </a>
										@elseif ($timesheet->type === 'data')
											<p>Expected Time Range: {{ $timesheet->start_date }} - {{ $timesheet->end_date }}</p>
											<p>Hours of Working: {{ $timesheet->hours }}</p>
											<p>Reporting: {{ $timesheet->report }}</p>
										@endif
										</div>

										<div class="btn-group">
											<a href="{{ route('contractor.profile', ['id'=>$_hash->encode($contractor->id), 'slug'=>$slug]) }}" class="btn btn-primary" target="_blank">See contractor details</a>
											<a href="#" class="btn btn-success"><i class="fa fa-check"></i>Give Job</a>
										</div>
									</div>
								</div>
							</li>
							@else
							<li>
								<div class="alert alert-danger">This timesheet exists, but without data from the contractor.</div>
							</li>
							@endif
							@endforeach
						</ul>

						<div class="sc-pagination">
							{!! $timesheets->render() !!}
						</div>
						@else
							<div class="alert alert-danger">
								There are no contractors applied for this job yet.
							</div>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop