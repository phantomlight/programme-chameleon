@extends('back.app')

@section('title')
Price Listing | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('back.include.sidebar')
	<div id="page-wrapper" class="gray-bg">
		@include('back.include.header')
		<div class="wrapper wrapper-content">
			<div class="border-bottom">	
				<div class="row">
					<div class="col-lg-12">
						<div class="ibox float-e-margins">
							<div class="ibox-title">
								<h5>Price List</h5>
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
									<div class="col-sm-8">
										<table class="footable footable-init toggle-arrow-tiny table table-stripped" data-page-size="10" data-paging="true" id="tableList">
											<thead>
												<tr>
													<th data-id="id" data-sort="0" data-sort-ignore="true">
														<input type="checkbox" class="check-all">
													</th>
													<th data-id="company_name" data-sort="1">
														Tokens
													</th>
													<th data-id="updated_at" data-sort="2" data-sort-ignore="true">
														Created At
													</th>
													<th data-sort-ignore="true" data-sort="3" data-id="actions">
														Action
													</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td><input type="checkbox" value="1"></td>
													<td><i class="fa fa-gbp"></i> 1.25 for every 1 token</td>
													<td>15 November 2015, 11:00:00 PM</td>
													<td><button class="btn btn-danger btn-xs"><i class="fa fa-times"></i> delete</button></td>
												</tr>
												<tr>
													<td><input type="checkbox" value="1"></td>
													<td><i class="fa fa-gbp"></i> 3 for every 5 tokens</td>
													<td>15 November 2015, 11:00:00 PM</td>
													<td><button class="btn btn-danger btn-xs"><i class="fa fa-times"></i> delete</button></td>
												</tr>
											</tbody>
											<tfoot>
												<tr>
													<td colspan="5">
														<ul class="pagination pull-right"></ul>
													</td>
												</tr>
											</tfoot>
										</table>

										<button class="btn btn-primary"><i class="fa fa-plus"></i> Add Price List</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-4">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5>Agency Settings</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>

						<div class="ibox-content">
							<form role="form" data-parsley-validate onsubmit="return false;">
								<div class="form-group">
									<label>Agency need token to see timesheet?</label>
									<select name="agency_opt_timesheet" class="form-control">
										<option value="1" selected="">Yes</option>
										<option value="0">No</option>
									</select>
								</div>

								<div class="form-group">
									<label>Amount of token?</label>
									<input type="number" class="form-control" min="1" value="1" required>
								</div>

								<button type="submit" class="btn sc-button">
									<span class="btn-preloader">
										<i class="fa fa-spinner fa-spin"></i> Updating...
									</span>
									<span>Update</span>
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