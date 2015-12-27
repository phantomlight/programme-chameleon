<?php
	use App\Utils\Hash;
	use Carbon\Carbon;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();
		$agency = \Agency::getAgency();
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
	<div class="container element-bottom-50">
		<div class="row element-bottom-30">
			<div class="col-md-6">
				<h3 class="page-header">Timesheets</h3>
				<div class="panel panel-default">
					<div class="panel-heading">
						<form action="" role="form">
							<input type="hidden" name="i" value="{{ \Input::get('i') }}" />
							<div class="row form-group">
								<div class="col-sm-4">
									<input type="text" class="form-control" name="filter_query" placeholder="timesheet name" />
								</div>

								<div class="col-sm-3">
									<select class="form-control" name="filter_month">
										<option value="all">All</option>
										<option value="today">Last 24 hours</option>
										<option value="month">This Month</option>
									</select>
								</div>

								<div class="col-sm-3">
									<select class="form-control" name="filter_sort">
										<option value="asc">Earliest</option>
										<option value="desc" selected="">Most Recent</option>
									</select>
								</div>

								<div class="col-sm-2">
									<button type="submit" class="btn btn-primary" name="searchBy" value="timesheet">Filter</button>
								</div>
							</div>
						</form>
					</div>
					<div class="panel-body">
						<?php
							if (\Input::get('searchBy') === 'timesheet') {
								$timesheets = $job->timesheets();

								if (\Input::get('filter_query') !== '') {
									$timesheets = $timesheets->where('name', 'like', '%' . trim(\Input::get('filter_query')) . '%');
								}

								if (\Input::get('filter_month') !== 'all') {
									if (\Input::get('filter_month') === 'today') {
										$timesheets = $timesheets->whereDay('created_at', '=', date('d'));
									}

									if (\Input::get('filter_month') === 'month') {
										$timesheets = $timesheets->whereMonth('created_at', '=', date('m'));
									}
								}

								$timesheets = $timesheets->orderBy('created_at', \Input::get('filter_sort'))->paginate(15);
							}
							else {
								$timesheets = $job->timesheets()->orderBy('created_at', 'desc')->paginate(15);
							}
						?>
						@if (count($timesheets) > 0)
							<ul class="list-unstyled sc-list">
								@foreach ($timesheets as $timesheet)
									<?php $contractor = $timesheet->contractor; ?>
									<li>
										<div class="media">
											<div class="media-left">
												<p class="text-muted">
													<small><i>{{ $timesheet->created_at->diffForHumans() }}</i></small>
												</p>
												@if ($contractor && $cUser = $contractor->user)
													<p><small>Submitted by: {{ $cUser->first_name . ' ' . $cUser->last_name }}</small></p>
												@endif
											</div>
											<div class="media-body">
												<p>{{ $timesheet->name }}</p>
												@if ($timesheet->type === 'file')
													<a class="btn btn-success btn-lg" target="_blank" href="{{ asset($timesheet->file) }}" download>
														<i class="fa fa-download"></i> Download
													</a>
												@else
													<p>Report: <strong>{{ ucwords($timesheet->report) }}</strong></p>
													@if ($timesheet->report_time === 'daily')
													<p>Num of working hours: <strong>{{ $timesheet->hours }} hour(s)</strong></p>
													@else
													<p>Num of working days: <strong>{{ $timesheet->hours }} day(s)</strong></p>
													@endif
													<p>Effective start date: {{ $timesheet->start_date }}</p>
													<p>Expected finish date: {{ $timesheet->end_date }}</p>
												@endif

												@if ($timesheet->auth_company && ! $timesheet->auth_agency)
													<button class="btn btn-success btn-accept-ts" type="button" data-id="{{ $_hash->encode($timesheet->id) }}">Accept</button>
												@elseif ($timesheet->auth_agency)
													<button class="btn btn-danger btn-remove-ts" type="button" data-id="{{ $_hash->encode($timesheet->id) }}">Reject</button>
												@else
													<div class="alert alert-danger">Need to be authorised by company first.</div>
												@endif
											</div>
										</div>
									</li>
								@endforeach
							</ul>
						@endif
					</div>
					@if (count($timesheets) > 0)
						<div class="panel-footer">
							@if (\Input::get('searchBy') === 'timesheet')
								{!! $timesheets->appends(\Input::all())->render() !!}
							@else
								{!! $timesheets->render() !!}
							@endif
						</div>
					@endif
				</div>
			</div>

			<div class="col-md-6">
				<h3 class="page-header">Expenses</h3>
				<div class="panel panel-default">
					<div class="panel-heading">
						<form action="" role="form">
							<input type="hidden" name="i" value="{{ \Input::get('i') }}" />
							<div class="row form-group">
								<div class="col-sm-4">
									<input type="text" class="form-control" name="filter_query" placeholder="expense name" />
								</div>

								<div class="col-sm-3">
									<select class="form-control" name="filter_month">
										<option value="all">All</option>
										<option value="today">Last 24 hours</option>
										<option value="month">This Month</option>
									</select>
								</div>

								<div class="col-sm-3">
									<select class="form-control" name="filter_sort">
										<option value="asc">Earliest</option>
										<option value="desc" selected="">Most Recent</option>
									</select>
								</div>

								<div class="col-sm-2">
									<button type="submit" class="btn btn-primary" name="searchBy" value="expense">Filter</button>
								</div>
							</div>
						</form>
					</div>
					<div class="panel-body">
						<?php
							if (\Input::get('searchBy') === 'expense') {
								$expenses = $job->expenses();

								if (\Input::get('filter_query') !== '') {
									$expenses =$expenses->where('title', 'like', '%' . trim(\Input::get('filter_query')) . '%');
								}

								if (\Input::get('filter_month') !== 'all') {
									if (\Input::get('filter_month') === 'today') {
										$expenses = $expenses->whereDay('created_at', '=', date('d'));
									}

									if (\Input::get('filter_month') === 'month') {
										$expenses = $expenses->whereMonth('created_at', '=', date('m'));
									}
								}

								$expenses = $expenses->orderBy('created_at', \Input::get('filter_sort'))->paginate(15);
							}
							else {
								$expenses = $job->expenses()->orderBy('created_at', 'desc')->paginate(15);
							}
						?>
						@if (count($expenses) > 0)
							<ul class="list-unstyled sc-list">
								@foreach ($expenses as $expense)
									<?php $contractor = $expense->contractor; ?>
									<li>
										<div class="media">
											<div class="media-left">
												<p class="text-muted">
													<small><i>{{ $expense->created_at->diffForHumans() }}</i></small>
												</p>
												@if ($contractor && $cUser = $contractor->user)
													<p><small>Submitted by: {{ $cUser->first_name . ' ' . $cUser->last_name }}</small></p>
												@endif
											</div>
											<div class="media-body">
												<p>{{ $expense->title }}</p>
												<p>Type: <strong>{{ ucwords($expense->type) }}</strong></p>
												<p>Amount: <strong><i class="fa fa-gbp"></i> {{ number_format($expense->amount, 0) }}</strong></p>
												<p>Description: <strong>{{ $expense->description }}</strong></p>
												@if ( ! is_null($expense->file) )
													<p class="text-muted"><small>A file was attached, click button below to download.</small></p>
													<a class="btn btn-xs btn-primary" target="_blank" download href="{{ asset($expense->file) }}">
														<i class="fa fa-download"></i> Download
													</a>
												@endif

												<div class="element-top-10">&nbsp;</div>
												
												@if ($expense->auth_company && ! $expense->auth_agency)
													<button class="btn btn-success btn-accept-ex" type="button" data-id="{{ $_hash->encode($expense->id) }}">Accept</button>
												@elseif ($expense->auth_agency)
													<button class="btn btn-danger btn-remove-ex" type="button" data-id="{{ $_hash->encode($expense->id) }}">Reject</button>
												@else
													<div class="alert alert-danger">Needs to be authorised by company first.</div>
												@endif
											</div>
										</div>
									</li>
								@endforeach
							</ul>
						@endif
					</div>

					@if (count($expenses) > 0)
						<div class="panel-footer">
							@if (\Input::get('searchBy') === 'expense')
								{!! $expenses->appends(\Input::all())->render() !!}
							@else
								{!! $expenses->render() !!}
							@endif
						</div>
					@endif
				</div>
			</div>
		</div>

		<div class="row">
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
					<?php $contractors = $job->contractors()->wherePivot('status', '=', 'accepted')->get(); ?>
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

			<div class="col-sm-8">
				<div class="panel panel-default">
					<div class="panel-heading">{{ $job->title }}</div>
					<div class="panel-body">
						{!! $job->description !!}
						<p class="text-muted">
							<i class="fa fa-clock-o"></i> Created {{ $job->created_at->diffForHumans() }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop