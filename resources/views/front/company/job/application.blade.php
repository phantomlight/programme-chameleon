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
		<h1 class="page-header"> {{ $job->title }} - <small class="lighten"> Contractors Applied</small> </h1>

		<div class="row">
			<div class="col-md-8">
				<div class="panel panel-default">
					<div class="panel-heading">Contractors Applied</div>
					<div class="panel-body">
						<?php $contractors = $job->contractors(); ?>
						@if ($contractors->count() > 0)
						<?php $contractors = $contractors->orderBy('created_at', 'desc')->paginate(15); ?>
						<ul class="timesheet-list list-unstyled" id="timesheetList">
							@foreach ($contractors as $contractor)
							<?php
							$cUser = $contractor->user;
							$slug = Str::slug($cUser->first_name . ' ' . $cUser->last_name);
							$status = $contractor->pivot->status;
							?>
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
										@if ($status === 'accept')
										<label class="label label-success">
											<i class="fa fa-check"></i> Applied to Job
										</label>
										@endif
									</div>

									<div class="media-body">
										<div class="btn-group">
											<a href="{{ route('contractor.profile', ['id'=>$_hash->encode($contractor->id), 'slug'=>$slug]) }}" class="btn btn-primary" target="_blank">See contractor details</a>
											@if ($status !== 'accept')
											<button type="button" data-value="{{ $_hash->encode($contractor->id) }}" data-job="{{ $_hash->encode($job->id) }}" class="btn btn-success btn-give-job" onclick="return false;"><i class="fa fa-check"></i>Award Job</button>
											@endif
										</div>
									</div>
								</div>
							</li>
							@endforeach
						</ul>

						<div class="sc-pagination">
							{!! $contractors->render() !!}
						</div>
						@else
						<div class="alert alert-danger">
							There are no contractors applied for this job yet.
						</div>
						@endif
					</div>
				</div>
			</div>

			<div class="col-md-4">
				@if ($job->status === 'open')
				<div class="panel panel-success">
				@else
				<div class="panel panel-danger">
				@endif
					<div class="panel-heading">Job Status</div>
					<div class="panel-body">
						<p>Job is currently: {{ $job->status }}</p>
						<form role="form">
							<select class="form-control" id="jobStatusChanger" data-job="{{ $_hash->encode($job->id) }}">
								<option value="open" @if ($job->status === 'open') {{ 'selected="selected"' }} @endif>Open</option>
								<option value="taken" @if ($job->status === 'taken') {{ 'selected="selected"' }} @endif>Close</option>
							</select>
						</form>
					</div>
					<div class="panel-footer">
						<button class="btn btn-danger" id="removeJobBtn" data-job="{{ $_hash->encode($job->id) }}">Remove this job</button>
					</div>
				</div>

				<div class="panel panel-default">
					<?php $contractors = $job->contractors()->wherePivot('status', '=', 'accept')->get(); ?>
					<div class="panel-heading">Contractors In This Job ({{ count($contractors) }})</div>
					<div class="panel-body">
						@if (count($contractors) > 0)
							<ul class="list-unstyled" id="jobContractorList" data-job="{{ $_hash->encode($job->id) }}">
								@foreach($contractors as $contractor)
									@if ($cUser = $contractor->user)
										<li>
											<div class="media">
												<div class="media-left">
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
													<div class="btn-group">
														<a href="{{ route('contractor.profile', ['id'=>$_hash->encode($contractor->id), 'slug'=>$slug]) }}" class="btn btn-primary btn-xs" target="_blank">See contractor details</a>
														<button class="btn btn-xs btn-danger btn-remove-contract" type="button" onclick="return false;" data-value="{{ $_hash->encode($contractor->id) }}">
															<i class="fa fa-times"></i> Cancel contract
														</button>
													</div>
												</div>
											</div>
										</li>
									@endif
								@endforeach
							</ul>
						@else
							<div class="alert alert-danger">
								There's no contractors being set for this job yet.
							</div>
						@endif
					</div>
				</div>
			</div>
		</div>
	</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop