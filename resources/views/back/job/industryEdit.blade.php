<?php $user = User::getUser(); ?>

@extends('back.app')

@section('title')
	{{ $model->title }} | Programme Chameleon
@stop

@section('content')
	<div id="wrapper">
		@include('back.include.sidebar')
		<div id="page-wrapper" class="gray-bg">
			@include('back.include.header')
			<div class="row wrapper border-bottom white-bg page-heading">
				<div class="col-lg-10">
					<h2>Edit Industry</h2>
					<ol class="breadcrumb">
						<li><a href="{{ route('admin.index') }}">Home</a></li>
						<li><a href="{{ route('admin.job.industry') }}">Industry List</a></li>
						<li class="active">
							<strong>{{ $model->title }}</strong>
						</li>
					</ol>
				</div>
				<div class="col-lg-2">&nbsp;</div>
			</div>

			<div class="wrapper wrapper-content animated fadeInRight">
				<div class="row">
					<div class="col-lg-7">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5>Edit Industry</h5>
								<div class="ibox-tools">
									<a class="collapse-link">
										<i class="fa fa-chevron-up"></i>
									</a>
								</div>
							</div>
							<div class="ibox-content">
								<div class="row">
									<div class="col-sm-12">
										<form role="form" data-parsley-validate onsubmit="return false;" class="form-action-edit">
											<input type="hidden" data-route data-reload="true" value="{{ route('admin.job.industry.postEdit') . '?i=' . $model->id }}">
											<div class="form-group">
												<label>Name</label>
												<input type="text" name="title" class="form-control" placeholder="Industry name" value="{{ $model->title }}" required>
											</div>

											<div class="form-group">
												<button class="btn btn-white" type="cancel">Cancel</button>
												<button class="btn btn-primary" type="submit">
													<span class="btn-preloader">
														<i class="fa fa-spinner fa-spin"></i>
													</span>
													<span>Save</span>
												</button>
											</div>
										</form>
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