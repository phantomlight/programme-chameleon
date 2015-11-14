@extends('front.app')

@section('title')
	Company 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="container">
		<div id="company-home-tab" class="element-top-30">
			<div class="tab-header">
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active">
						<a href="#tab-dashboard" role="tab" data-toggle="tab" aria-controls="tab-dashboard">Dashboard</a>
					</li>
					<li role="presentation">
						<a href="#tab-job" role="tab" data-toggle="tab" aria-controls="tab-job">My Jobs (2)</a>
					</li>
					<li role="presentation">
						<a href="#tab-saved-agent" role="tab" data-toggle="tab" aria-controls="tab-saved-agent">Agent List (2)</a>
					</li>
					<li role="presentation">
						<a href="#tab-contact" role="tab" data-toggle="tab" aria-controls="tab-contact">Contact Programme Chameleon</a>
					</li>
				</ul>
			</div>

			<div class="tab-content">
				<div role="tabpanel" class="tab-pane fade in active" id="tab-dashboard">
					<div class="col-sm-4">
						<ul class="list-unstyled sc-list">
							<li>Jobs currently live: 0</li>
							<li>Jobs expiring within a week: 0</li>
							<li>Jobs expiring today: 0</li>
							<li>Last 24 hours application: 0</li>
						</ul>
					</div>

					<div class="col-sm-8">
						<h2>Job Credits: 10,000</h2>
						<a href="#">Buy more</a>
						<br>
						<a href="#" class="btn btn-primary element-top-30">See Saved Resumes</a>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="tab-job">
					<ul class="list-unstyled sc-list company-job-list">
						<li>
							<div class="pull-left">
								<a href="#">Job 1</a>
							</div>
							<div class="pull-right">
								<div class="row">
									<div class="col-sm-9">
										<label>Update Job Positions:</label>
										<select class="form-control">
											<option value="0">-- Job Status Selector --</option>
											<option value="open">Open</option>
											<option value="taken">Taken</option>
										</select>
									</div>

									<div class="col-sm-3">
										<a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i> Edit Info</a>
									</div>
								</div>
							</div>
						</li>
						<li>
							<div class="pull-left">
								<a href="#">Job 2</a>
							</div>
							<div class="pull-right company-job-actions">
								<div class="row">
									<div class="col-sm-9">
										<label>Update Job Positions:</label>
										<select class="form-control">
											<option value="0">-- Job Status Selector --</option>
											<option value="open">Open</option>
											<option value="taken">Taken</option>
										</select>
									</div>

									<div class="col-sm-3">
										<a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i> Edit Info</a>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="tab-saved-agent">
					<ul class="list-unstyled sc-list company-job-list">
						<li>
							<div class="pull-left">
								<a href="#">Agent 1</a>
							</div>
							<div class="pull-right">
								<div class="btn-group">
									<a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i> Edit Info </a>
									<a href="#" class="btn btn-xs btn-danger"><i class="fa fa-times"></i> Unsubscribe </a>
								</div>
							</div>
						</li>
						<li>
							<div class="pull-left">
								<a href="#">Agent 2</a>
							</div>
							<div class="pull-right">
								<div class="btn-group">
									<a href="#" class="btn btn-xs btn-warning"><i class="fa fa-pencil"></i> Edit Info </a>
									<a href="#" class="btn btn-xs btn-danger"><i class="fa fa-times"></i> Unsubscribe </a>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div role="tabpanel" class="tab-pane fade" id="tab-contact">
					<div class="col-sm-12 element-bottom-30">
						<h2 class="page-header">Need help with something?</h2>
						<p>Email us at info[at]programmechameleon.com, or call us at +62 111-1111</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="clearfix element-top-20 element-bottom-20">&nbsp;</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop