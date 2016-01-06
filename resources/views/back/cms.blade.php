<?php
	$user = \User::getUser();
	$sites = \Site::getAllConfigs();
?>

@extends('back.app')

@section('title')
CMS | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-lg-12">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<ul class="nav nav-tabs" role="tablist">
								<li role="presentation">
									<a href="#services" aria-controls="services" role="tab" data-toggle="tab">Services</a>
								</li>
								<li role="presentation" class="active">
									<a href="#free-resources" aria-controls="free-resources" role="tab" data-toggle="tab">
										Free Resources
									</a>
								</li>
								<li role="presentation">
									<a href="#prices" aria-controls="free-resources" role="tab" data-toggle="tab">
										Prices
									</a>
								</li>
								<li role="presentation">
									<a href="#terms" aria-controls="free-resources" role="tab" data-toggle="tab">
										Terms &amp; About Us
									</a>
								</li>
							</ul>
						</div>

						<div class="ibox-content">
							<div class="tab-content">
								<div role="tabpanel" class="tab-pane" id="services">
									@if (count($sites) > 0)
										<ul id="listServices" class="list-group">
										@foreach ($sites as $site)
											@if ($site->key === 'service')
												<li data-id="{{ $site->id }}" class="list-group-item">
													<form role="form" onsubmit="return false;">
														<div class="form-group">
															<label>Title</label>
															<input class="form-control" required type="text" name="title" value="{{ $site->title }}">
														</div>

														<div class="form-gorup">
															<label>Description</label>
															<div class="summernote" data-id="description">{!! $site->description !!}</div>
														</div>

														<div class="form-group">
															<label>Image</label>
															<input type="file" class="service-image" data-id="{{ $site->id }}" data-current-image="{{ $site->file }}" />
															<br/>
															<p>Current Image:</p>
															<img src="{{ asset($site->file) }}" width="100" class="img-thumbnail" />
															<span class="help-block">If you need to change image just select a file and it will be uploaded automatically, no need to click update.</span>
														</div>

														<div class="btn-group">
															<button type="submit" class="btn btn-primary">
																<span class="btn-preloader">
																	<i class="fa fa-spinner fa-spin"></i> updating..
																</span>
																<span>Update</span>
															</button>
														</div>
													</form>
												</li>
											@endif
										@endforeach
										</ul>
									@endif
								</div>

								<div role="tabpanel" class="tab-pane active" id="free-resources">
									<div class="row">
										<div class="col-sm-8">
											<?php
												$resourceData = [];
												foreach ($sites as $site) {
													$key = explode('.', $site->key);
													if ($key[0] === 'resource') {
														array_push($resourceData, $site);
													}
												}
											?>
											@if (count($resourceData) > 0)
												<ul class="list-group" id="listResources">
													@foreach ($resourceData as $resource)
														<li class="list-group-item" data-id="{{ $resource->id }}">
															<form role="form" onsubmit="return false;">
																<div class="form-group">
																	<label>Title</label>
																	<input type="text" class="form-control" name="title" value="{{ $resource->title }}">
																</div>
																<div class="form-group">
																	<label>Type</label>
																	<select class="form-control" name="key">
																		<option value="initiation" @if ($resource->key === 'resource.initiation') {{ 'selected="selected"' }} @endif>Initiation</option>
																		<option value="control" @if ($resource->key === 'resource.control') {{ 'selected="selected"' }} @endif>Control</option>
																		<option value="closure" @if ($resource->key === 'resource.closure') {{ 'selected="selected"' }} @endif>Closure</option>
																		<option value="other" @if ($resource->key === 'resource.other') {{ 'selected="selected"' }} @endif>Other</option>
																	</select>
																</div>

																<div class="form-group">
																	<label>File</label>
																	<input type="file" data-id="{{ $resource->id }}">
																	<p>Current file: <a href="{{ asset($resource->file) }}" target="_blank" download="" class="btn btn-xs btn-primary"><i class="fa fa-download"></i> Download</a></p>
																	<span class="help-block">If you wish to change file just click on the browse button and select the file, no need to click update</span>
																</div>

																<div class="form-group">
																	<label>Description</label>
																	<div class="summernote">{!! $resource->description !!}</div>
																</div>

																<div class="btn-group">
																	<button class="btn btn-primary btn-edit" type="submit" data-id="{{ $resource->id }}">
																		<span class="btn-preloader">
																			<i class="fa fa-spinner fa-spin"></i> updating..
																		</span>
																		<span>Update</span>
																	</button>
																	<button class="btn btn-danger btn-remove" type="cancel" data-id="{{ $resource->id }}">
																		<span class="btn-preloader">
																			<i class="fa fa-spinner fa-spin"></i> removing..
																		</span>
																		<span>Remove Resource</span>
																	</button>
																</div>
															</form>
														</li>
													@endforeach
												</ul>
											@endif
										</div>

										<div class="col-sm-4">
											<form role="form" id="addResourceForm" onsubmit="return false;">
												<div class="form-group">
													<label>Title</label>
													<input type="text" name="title" class="form-control">
												</div>

												<div class="form-group">
													<label>Description</label>
													<div class="summernote"></div>
												</div>

												<div class="form-group">
													<label>Type</label>
													<select class="form-control" name="key">
														<option value="initiation">Initiation</option>
														<option value="control">Control</option>
														<option value="closure">Closure</option>
														<option value="other">Other</option>
													</select>
												</div>

												<div class="form-group">
													<label>File</label>
													<input type="file" />
												</div>

												<button class="btn btn-success" type="submit">
													<span class="btn-preloader">
														<i class="fa fa-spinner fa-spin"></i> adding..
													</span>
													<span>Add</span>
												</button>
											</form>
										</div>
									</div>	
								</div>

								<div role="tabpanel" class="tab-pane" id="prices">
									@if (count($sites) > 0)
										<ul class="list-group">
										@foreach ($sites as $site)
											@if ($site->key === 'price.vip' || $site->key === 'price.credit')
												<li class="list-group-item">
													<form class="priceForm" data-id="{{ $site->id }}" role="form" onsubmit="return false;">
														<div class="form-group">
															<label>{{ $site->title }}</label>
															<input type="number" name="value" required value="{{ $site->description }}" class="form-control">
														</div>

														<button class="btn btn-primary" type="submit">
															<span class="btn-preloader">
																<i class="fa fa-spinner fa-spin"></i> updating...
															</span>
															<span>Update</span>
														</button>
													</form>
												</li>
											@endif
										@endforeach
										</ul>
									@endif
								</div>

								<div role="tabpanel" class="tab-pane" id="terms">
									@if (count($sites) > 0)
										<ul class="list-group">
										@foreach ($sites as $site)
											@if ($site->key === 'terms' || $site->key === 'about')
												<li class="list-group-item">
													<form class="otherCmsForm" data-id="{{ $site->id }}" role="form" onsubmit="return false;">
														<div class="form-group">
															<label>{{ $site->title }}</label>
															<div class="summernote">{!! $site->description !!}</div>
														</div>

														<button class="btn btn-primary" type="submit">
															<span class="btn-preloader">
																<i class="fa fa-spinner fa-spin"></i> updating...
															</span>
															<span>Update</span>
														</button>
													</form>
												</li>
											@endif
										@endforeach
										</ul>
									@endif
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop