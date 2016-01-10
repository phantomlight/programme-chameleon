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
						<a href="#res-project" aria-controls="res-initiation" role="tab" data-toggle="tab">Project Management</a>
					</li>
					<li role="presentation">
						<a href="#res-programme" aria-controls="res-control" role="tab" data-toggle="tab">Programme Management</a>
					</li>
					<li role="presentation">
						<a href="#res-training" aria-controls="res-closure" role="tab" data-toggle="tab">Training Resources</a>
					</li>
					<li role="presentation">
						<a href="#res-other" aria-controls="res-other" role="tab" data-toggle="tab">Other</a>
					</li>
				</ul>

				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="res-project">
						<div class="element-top-30 element-bottom-10">
							<p>Please use these resources to help you run and report on your projects. You will see short description of each resource, and where and when these can be used.</p>
						</div>
						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.project')
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

					<div role="tabpanel" class="tab-pane" id="res-programme">
						<div class="element-top-30 element-bottom-10">
							<p>Please use these resources to help you run and report on your Programmes. You will see description of each resource, and where and when these can be used.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.programme')
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

					<div role="tabpanel" class="tab-pane" id="res-training">
						<div class="element-top-30 element-bottom-10">
							<p>Please see for links to resources to help you develop as a Programme or Project professional.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							@if (count($resources) > 0)
								@foreach ($resources as $resource)
									@if ($resource->key === 'resource.training')
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
							<p>Please see for a variety of useful resources.</p>
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