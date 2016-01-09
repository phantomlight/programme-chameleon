<?php
	$user = \User::getUser();
?>

@extends('back.app')

@section('title')
News Letter | Programme Chameleon
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
						<div class="ibox-title">News Letter</div>
						<div class="ibox-content">
							<form id="nlForm" role="form" onsubmit="return false;">
								<div class="form-group">
									<label>Email Subject</label>
									<input type="text" required class="form-control" name="subject" />
								</div>

								<div class="form-group">
									<label>Email Content</label>
									<div class="summernote"></div>
								</div>

								<button type="submit" class="btn btn-primary">
									<span class="btn-preloader">
										<i class="fa fa-spinner fa-spin"></i> creating..
									</span>
									<span>Create</span>
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop