<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();
		$company = \Company::getCompany();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>
	
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
				<form role="form" action="">
					<div class="row">
						<div class="col-sm-6">
							<input type="hidden" name="search" value="1"/>
							<div class="form-group">
								<input type="text" class="form-control" placeholder="Keywords.." name="query" value="{{ trim(\Input::get('query')) }}" />
							</div>

							<div class="form-group">
								<label class="text-label">Industry</label>
								<?php $industries = \Job::getAllIndustries(); ?>
								<div class="job-category-select-wrapper">
									<select id="job-category-dropdown" name="industry">
										<option value="0">Any</option>
										@if ($industries->count() > 0)
											@foreach ($industries as $industry)
												<option value="{{ $industry->title }}" @if (\Input::get('industry') === $industry->title) {{ 'selected="selected"' }} @endif>{{ $industry->title }}</option>
											@endforeach
										@endif
									</select>
								</div>
							</div>

							<div class="form-group">
								<label class="text-label">Country Location</label>
								<select id="countrySelector" data-value="{{ trim(\Input::get('country')) }}" class="form-control" name="country">
									<option value="any">Any</option>
								</select>
							</div>

							<div class="form-group">
								<label class="text-label">City Location</label>
								<select id="citySelector" data-value="{{ trim(\Input::get('city')) }}" class="form-control" name="city">
								</select>
							</div>
						</div>

						<div class="col-sm-6">
							<p>Expected Salary</p>
							<div class="col-sm-6">
								<label class="radio">
									<input type="radio" @if (\Input::get('cv_search_salary') === 'range') {{ 'checked="checked"' }} @endif name="cv_search_salary" value="range" /> Range expected (in GBP)
									<br>
									<select name="salary_type" class="form-control">
										<option value="daily">Daily</option>
										<option value="hourly">Hourly</option>
										<option value="monthly">Monthly</option>
									</select>
									<br>
									<div class="select-clearfix input-group element-top-10 element-bottom-10">
										<input type="number" value="{{ \Input::has('salary_min') ? \Input::get('salary_min') : 0 }}" name="salary_min" min="0" class="form-control" />
										<span class="input-group-addon">to</span>
										<input type="number" value="{{ \Input::has('salary_max') ? \Input::get('salary_max') : 1 }}" min="1" name="salary_max" class="form-control" />
									</div>
								</label>
							</div>

							<div class="col-sm-6 no-padding">
								<input type="radio" name="cv_search_salary" @if (\Input::get('cv_search_salary') === 'any' || ! \Input::has('search')) {{ 'checked="checked"' }} @endif value="any" /> Any
							</div>

							<div class="col-sm-12 element-top-10">
								<button type="submit" class="btn btn-primary"> Search </button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>

	<div id="cv-result-listing">
		<div class="container">
			<h2 class="page-header"> CV Listing </h2>
			<div class="cv-list">
				@if (\Input::has('search'))
					<?php
						$inputs = \Input::all();
						if (isset($inputs['/company/resume-search'])) unset($inputs['/company/resume-search']);
						if (isset($inputs['/company/resume-search/'])) unset($inputs['/company/resume-search/']);
						$contractors = \Contractor::searchContractor($inputs); $contractors = $contractors->paginate(15);
					?>
					<ul class="list-unstyled list-result">
						@if ($contractors->count() > 0)
							@foreach ($contractors as $contractor)
								@if ($cUser = $contractor->user)
									<li>
										<div class="media">
											<a href="#" class="media-left">
												<img data-src="holder.js/100x100?random=yes&text=no-image">
											</a>
											<div class="media-body">
												<div class="col-sm-4">
													<h4 class="media-heading"><a href="#">{{ $cUser->first_name . ' ' . $cUser->last_name }}</a></h4>
													<p>{{ $contractor->occupation }}</p>
													@if ($resume = $contractor->resume)
														<p>Rate: {{ number_format($resume->range_salary_min, 0) }} to {{ number_format($resume->range_salary_max, 0) . ' (' . $resume->salary_rate . ')' }}</p>
													@endif
												</div>

												<div class="col-sm-4">
													<i class="fa fa-map-marker"></i> {{ (is_null($contractor->city) ? '--no specified city-' : $contractor->city) . ', ' . (is_null($contractor->country) ? '--no specified country--' : $contractor->country) }}
												</div>

												<div class="col-sm-4">
													<div class="btn-group element-top-10">
														<?php $slug = Str::slug($cUser->first_name . ' ' . $cUser->last_name); ?>
														<a href="{{ route('contractor.profile', ['id'=>$_hash->encode($contractor->id), 'slug'=>$slug]) }}" class="btn btn-warning btn-xs">
															Profile
														</a>
														@if (isset($resume))
															<a href="{{ asset($resume->file) }}" class="btn btn-primary btn-xs" target="_blank" download="">Download CV</a>
														@endif
													</div>
												</div>
											</div>
										</div>
									</li>
								@else
									<li>
										<p>This contractor has incomplete information</p>
									</li>
								@endif
							@endforeach
						@else
							<li>
								<span class="alert alert-danger">No contractors found, try a different search.</span>
							</li>
						@endif
					</ul>
				@else
					<?php $contractors = \Contractor::getAllContractors(); $contractors = $contractors->paginate(15); ?>
					<ul class="list-unstyled list-result">
						@if ($contractors->count() > 0)
							@foreach ($contractors as $contractor)
								@if ($cUser = $contractor->user)
									<li>
										<div class="media">
											<a href="#" class="media-left">
												@if (is_null($contractor->image))
													<img data-src="holder.js/100x100?random=yes&text=no-image">
												@else
													<img src="{{ asset($contractor->image) }}" width="100" />
												@endif
											</a>
											<div class="media-body">
												<div class="col-sm-4">
													<h4 class="media-heading"><a href="#">{{ $cUser->first_name . ' ' . $cUser->last_name }}</a></h4>
													<p>{{ $contractor->occupation }}</p>
													@if ($resume = $contractor->resume)
														<p>Rate: {{ number_format($resume->range_salary_min, 0) }} to {{ number_format($resume->range_salary_max, 0) . ' (' . $resume->salary_rate . ')' }}</p>
													@endif
												</div>

												<div class="col-sm-4">
													<i class="fa fa-map-marker"></i> {{ (is_null($contractor->city) ? '--no specified city-' : $contractor->city) . ', ' . (is_null($contractor->country) ? '--no specified country--' : $contractor->country) }}
												</div>

												<div class="col-sm-4">
													<div class="btn-group element-top-10">
														<?php $slug = Str::slug($cUser->first_name . ' ' . $cUser->last_name); ?>
														<a href="{{ route('contractor.profile', ['id'=>$_hash->encode($contractor->id), 'slug'=>$slug]) }}" class="btn btn-warning btn-xs">
															Profile
														</a>
														@if (isset($resume))
															<a href="{{ asset($resume->file) }}" class="btn btn-primary btn-xs" target="_blank" download="">Download CV</a>
														@endif
													</div>
												</div>
											</div>
										</div>
									</li>
								@else
									<li>
										<p>This contractor has incomplete information</p>
									</li>
								@endif
							@endforeach
						@else
							<li>
								<span class="alert alert-danger">No contractors found, try a different search.</span>
							</li>
						@endif
					</ul>
				@endif
			</div>

			@if (\Input::has('search'))
				<div class="sc-pagination">
					{!! $contractors->appends($inputs)->render() !!}
				</div>
			@endif
		</div>
	</div>
</div>

<script type="text/javascript">
	if (location.search !== '') {
		var pos = document.getElementById('cv-result-listing').getBoundingClientRect();
		window.scrollTo(0, pos.top/1.5);
	}
</script>
@include('front.include.footer-query')
@include('front.include.footer')
@stop