<?php
	if (\User::check()) $user = \User::getUser();
	$cUser = $contractor->user;
	$resume = $contractor->resume;
?>
	
@extends('front.app')

@section('title')
{{ $cUser->first_name . ' ' . $cUser->last_name }} | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<h1 class="frontend-title"></h1>
				</div>
				<div class="col-sm-8">
					<div class="candidate-button">
						<form role="form" onsubmit="return false;">
							@if ($resume)
							<a class="btn btn-primary" href="{{ $resume->file }}" target="_blank" download="">Download Resume</a>
							@endif
						</form>
					</div>
				</div>
			</div>

			<div class="candidate-profile">
				<div class="img-responsive">
					@if (is_null($contractor->image))
						<img data-src="holder.js/52x52?random=yes" class="resume-img" />
					@else
						<img src="{{ asset($contractor->image) }}" class="resume-img"  width="52" />
					@endif
				</div>
				<h2 class="resume-name">{{ $cUser->first_name . ' ' . $cUser->last_name }}</h2>
				<div class="candidate-details">
					<span>{{ $contractor->occupation }}</span>
					<span>
						<i class="fa fa-map-marker"></i>
						{{ (is_null($contractor->city) ? '--no specified city-' : $contractor->city) . ', ' . (is_null($contractor->country) ? '--no specified country--' : $contractor->country) }}
					</span>
					<span> Member from {{ $contractor->created_at->diffForHumans() }} </span>
					<?php $socials = json_decode($contractor->socials); ?>
					@if (isset($socials->twitter))
						<span>
							<i class="fa fa-twitter"></i>  {{ $socials->twitter }}
						</span>
					@endif
					@if (isset($socials->linkedin))
						<span>
							<i class="fa fa-linkedin"></i>  {{ $socials->linkedin }}
						</span>
					@endif
					@if (isset($socials->facebook))
						<span>
							<i class="fa fa-facebook"></i>  {{ $socials->facebook }}
						</span>
					@endif
				</div>
			</div>
		</div>
	</div>

	<div id="content" class="element-top-30 element-bottom-30">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					@if (!is_null($contractor->description))
						{!! $contractor->description !!}
					@else
						<p>Hi there, I am a new member of Programme Chameleon. I hope we can work together.</p>
					@endif
				</div>
				<div class="col-md-6">
					<div class="skills-container">
						<h3 class="skills-title">Skills</h3>
						<?php $skills = explode(',', $contractor->skills); ?>
						<div class="the-skills">
							@if (count($skills) > 1)
								@foreach ($skills as $skill)
									<span class="skill-item"> {{ $skill }} </span>
								@endforeach
							@else
								<div class="alert alert-info">No skill specified</div>
							@endif
						</div>
					</div>
					<div class="education-container">
						<h3 class="educations-title">Education</h3>
						<?php $educations = json_decode($contractor->educations); ?>
						<ul class="resume-lists">
							@if ($educations)
								@foreach ($educations as $education)
									<li>
										<div class="education-name"><strong>{{ $education->name }}</strong></div>
										{{-- <span class="education-period"><i class="fa fa-fw fa-calendar"></i>&nbsp;Test Education&nbsp;:&nbsp;</span> --}}
										<span class="education-study-field">{{ $education->type }}</span><br>
										<span class="education-grade"><i class="fa fa-fw fa-star"></i>&nbsp;Grade / GPA&nbsp;:&nbsp;{{ $education->gpa }}</span><br>
										<span class="education-qualification"><i class="fa fa-fw fa-check"></i>&nbsp;{{ $education->qualification }}</span>
									</li>
								@endforeach
							@else
								<li>No educations specified</li>
							@endif
						</ul>
					</div>
					<div class="experience-container">
						<h3 class="educations-title">Experience</h3>
						<ul class="resume-lists">
							<?php $experiences = json_decode($contractor->experiences); ?>
							@if ($experiences)
								@foreach ($experiences as $experience)
									<li>
										<div class="education-name"><strong>{{ $experience->company }}</strong></div>
										<span class="education-period"><i class="fa fa-fw fa-calendar"></i>&nbsp;{{ $experience->year }}&nbsp;:&nbsp;</span>
										<span class="education-study-field">{{ $experience->position }}</span><br>
										<span class="education-grade"><i class="fa fa-usd fa-fw"></i>&nbsp;{{ number_format($experience->salary, 0) }}</span><br>
										<span class="education-qualification"><i class="fa fa-fw fa-check"></i>&nbsp;Job Duties&nbsp;:&nbsp;</span>
										<div class="experience-job">
											{{ $experience->description }}
										</div>
									</li>
								@endforeach
							@else
								<li>No experience specified</li>
							@endif
						</ul>
					</div>

					<div class="experience-container">
						<h3 class="educations-title">URL(s)</h3>
						<ul class="resume-lists">
							<?php $urls = json_decode($contractor->urls); ?>
							@if ($urls)
								@foreach ($urls as $url)
									<li>
										<div class="education-name"><strong>{{ $url->name }}</strong></div>
										<span class="education-period"><i class="fa fa-fw fa-link"></i>&nbsp;<a href="{{ $url->address }}" target="_blank">{{ $url->address }}</a></span>
									</li>
								@endforeach
							@else
								<li>No links specified</li>
							@endif
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop