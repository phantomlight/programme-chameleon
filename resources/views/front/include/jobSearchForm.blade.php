<form id="job-search-form" role="form" action="{{ route('job.search') }}">
	<div id="search-text-input" class="row">
		<div class="col-md-5">
			<div class="form-group has-feedback">
				<label class="text-label" for="q-keyword">Search Vacancies</label>
				<input class="form-control" name="query" id="q-keyword" placeholder="Keywords (IT Engineer, Shop Manager, Hr Manager...)" type="text" @if (\Input::has('query')) value="{{ \Input::get('query') }}" @endif>
				<span class="fa fa-search form-control-feedback"></span>
			</div>
		</div>
		<div class="col-md-4">
			<div class="form-group has-feedback">
				<label class="text-label" for="location">Country</label>
				<select class="form-control" name="country" id="countrySelector" @if (\Input::has('country')) {{ 'data-value="\Input::get("country")"' }} @endif>
					<option value="any">Any</option>
				</select>
			</div>
		</div>
		<div class="col-md-3">
			<div class="search-btn-group">
				<button class="advance-search-toggle" type="button" name="advance-search">Advanced Search</button>
				<button class="btn btn-job-search " type="submit" name="submit" value="true">Search</button>
			</div>
		</div>
	</div>
	<div id="advance-search-option">
		<div class="row">
			<div class="col-md-7">
				<div class="form-group job-filter-dropdown">
					<label class="text-label" for="location">Category</label>
					<div class="job-category-select-wrapper">
						<?php $industries = \Job::getAllIndustries(); ?>
						<select id="job-category-dropdown" name="job_industry">
							<option value="any">Any</option>
							@if ($industries->count() > 0)
								@foreach ($industries as $industry)
									<option value="{{ $industry->id }}" @if (\Input::get('job_industry') === $industry->id) {{ 'selected="selected"' }} @endif>{{ $industry->title }}</option>
								@endforeach
							@endif
						</select>
					</div>
				</div>
			</div>
			<div class="col-md-5">
				<div class="form-group job-filter-dropdown">
					<label class="text-label" for="location">Type</label>
					<div class="job-type-select-wrapper">
						<select id="job-type-dropdown" name="job_type">
							<option value="any" @if (\Input::get('job_type') === 'any') {{ 'selected="selected"' }} @endif>Any</option>
							<option value="contract" @if (\Input::get('job_type') === 'contract') {{ 'selected="selected"' }} @endif>Contract</option>
							<option value="permanent" @if (\Input::get('job_type') === 'permanent') {{ 'selected="selected"' }} @endif>Full Time</option>
						</select>
					</div>
				</div>
			</div>
		</div>
		<div class="form-group experience">
			<fieldset>
				<label class="slider-label">Experience (-/+)<span class="ex-min"></span> - <span class="ex-max"></span></label>
				<?php $values = range(0, 10); ?>
				<select class="init-slider" name="experience_min" id="experience_min">
					<option value="any">Any</option>
					@foreach ($values as $value)
						<option value="{{ $value }}" @if (\Input::get('experience_min') === $value) {{ 'selected="selected"' }} @endif>{{ $value }}</option>
					@endforeach
				</select>
				<select class="init-slider" name="experience_max" id="experience_max">
					<option value="any">Any</option>
					@foreach ($values as $value)
						<option value="{{ $value }}" @if (\Input::get('experience_max') === $value) {{ 'selected="selected"' }} @endif>{{ $value }}</option>
					@endforeach
				</select>
			</fieldset>
		</div>
		<div class="form-group salary-type">
			<label>Salary type</label>
			<select name="salary_type" class="form-control">
				<option value="any" @if (\Input::get('salary_type') === 'any') {{ 'selected="selected"' }} @endif>Any</option>
				<option value="hourly" @if (\Input::get('salary_type') === 'hourly') {{ 'selected="selected"' }} @endif>Hourly</option>
				<option value="monthly" @if (\Input::get('salary_type') === 'monthly') {{ 'selected="selected"' }} @endif>Monthly</option>
				<option value="daily" @if (\Input::get('salary_type') === 'one-time') {{ 'selected="selected"' }} @endif>Daily</option>
			</select>
		</div>
		<div class="form-group salary">
			<label class="slider-label">Salary (<i class="fa fa-gbp"></i>)</label>
			<p><small>If you want to select range of salary, please also select salary type above other than &quot;any&quot;</small></p>
			<?php
				$values = [
					'50'	=> 	'50',
					'100' => 	'100',
					'500'	=>	'500',
					'1000'	=>	'1K',
					'2000'	=>	'2K',
					'3000'	=>	'3K',
					'5000'	=>	'5K',
					'7000'	=>	'7K',
					'9000'	=>	'9K',
					'10000'	=>	'10K',
				];
			?>
			<select class="init-slider" name="salary_min" id="salary_min">
				@foreach ($values as $k=>$value)
					<option value="{{ $k }}" @if (\Input::get('salary_min') === $k) 'selected="selected"' @endif>{{ $value }}</option>
				@endforeach
			</select>
			<select class="init-slider" name="salary_max" id="salary_max">
				@foreach ($values as $k=>$value)
					<option value="{{ $k }}" @if (\Input::get('salary_max') === $k) 'selected="selected"' @endif>{{ $value }}</option>
				@endforeach
			</select>
		</div>
	</div>
</form>