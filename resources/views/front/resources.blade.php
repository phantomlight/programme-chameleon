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
							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Mandate</h4>
										<p>This simple document is used to provide a structured approach to proposing a project with its business case.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Project Definition Report</h4>
										<p>This document is used to provide an outline of the project and to allow an assessment to be made about whether the project should proceed.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Contract</h4>
										<p>This document is used to obtain agreement from the Project Sponsor and Budget Holder to start the project.</p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div role="tabpanel" class="tab-pane" id="res-control">
						<div class="element-top-30 element-bottom-10">
							<p>Once a project is running, it is important the project manager keeps control. This is achieved by regular reporting of issues, risks, progress and constant checking of the business case to make sure that the expected benefits will be delivered and are still valid. All proposed changes should be assessed, logged, and appropriate action taken.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Change Request Form</h4>
										<p>This document, in three parts, is used to propose, assess and approve changes.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Change Log</h4>
										<p>This document is used to record changes and change actions associated with a project.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Issues Log</h4>
										<p>This document is used to record issues and assign an owner, with a plan to resolve them.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Risk Log</h4>
										<p>This document is used to record and grade risks, with an associated action plan to minimise them.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Progress Report</h4>
										<p>This document is used to communicate progress on a regular basis to the stakeholders of a project.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Checkpoint Report</h4>
										<p>This document is used to provide a detailed report of progress to date. It lists all completed products, products to be completed during the next period, requested changes, issues and a summary budget and timescale position.</p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div role="tabpanel" class="tab-pane" id="res-closure">
						<div class="element-top-30 element-bottom-10">
							<p>Often neglected, it is important to make sure a project is closed properly. Many projects do not have a clear endpoint because there is no formal sign-off. It is important to get the customers' agreement that the project has ended, and no more work will be carried out. Once closed, the project manager should review the project and record the good and bad points, so that in the future, successes can be repeated, and failures avoided.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Project Closure Report</h4>
										<p>This document is used to communicate how well the project has performed against its original business case, project plan, budget, time-scale and tolerances.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Lessons Learned Report</h4>
										<p>This document is used to pass on any lessons learned that can be usefully applied to other projects.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Customer Acceptance Form</h4>
										<p>This document is used to obtain the customers' sign-off once the project is finished.</p>
									</div>
								</div>
							</li>
						</ul>	
					</div>

					<div role="tabpanel" class="tab-pane" id="res-other">
						<div class="element-top-30 element-bottom-10">
							<p>Most managers will find these templates useful in their daily work.</p>
						</div>

						<hr>

						<ul class="file-list list-unstyled element-top-10 element-bottom-20">
							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Project Status Scorecard</h4>
										<p>This document is used to report project status to the project board and other key stakeholders.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Budget Justification Template</h4>
										<p>This document is used to justify a formal request for budget.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Standards for a Statement of Requirements</h4>
										<p>This document defines a set of standards that should be used when creating a Statement of Requirements.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Functional Requirements Specification</h4>
										<p>This document is used in IT projects to define the functional requirements of a proposed system.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Technical Requirements Specification</h4>
										<p>This document is used in IT projects to define the technical requirements of a proposed system.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Stakeholder Management Plan</h4>
										<p>This document can be used to identify the project stakeholders, define an approach to communications and provide key project data.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Work Breakdown Structure (WBS)</h4>
										<p>This simple document is used to record the activities and tasks within a project.</p>
									</div>
								</div>
							</li>

							<li>
								<div class="media">
									<div class="media-left">
										<img src="{{ asset('assets/img/icon-form.png') }}" class="img-responsive" alt="Document Icon" />
										<button class="btn btn-warning"><i class="fa fa-download"></i> Download</button>
									</div>

									<div class="media-body">
										<h4>Funding Proposal</h4>
										<p>This document is used to request funds by providing a compelling case for the proposed project, clearly communicating its goals and objectives.</p>
									</div>
								</div>
							</li>
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