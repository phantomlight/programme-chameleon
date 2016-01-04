<?php $user = \User::getUser(); ?>

@extends('back.app')

@section('title')
Account Settings | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg dashbard-1">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-lg-7">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Settings</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<form id="adminSettingsForm" data-parsley-validate onsubmit="return false;">
								<div class="form-group">
									<label>Email</label>
									<input name="email" type="email" class="form-control" placeholder="Email" value="{{ $user->email }}" />
								</div>

								<div class="form-group">
									<label>Password</label>
									<input name="password" type="password" class="form-control" placeholder="Password">
									<span class="help-block alert alert-info">Empty it if don't want to change password</span>
								</div>

								<div class="form-group">
									<button class="btn btn-white" type="cancel">Cancel</button>
									<button class="btn btn-primary" type="submit">
										<span class="btn-preloader">
											<i class="fa fa-spinner fa-spin"></i> saving...
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
@stop