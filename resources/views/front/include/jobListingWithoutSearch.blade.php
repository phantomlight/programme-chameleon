<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>

<div class="jobs-listing-wrapper">
	<div class="ui-tabs ui-widget ui-widget-content ui-corner-all" id="job-listing-tabs">
		<ul>
			<li><a href="#all_jobs">All</a></li>
			<li><a href="#contract">Contracts</a></li>
			<li><a href="#full-time">Full Time</a></li>
		</ul>

		<div id="all_jobs">
			<div class="job-listing-list">
				<div class="row">
					<div class="col-sm-2 col-xs-12 the-list">
						<?php $jobs = \Job::findAllJob(); $jobs = $jobs->paginate(15); ?>
						@if ($jobs)
						<ul class="list-unstyled hidden-xs" role="tablist">
							@foreach ($jobs as $index => $job)
							<li role="presentation" @if ($index === 0) {{ 'active' }} @endif><a href="#a-{{ $job->id }}" aria-controls="a-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>

						<ul class="list-unstyled hidden-md hidden-lg hidden-sm" role="tablist">
							@foreach ($jobs as $job)
							<li role="presentation" @if ($index === 0) {{ 'active' }} @endif><a href="#a-{{ $job->id }}" aria-controls="a-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>
						@else
						<div class="alert alert-info">There's no job in this category.</div>
						@endif
					</div>

					<div class="tab-content job-info col-sm-8 col-xs-12">
						@foreach ($jobs as $index=>$job)
						<div role="tabpanel" class="tab-pane @if ($index === 0) {{ 'active' }} @endif" id="a-{{ $job->id }}">
							<div class="job-info-top">
								<h2>{{ $job->title }}</h2>
								<div>
									<span class="job-type">
										<i class="fa fa-fw fa-user"></i> {{ ucwords($job->type) }}
									</span>
									<span class="job-city-name">
										<i class="fa fa-fw fa-map-marker"></i> {{ $job->city . ', ' . $job->country }}
									</span>
									<span class="job-posted-time">
										posted {{ $job->created_at->diffForHumans() }}
									</span>
								</div>
							</div>

							<div class="job-info-bottom">
								@if ( ! is_null($job->agency_id) )
									<?php $jAgency = $job->agency; ?>
									@if ($jAgency)
										<span class="alert alert-success">This job is provided by <a href="#" onclick="return false;" data-html="true" data-toggle="popover" data-placement="right" title="<i class='fa fa-info-circle'></i> Agency Info" data-content="Address: <strong>{{ $jAgency->address }}</strong> <br/> Phone: <strong>{{ $jAgency->phone }}</strong> <br/> Location: <strong>{{ $jAgency->country . ', ' . $jAgency->city }}</strong>">{{ $jAgency->name }}</a></span>
									@endif
								@endif
								<span>Location: {{ $job->city . ', ' . $job->country }}</span>
								<span>Salary: <i class="fa fa-gbp"></i> {{ number_format($job->salary, 0) . ' (' . $job->salary_type . ')' }}</span>
								<span>Start Date: {{ $job->start_date }}</span>
								<span>Contact: {{ $job->contact_name . ' (' . $job->contact_phone . ')' }}</span>
								<?php $details = json_decode($job->job_apply_details); ?>
								@if ($details->type === 'email')
								<span>Direct Email: {{ $details->direct_email }}</span>
								<span>Application Email: {{ $details->application_email }}</span>
								@elseif ($details->type === 'url')
								<span>Application Link: {{ $details->url }}</span>
								@endif
							</div>

							<div class="btn-group">
								<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" class="btn btn-warning">See Job Details</a>
								<button type="button" class="btn btn-primary" data-init-apply data-job="{{ $_hash->encode($job->id) }}" @if (isset($contractor)) data-init-apply @else onclick="return location.replace('{{ route('front.login') }}');" @endif>Apply</button>
							</div>
						</div>
						@endforeach
					</div>
				</div>

				<div class="sc-pagination text-center">
					{!! $jobs->render() !!}
				</div>
			</div>
		</div>

		<div id="contract">
			<div class="job-listing-list">
				<div class="row">
					<div class="col-sm-2 col-xs-12 the-list">
					<?php $jobs = \Job::findJobByType('contract'); $jobs = $jobs->paginate(15); ?>
						@if ($jobs->count() > 0)
						<ul class="list-unstyled hidden-xs" role="tablist">
							@foreach ($jobs as $index => $job)
							<li role="presentation" @if ($index === 0) {{ 'active' }} @endif><a href="#c-{{ $job->id }}" aria-controls="c-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>

						<ul class="list-unstyled hidden-md hidden-lg hidden-sm" role="tablist">
							@foreach ($jobs as $job)
							<li><a href="#c-{{ $job->id }}" aria-controls="c-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>
						@else
						<div class="alert alert-info">There's no job in this category.</div>
						@endif
					</div>

					<div class="tab-content job-info col-sm-8 col-xs-12">
						@foreach ($jobs as $index=>$job)
						<div role="tabpanel" class="tab-pane @if ($index === 0) {{ 'active' }} @endif" id="c-{{ $job->id }}">
							<div class="job-info-top">
								<h2>{{ $job->title }}</h2>
								<div>
									<span class="job-type">
										<i class="fa fa-fw fa-user"></i> {{ ucwords($job->type) }}
									</span>
									<span class="job-city-name">
										<i class="fa fa-fw fa-map-marker"></i> {{ $job->city . ', ' . $job->country }}
									</span>
									<span class="job-posted-time">
										posted {{ $job->created_at->diffForHumans() }}
									</span>
								</div>
							</div>

							<div class="job-info-bottom">
								@if ( ! is_null($job->agency_id) )
									<?php $jAgency = $job->agency; ?>
									@if ($jAgency)
										<span class="alert alert-success">This job is provided by <a href="#" onclick="return false;" data-html="true" data-toggle="popover" data-placement="right" title="<i class='fa fa-info-circle'></i> Agency Info" data-content="Address: <strong>{{ $jAgency->address }}</strong> <br/> Phone: <strong>{{ $jAgency->phone }}</strong> <br/> Location: <strong>{{ $jAgency->country . ', ' . $jAgency->city }}</strong>">{{ $jAgency->name }}</a></span>
									@endif
								@endif
								<span>Location: {{ $job->city . ', ' . $job->country }}</span>
								<span>Salary: <i class="fa fa-gbp"></i> {{ number_format($job->salary, 0) . ' (' . $job->salary_type . ')' }}</span>
								<span>Start Date: {{ $job->start_date }}</span>
								<span>Contact: {{ $job->contact_name . '(' . $job->contact_phone . ')' }}</span>
								<?php $details = json_decode($job->job_apply_details); ?>
								@if ($details->type === 'email')
								<span>Direct Email: {{ $details->direct_email }}</span>
								<span>Application Email: {{ $details->application_email }}</span>
								@elseif ($details->type === 'url')
								<span>Application Link: {{ $details->url }}</span>
								@endif
							</div>

							<div class="btn-group">
								<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" class="btn btn-warning">See Job Details</a>
								<button type="button" class="btn btn-primary" data-init-apply data-job="{{ $_hash->encode($job->id) }}" @if (isset($contractor)) data-init-apply @else onclick="return location.replace('{{ route('front.login') }}');" @endif>Apply</button>
							</div>
						</div>
						@endforeach
					</div>
				</div>

				<div class="sc-pagination text-center">
					{!! $jobs->render() !!}
				</div>
			</div>
		</div>

		<div id="full-time">
			<div class="job-listing-list">
				<div class="row">
					<div class="col-sm-2 col-xs-12 the-list">
						<?php $jobs = \Job::findJobByType('permanent'); $jobs = $jobs->paginate(15); ?>
						@if ($jobs)
						<ul class="list-unstyled hidden-xs" role="tablist">
							@foreach ($jobs as $index => $job)
							<li role="presentation" @if ($index === 0) {{ 'active' }} @endif><a href="#f-{{ $job->id }}" aria-controls="f-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>

						<ul class="list-unstyled hidden-md hidden-lg hidden-sm" role="tablist">
							@foreach ($jobs as $job)
							<li><a href="#f-{{ $job->id }}" aria-controls="f-{{ $job->id }}" role="tab" data-toggle="tab">{{ $job->title }}</a></li>
							@endforeach
						</ul>
						@else
						<div class="alert alert-info">There's no job in this category.</div>
						@endif
					</div>

					<div class="tab-content job-info col-sm-8 col-xs-12">
						@foreach ($jobs as $index=>$job)
						<div role="tabpanel" class="tab-pane @if ($index === 0) {{ 'active' }} @endif" id="f-{{ $job->id }}">
							<div class="job-info-top">
								<h2>{{ $job->title }}</h2>
								<div>
									<span class="job-type">
										<i class="fa fa-fw fa-user"></i> {{ ucwords($job->type) }}
									</span>
									<span class="job-city-name">
										<i class="fa fa-fw fa-map-marker"></i> {{ $job->city . ', ' . $job->country }}
									</span>
									<span class="job-posted-time">
										posted {{ $job->created_at->diffForHumans() }}
									</span>
								</div>
							</div>

							<div class="job-info-bottom">
								@if ( ! is_null($job->agency_id) )
									<?php $jAgency = $job->agency; ?>
									@if ($jAgency)
										<span class="alert alert-success">This job is provided by <a href="#" onclick="return false;" data-html="true" data-toggle="popover" data-placement="right" title="<i class='fa fa-info-circle'></i> Agency Info" data-content="Address: <strong>{{ $jAgency->address }}</strong> <br/> Phone: <strong>{{ $jAgency->phone }}</strong> <br/> Location: <strong>{{ $jAgency->country . ', ' . $jAgency->city }}</strong>">{{ $jAgency->name }}</a></span>
									@endif
								@endif
								<span>Location: {{ $job->city . ', ' . $job->country }}</span>
								<span>Salary: <i class="fa fa-gbp"></i> {{ number_format($job->salary, 0) . ' (' . $job->salary_type . ')' }}</span>
								<span>Start Date: {{ $job->start_date }}</span>
								<span>Contact: {{ $job->contact_name . '(' . $job->contact_phone . ')' }}</span>
								<?php $details = json_decode($job->job_apply_details); ?>
								@if ($details->type === 'email')
								<span>Direct Email: {{ $details->direct_email }}</span>
								<span>Application Email: {{ $details->application_email }}</span>
								@elseif ($details->type === 'url')
								<span>Application Link: {{ $details->url }}</span>
								@endif
							</div>

							<div class="btn-group">
								<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" class="btn btn-warning">See Job Details</a>
								<button type="button" class="btn btn-primary" data-init-apply data-job="{{ $_hash->encode($job->id) }}" @if (isset($contractor)) data-init-apply @else onclick="return location.replace('{{ route('front.login') }}');" @endif>Apply</button>
							</div>
						</div>
						@endforeach
					</div>
				</div>

				<div class="sc-pagination text-center">
					{!! $jobs->render() !!}
				</div>
			</div>
		</div>
	</div>
</div>