@extends('back.app')

@section('title')
Company | Programme Chameleon
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
								<label>Search for company</label>
								<div class="input-group">
									<input type="text" class="form-control" name="search" placeholder="Search Keyword" />
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="col-lg-12">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Company List</h5>
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
									<table class="footable footable-init toggle-arrow-tiny table table-stripped" data-page-size="10" data-paging="true" id="tableList">
										<thead>
											<tr>
												<th data-id="id" data-sort="0" data-sort-ignore="true">
													<input type="checkbox" class="check-all">
												</th>
												<th data-id="company_name" data-sort="1">
													Company Name
												</th>
												<th data-id="company_job_count" data-sort="2" data-sort-ignore="true">
													Jobs Posted
												</th>
												<th data-id="updated_at" data-sort="3" data-hide="all" data-sort-ignore="true">
													Last Update
												</th>
												<th data-sort-ignore="true" data-sort="4" data-id="actions">
													Action
												</th>
											</tr>
										</thead>
										<tbody>
											@for ($i=1; $i<20; $i++)
											<tr>
												<td><input type="checkbox" value="1"></td>
												<td>Company {{ $i }}</td>
												<td>2 Jobs</td>
												<td>15 November 2015, 11:00:00 PM</td>
												<td>
													<div class="btn-group">
														<button class="btn btn-warning btn-xs">
															<i class="fa fa-eye"></i> View
														</button>
														<button class="btn btn-danger btn-xs">
															<i class="fa fa-times"></i> Ban
														</button>
													</div>
												</td>
											</tr>
											@endfor
										</tbody>
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
			</div>
		</div>
	</div>
</div>
@stop