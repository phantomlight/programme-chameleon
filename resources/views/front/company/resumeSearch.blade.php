@extends('front.app')

@section('title')
CV Search | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="cv-search">
		<div class="cv-search-wrapper">
			<div class="container">
				<h2 class="cv-search-title"> Search Curriculum Vitae </h2>
				<form role="form" onsubmit="return false;" id="searchCVForm" data-parsley-validate>
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Keywords..">
							</div>

							<div class="form-group">
								<label class="text-label">Category</label>
								<div class="job-category-select-wrapper">
									<select id="job-category-dropdown" name="job_category">
										<option value="accountingfinance">Accounting/Finance</option>
										<option value="adminhuman-resources">Admin/Human Resources</option>
										<option value="buildingconstruction">Building/Construction</option>
										<option value="computerinformation-technology">Computer/Information Technology</option>
										<option value="educationtraining">Education/Training</option>
										<option value="engineering">Engineering</option>
										<option value="hotelrestaurant">Hotel/Restaurant</option>
										<option value="management">Management</option>
										<option value="manufacturing">Manufacturing</option>
										<option value="media-advertising">Media &amp; Advertising</option><option value="others">Others</option>
										<option value="salesmarketing">Sales/Marketing</option>
										<option value="sciences">Sciences</option>
										<option value="services">Services</option>
										<option value="website">Website</option>
									</select>
								</div>
							</div>

							<div class="form-group">
								<label class="text-label">City Location</label>
								<select id="job-category-dropdown" class="form-control" name="cv_search_city">
									<option> -- City Selector --</option>
									<option>Any</option>
								</select>
							</div>

							<div class="form-group">
								<label class="text-label">Country Location</label>
								<select id="job-category-dropdown" class="form-control" name="cv_search_city">
									<option> -- Country Selector --</option>
									<option>Any</option>
								</select>
							</div>
						</div>

						<div class="col-sm-6">
							<p>Expected Salary</p>
							<div class="col-sm-6">
								<label class="radio">
									<input type="radio" name="cv_search_salary" value="cv_search_salary_range" /> Range expected
									<br>
									<div class="select-clearfix input-group element-top-10 element-bottom-10">
										<input type="number" value="0" name="cv_search_salary_min" min="0" class="form-control" />
										<span class="input-group-addon">to</span>
										<input type="number" name="cv_search_salary_max" class="form-control">
									</div>
								</label>
							</div>

							<div class="col-sm-6 no-padding">
								<input checked="checked" type="radio" name="cv_search_salary" value="cv_search_salary_any" /> Any
							</div>

							<div class="col-sm-12 element-top-10">
								<button type="submit" class="btn btn-info"> Search </button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="cv-result-listing" class="element-top-30 element-bottom-30">
		<div class="container">
			<h2 class="page-header"> CV Listing </h2>
			<div class="cv-list">
				<ul class="list-unstyled list-result">
					<li>
						<div class="media">
							<a href="#" class="media-left">
								<img data-src="holder.js/100x100?random=yes">
							</a>
							<div class="media-body">
								<div class="col-sm-4">
									<h4 class="media-heading"><a href="#">Contractor 1</a></h4>
									<p>Web Developer</p>
								</div>

								<div class="col-sm-4">
									<i class="fa fa-map-marker"></i> Dallas, US
								</div>

								<div class="col-sm-4">
									<a href="#" class="btn btn-primary element-top-10">View Resume</a>
								</div>
							</div>
						</div>
					</li>

					<li>
						<div class="media">
							<a href="#" class="media-left">
								<img data-src="holder.js/100x100?random=yes">
							</a>
							<div class="media-body">
								<div class="col-sm-4">
									<h4 class="media-heading"><a href="#">Contractor 1</a></h4>
									<p>Web Developer</p>
								</div>

								<div class="col-sm-4">
									<i class="fa fa-map-marker"></i> Dallas, US
								</div>

								<div class="col-sm-4">
									<a href="#" class="btn btn-primary element-top-10">View Resume</a>
								</div>
							</div>
						</div>
					</li>

					<li>
						<div class="media">
							<a href="#" class="media-left">
								<img data-src="holder.js/100x100?random=yes">
							</a>
							<div class="media-body">
								<div class="col-sm-4">
									<h4 class="media-heading"><a href="#">Contractor 1</a></h4>
									<p>Web Developer</p>
								</div>

								<div class="col-sm-4">
									<i class="fa fa-map-marker"></i> Dallas, US
								</div>

								<div class="col-sm-4">
									<a href="#" class="btn btn-primary element-top-10">View Resume</a>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<ul class="pagination sc-pagination">
				<li>
					<a href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li class="active"><a href="#">1</a></li>
				<li><a href="#">2</a></li>
				<li><a href="#">3</a></li>
				<li><a href="#">4</a></li>
				<li><a href="#">5</a></li>
				<li>
					<a href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop