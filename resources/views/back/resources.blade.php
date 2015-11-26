@extends('back.app')

@section('title')
Resources | Programme Chameleon
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
								<label>Search for resources</label>
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
							<h5>Resources List</h5>
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
									<table class="footable footable-init toggle-arrow-tiny table table-stripped" data-page-size="5" data-paging="true" id="tableList">
										<thead>
											<tr>
												<th data-id="id" data-sort="0" data-sort-ignore="true">
													<input type="checkbox" class="check-all">
												</th>
												<th data-id="company_name" data-sort="1">
													Title
												</th>
												<th data-id="company_job_count" data-sort="2">
													Category
												</th>
												<th data-id="updated_at" data-sort="3" data-hide="all" data-sort-ignore="true">
													Created At
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
												<td>File {{ $i }}</td>
												<td>Category {{ $i }}</td>
												<td>15 November 2015, 11:00:00 PM</td>
												<td>
													<div class="btn-group">
														<button class="btn btn-info btn-xs">
															<i class="fa fa-download"></i> Download
														</button>
														<button class="btn btn-danger btn-xs">
															<i class="fa fa-times"></i> Delete
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

			<div class="row">
				<div class="col-sm-6">
					<div class="ibox float-e-margins">
						<div class="ibox-title">
							<h5><i class="fa fa-plus"></i> Add Free Resource</h5>
							<div class="ibox-tools">
								<a class="collapse-link">
									<i class="fa fa-chevron-up"></i>
								</a>
							</div>
						</div>

						<div class="ibox-content">
							<form role="form" data-parsley-validate onsubmit="return false;">
								<div class="form-group">
									<label>File</label>
									<input type="file" name="res_file">
								</div>

								<div class="form-group">
									<label>Title</label>
									<input type="text" required class="form-control" placeholder="Title for the resource" name="res_title" />
								</div>

								<div class="form-group">
									<label>Category</label>
									<select name="res_category" class="form-control">
										<option value="1">Project Initiation</option>
										<option value="2">Project control</option>
										<option value="3">Project closure</option>
										<option value="4">Other</option>
									</select>
								</div>

								<div class="form-group">
									<label>Content</label>
									<div class="summernote">Edit something here</div>
								</div>

								<button type="submit" class="btn sc-button">
									<span class="btn-preloader">
										<i class="fa fa-spinner fa-spin"></i> Uploading...
									</span>
									<span>Upload</span>
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