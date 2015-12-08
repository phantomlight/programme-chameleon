<?php
	if(\User::check()) $user = \User::getUser();
	$company = $job->company;
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
					@if ($company)
						<div class="company-logo">
							@if (is_null($company->image))
								<a href="#"><img data-src="holder.js/160x54?random=yes&text=no-image" alt="{{ $company->name }}" width="160"></a>
							@else
								<a href="#"><img src="{{ asset($company->image) }}" alt="{{ $company->name }}" width="160"></a>
							@endif
						</div>
						<div class="company-details">
							<?php $socials = json_decode($company->socials); ?>
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
					@if ($company)
						<div class="the-job-company">{{ $company->name }}</div>
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

				@if ($company)
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
							<h1>About&nbsp;{{ $company->name }}</h1>
							<p>
								{{ $company->about }}
							</p>
						</article>
					</div>
				</div>
				@endif
			</div>
		</div>
	</div>
</div>

<div id="apply-job-modal" class="modal fade" aria-hidden="true" role="dialog" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">Web Developer - Company 1</h4>
			</div>

			<div class="modal-body">
				<div class="alert alert-warning" role="alert">
					You need to signed in to apply the job. Click <a href="{{ \URL::to('login') }}">Here</a> to sign in.
				</div>
			</div>

			<div class="modal-footer"></div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop