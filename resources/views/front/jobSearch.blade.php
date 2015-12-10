<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();

		if ($user->hasAccess('contractor')) {
			$contractor = \Contractor::getContractor();
		}
		elseif ($user->hasAccess('company')) {
			$company = \Company::getCompany();
		}
		elseif ($user->hasAccess('agency')) {
			$agency = \Agency::getAgency();
		}
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('title')
Job Search | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div id="job-search">
			<div class="container">
				<div class="job-search-wrapper">
					@include('front.include.jobSearchForm')
				</div>
			</div>
		</div>

		<div id="jobs-listing" class="element-top-30">
			<div class="container">
				<div class="jobs-listing-title">
					<h3 class="lighten page-header no-margin">Search Result</h3>
				</div>
				<div class="jobs-listing-wrapper">
					<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="job-listing-tabs">
						<ul>
							<li><a href="#all_jobs">Search Result</a></li>
						</ul>

						<div id="all_jobs">
							<div class="job-listing-list">
								<div class="row">
									<div class="col-sm-2 col-xs-12 the-list">
										<?php $jobs = \Job::searchJob(\Input::all()); $jobs = $jobs->paginate(15); ?>
										@if ($jobs->count() > 0)
										<ul class="list-unstyled hidden-xs" role="tablist">
											@foreach ($jobs as $index => $job)
											<li role="presentation" @if ($index === 0) {{ 'active' }} @endif><a href="#job-{{ $job->id }}" aria-controls="job-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
											@endforeach
										</ul>

										<ul class="list-unstyled hidden-md hidden-lg hidden-sm" role="tablist">
											@foreach ($jobs as $job)
											<li><a href="#job-{{ $job->id }}" aria-controls="job-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
											@endforeach
										</ul>
										@else
										<div class="alert alert-info">There's no job in this category.</div>
										@endif
									</div>

									<div class="tab-content job-info col-sm-8 col-xs-12">
										@foreach ($jobs as $index=>$job)
										<div role="tabpanel" class="tab-pane @if ($index === 0) {{ 'active' }} @endif" id="job-{{ $job->id }}">
											<div class="job-info-top">
												<h2>{{ $job->title }}</h2>
												<div>
													<span class="job-type">
														<i class="fa fa-fw fa-user"></i> {{ ucwords($job->type) }}
													</span>
													<span class="job-city-name">
														<i class="fa fa-fw fa-map-marker"></i> {{ $job->city . ', ' . $job->country }}
													</span>
													<span class="job-posted-time">
														posted {{ $job->created_at->diffForHumans() }}
													</span>
												</div>
											</div>

											<div class="job-info-bottom">
												<span>Location: {{ $job->city . ', ' . $job->country }}</span>
												<span>Salary: <i class="fa fa-gbp"></i> {{ number_format($job->salary, 0) . ' (' . $job->salary_type . ')' }}</span>
												<span>Start Date: {{ $job->start_date }}</span>
												<span>Contact: {{ $job->contact_name . ' (' . $job->contact_phone . ')' }}</span>
												<?php $details = json_decode($job->job_apply_details); ?>
												@if ($details->type === 'email')
												<span>Direct Email: {{ $details->direct_email }}</span>
												<span>Application Email: {{ $details->application_email }}</span>
												@elseif ($details->type === 'url')
												<span>Application Link: {{ $details->url }}</span>
												@endif
											</div>

											<div class="btn-group">
												<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" class="btn btn-warning">See Job Details</a>
												<a href="{{ route('contractor.apply', ['id' => $_hash->encode($job->id)]) }}" class="btn btn-primary" target="_blank">Apply</a>
											</div>
										</div>
										@endforeach
									</div>
								</div>

								<div class="sc-pagination text-center">
									{!! $jobs->appends(\Input::all())->render() !!}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	if (location.search !== '') {
		var pos = document.getElementById('jobs-listing').getBoundingClientRect();
		window.scrollTo(0, pos.top/5);
	}
</script>

@include('front.include.footer-query')
@include('front.include.footer')
@stop