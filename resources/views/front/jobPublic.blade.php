<?php
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

	$jobCompany = $job->company;
	$industries = $job->industries()->get();
?>
	
@extends('front.app')

@section('title')
{{ ucwords($job->title) }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div id="job-detail">
			<div class="container">
				<h1 class="job-detail-title">
					{{ $job->title }}
				</h1>
				<button class="btn btn-primary" data-toggle="modal" data-target="#apply-job-modal">Apply</button>
				<div class="company-job-detail clearfix">
					@if ($jobCompany)
						<div class="company-logo">
							@if (is_null($jobCompany->image))
								<a href="#"><img data-src="holder.js/160x54?random=yes&text=no-image" alt="{{ $jobCompany->name }}" width="160"></a>
							@else
								<a href="#"><img src="{{ asset($jobCompany->image) }}" alt="{{ $jobCompany->name }}" width="160"></a>
							@endif
						</div>
						<div class="company-details">
							<?php $socials = json_decode($jobCompany->socials); ?>
							<span class="company-website">
								<i class="fa fa-fw fa-chain"></i>
								{{ isset($socials->url) ? $socials->url : '' }}
							</span>
							<span class="company-twitter">
								<i class="fa fa-fw fa-twitter"></i>
								{{ isset($socials->twitter) ? $socials->twitter : '' }}
							</span>
							<span class="company-facebook">
								<i class="fa fa-fw fa-facebook"></i>
								{{ isset($socials->facebook) ? $socials->facebook : '' }}
							</span>
							<span class="company-google-plus">
								<i class="fa fa-fw fa-google-plus"></i>
								{{ isset($socials->google) ? $socials->google : '' }}
							</span>
						</div>
					@endif
				</div>

				<div class="the-job-details clearfix">
					<div class="the-job-title">
						<h3>{{ $job->title }}</h3>
					</div>
					@if ($jobCompany)
						<div class="the-job-company">{{ $jobCompany->name }}</div>
					@endif
					<div class="the-job-location">
						<i class="fa fa-fw fa-map-marker"></i> {{ $job->country . ' (' . $job->city . ')' }}
					</div>
					<div class="the-job-type">
						<i class="fa fa-fw fa-user"></i> {{ $job->type }}
					</div>
					<div class="the-job-button"></div>
				</div>

				<div class="the-job-aditional-details">
					<span class="the-job-aditional-title job-cat-links">Category : 
						@if ($industries)
							@foreach ($industries as $industry)
								{{ $industry->title . ', ' }}
							@endforeach
						@endif
					</span>

					<span class="the-job-aditional-title">
						Salary : <i class="fa fa-gbp"></i> {{ number_format($job->salary, 0) . ' (' . $job->salary_type . ')' }}
					</span>
					<span class="the-job-additional-title">Experience(s) : {{ $job->experience_year }}&nbsp;Year</span>
				</div>

				@if ($jobCompany)
				<div id="job-description" class="row">
					<div class="col-md-6">
						<article>
							<h1>Overview</h1>
							<p>
								{{ $job->description }}
							</p>
						</article>
					</div>
					<div class="col-md-6">
						<article>
							<h1>About&nbsp;{{ $jobCompany->name }}</h1>
							<p>
								{{ $jobCompany->about }}
							</p>
						</article>
					</div>
				</div>
				@endif
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop