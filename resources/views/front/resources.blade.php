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

	$resources = \Site::getAllResources();
?>
	
@extends('front.app')

@section('title')
Free Resources | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div id="free-resources-container">
			<h2 class="page-header">Free Resources</h2>
			<div class="tab-resources">
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active">
						<a href="#res-initiation" aria-controls="res-initiation" role="tab" data-toggle="tab">Project Initiation</a>
					</li>
					<li role="presentation">
						<a href="#res-control" aria-controls="res-control" role="tab" data-toggle="tab">Project Control</a>
					</li>
					<li role="presentation">
						<a href="#res-closure" aria-controls="res-closure" role="tab" data-toggle="tab">Project Closure</a>
					</li>
					<li role="presentation">
						<a href="#res-other" aria-controls="res-other" role="tab" data-toggle="tab">Other</a>
					</li>
				</ul>

				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="res-initiation">
						<div class="element-top-30 element-bottom-10">
							<p>Initiation is the most important phase of any project as it sets the terms-of-reference within which the project will run. If this is not done well, the project will have a high likelihood of failure.</p>

							<p>The initiation phase is where the business case is declared, the scope of the project decided (what's in and what's out) and stakeholder expectations set.</p>

							<p>Time spent on planning, refining the business case and communicating the expected benefits will help increase the likelihood of success. It is tempting to start working quickly, but a poor initiation phase often leads to failure.</p>
						</div>
						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.initiation')
										<li>
											<div class="media">
												<div class="media-left">
													<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="{{ $resource->title }}" />
													<a class="btn btn-warning" href="{{ asset($resource->file) }}" download="download"><i class="fa fa-download"></i> Download</a>
												</div>

												<div class="media-body">
													<h4>{{ $resource->title }}</h4>
													{!! $resource->description !!}
												</div>
											</div>
										</li>
									@endif
								@endforeach
							@endif
						</ul>
					</div>

					<div role="tabpanel" class="tab-pane" id="res-control">
						<div class="element-top-30 element-bottom-10">
							<p>Once a project is running, it is important the project manager keeps control. This is achieved by regular reporting of issues, risks, progress and constant checking of the business case to make sure that the expected benefits will be delivered and are still valid. All proposed changes should be assessed, logged, and appropriate action taken.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.control')
										<li>
											<div class="media">
												<div class="media-left">
													<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="{{ $resource->title }}" />
													<a class="btn btn-warning" href="{{ asset($resource->file) }}" download="download"><i class="fa fa-download"></i> Download</a>
												</div>

												<div class="media-body">
													<h4>{{ $resource->title }}</h4>
													{!! $resource->description !!}
												</div>
											</div>
										</li>
									@endif
								@endforeach
							@endif
						</ul>
					</div>

					<div role="tabpanel" class="tab-pane" id="res-closure">
						<div class="element-top-30 element-bottom-10">
							<p>Often neglected, it is important to make sure a project is closed properly. Many projects do not have a clear endpoint because there is no formal sign-off. It is important to get the customers' agreement that the project has ended, and no more work will be carried out. Once closed, the project manager should review the project and record the good and bad points, so that in the future, successes can be repeated, and failures avoided.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.closure')
										<li>
											<div class="media">
												<div class="media-left">
													<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="{{ $resource->title }}" />
													<a class="btn btn-warning" href="{{ asset($resource->file) }}" download="download"><i class="fa fa-download"></i> Download</a>
												</div>

												<div class="media-body">
													<h4>{{ $resource->title }}</h4>
													{!! $resource->description !!}
												</div>
											</div>
										</li>
									@endif
								@endforeach
							@endif
						</ul>	
					</div>

					<div role="tabpanel" class="tab-pane" id="res-other">
						<div class="element-top-30 element-bottom-10">
							<p>Most managers will find these templates useful in their daily work.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.other')
										<li>
											<div class="media">
												<div class="media-left">
													<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="{{ $resource->title }}" />
													<a class="btn btn-warning" href="{{ asset($resource->file) }}" download="download"><i class="fa fa-download"></i> Download</a>
												</div>

												<div class="media-body">
													<h4>{{ $resource->title }}</h4>
													{!! $resource->description !!}
												</div>
											</div>
										</li>
									@endif
								@endforeach
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