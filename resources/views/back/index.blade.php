@extends('back.app')

@section('title')
Admin Dashboard | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="row">
				<div class="col-lg-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5><i class="fa fa-suitcase"></i> Jobs</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="row">
								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">10,000</a></h2>
									<br>
									Jobs Active
								</div>

								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">5,000</a></h2>
									<br>
									Jobs Still Available
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5><i class="fa fa-users"></i> Contractors</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="row">
								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">10,000</a></h2>
									<br>
									Contractors Registered
								</div>

								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">5,000</a></h2>
									<br>
									Contractors available for job
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5><i class="fa fa-user-md"></i> Other Users</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>
						<div class="ibox-content">
							<div class="row">
								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">5,000</a></h2>
									<br>
									Companies Registered
								</div>

								<div class="col-lg-6">
									<h2 class="font-bold"><a href="#">5,000</a></h2>
									<br>
									Agencies Registered
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