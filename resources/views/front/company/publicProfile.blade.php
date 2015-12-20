<?php
	use App\Utils\Hash;

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
{{ $model->name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div class="container">
			<h1 class="page-header">Company Profile</h1>
			<div id="company-header">
				<div id="company-main-logo">
					<a href="#">
						@if (is_null($model->image))
							<img data-src="holder.js/191x58?random=yes&text=no-image" alt="{{ $model->name }}" />
						@else
							<img src="{{ asset($model->image) }}" alt="{{ $model->name }}" width="191" />
						@endif
					</a>
				</div>
			</div>
			<div id="company-head-menu">
				<?php $socials = json_decode($model->socials); ?>
				<ul class="company-head-menu first-menu">
					@if (isset($socials->url))
						<li class="i-web"><i class="fa fa-link"></i> {{ $socials->url }}</li>
					@endif
					@if (isset($socials->twitter))
						<li class="i-twitter"><i class="fa fa-twitter"></i> {{ $socials->twitter }}</li>
					@endif
					@if (isset($socials->facebook))
						<li class="i-facebook"><i class="fa fa-facebook"></i> {{ $socials->facebook }}</li>
					@endif
					@if (isset($socials->google))
						<li class="i-googleplus"><i class="fa fa-google-plus"></i> {{ $socials->google }}</li>
					@endif
				</ul>
				<ul class="company-head-menu second-menu">
					<li class="i-bar"><a href="#jobs"><i class="fa fa-list"></i> Our Jobs</a></li>
				</ul>
			</div>
			<div class="row about-company-content">
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">Overview</h2>
					<article>
					@if ( ! is_null($model->overview))
						{{ $model->overview }}
					@else
						<p>Hi, we are a company that just joined Programme Chameleon. We haven't provide any details yet. Please come back later to check our job openings. Thank you.</p>
					@endif
					</article>
				</div>
				<div class="col-md-6">
					<h2 class="sub-section-title uppercase">About Us</h2>
					<article>
						@if ( ! is_null($model->description))
						{{ $model->description }}
					@else
						<p>Hi, we are a company that just joined Programme Chameleon. We haven't provide any details yet. Please come back later to check our job openings. Thank you.</p>
					@endif
					</article>
				</div>
			</div>
		</div>
	</div>

	<div id="company_experience">
		<div class="container">
			<h1 class="uppercase page-header">Expertise</h1>
			<?php $industries = json_decode($model->industry); ?>
			@if (count($industries) > 0)
			<div class="section-subtitle">This company mainly focus on these industries: </div>
			<ul class="company_experience_group">
				@foreach ($industries as $industry)
				<li>{{ $industry }}</li>
				@endforeach
			</ul>
			@else
			<div class="section-subtitle">We haven't had any specialization yet, we accept any talent for the moment.</div>
			@endif
		</div>
	</div>

	@include('front.company.job.relatedJobListings')
	<div class="element-bottom-30">&nbsp;</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop