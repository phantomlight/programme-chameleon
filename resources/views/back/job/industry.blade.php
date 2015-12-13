@extends('back.app')

@section('title')
Job Industry | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="border-bottom">
				<div class="row">
					<form role="form" class="ft-form" onsubmit="return false;" data-parsley-validate>
						<div class="col-sm-4">
							<div class="form-group">
								<label>Search for job industries</label>
								<div class="input-group">
									<input type="text" class="form-control" name="search" placeholder="Search Keyword" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-8">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Job Industry List</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
								<a class="dropdown-toggle" href="#" data-toggle="dropdown">
									<i class="fa fa-gear"></i>
								</a>
								<ul class="dropdown-menu" data-target="tableList" id="configTableMenu">
									<li>
										<a href="#" data-value="remove">Remove Checked</a>
									</li>
									<li>
										<a href="#" data-value="json">Export To JSON</a>
									</li>
									<li>
										<a href="#" data-value="xml">Export To XML</a>
									</li>
									<li>
										<a href="#" data-value="csv">Export To CSV</a>
									</li>
									<li>
										<a href="#" data-value="txt">Export To TXT</a>
									</li>
									<li>
										<a href="#" data-value="sql">Export To SQL</a>
									</li>
									<li>
										<a href="#" data-value="doc">Export To MS-WORD</a>
									</li>
									<li>
										<a href="#" data-value="excel">Export To MS-EXCEL</a>
									</li>
									<li>
										<a href="#" data-value="powerpoint">Export To MS-POWERPOINT</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="ibox-content">
							<div class="row">
								<div class="col-sm-12">
									<table data-route="{{ route('admin.job.industry.list') }}" data-remove-link="{{ route('admin.job.industry.remove') }}" class="footable footable-init toggle-arrow-tiny table table-stripped" data-page-size="10" data-paging="true" id="tableList">
										<thead>
											<tr>
												<th data-id="id" data-sort="0" data-sort-ignore="true">
													<input type="checkbox" class="check-all">
												</th>
												<th data-id="title" data-sort="1">
													Name
												</th>
												<th data-id="jobs_count" data-sort="2" data-sort-ignore="true">Jobs Count</th>
												<th data-id="created_at" data-sort="3" data-hide="all" data-sort-ignore="true">Created At</th>
												<th data-sort-ignore="true" data-sort="4" data-id="actions">
													Action
												</th>
											</tr>
										</thead>
										<tbody></tbody>
										<tfoot>
											<tr>
												<td colspan="5">
													<ul class="pagination pull-right"></ul>
												</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-lg-4">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Add an industry</h5>
						</div>
						<div class="ibox-content">
							<form role="form" onsubmit="return false;" data-parsley-validate class="form-action-add" data-parsley-excluded="input[type=file], input[type=button], input[type=submit], input[type=reset], input[type=hidden], [disabled], :hidden">
								<input type="hidden" data-route data-reload="true" value="{{ route('admin.job.industry.postAdd') }}">
								<div class="form-group">
									<label>Name</label>
									<input type="text" name="title" required class="form-control" />
								</div>

								<div class="form-group">
									<button class="btn btn-white" type="cancel">Cancel</button>
									<button class="btn btn-primary" type="submit">
										<span class="btn-preloader"></span>
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
@stop