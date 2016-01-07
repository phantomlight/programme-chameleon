<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('content')
	@if (isset($flashMessage))
		<?php $msg = $flashMessage; ?>
		<div class="alert alert-{{ $msg['class'] }}">
			{{ $msg['message'] }}
		</div>
	@else
		<div id="jobs-listing" style="color:#222;">
			<div class="jobs-listing-wrapper">
			@if (count($jobs) > 0)
				<ul class="list-group job-listing-list">
					@foreach ($jobs as $job)
					<li class="list-group-item job-info">
						<div class="job-info-top">
							<h4>{{ $job->title }}</h4>
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
							<?php $jAgency = $job->agency; ?>
							@if ($jAgency)
							<span class="alert alert-success">This job is provided by <a href="#" onclick="return false;" data-html="true" data-toggle="popover" data-placement="right" title="<i class='fa fa-info-circle'></i> Agency Info" data-content="Address: <strong>{{ $jAgency->address }}</strong> <br/> Phone: <strong>{{ $jAgency->phone }}</strong> <br/> Location: <strong>{{ $jAgency->country . ', ' . $jAgency->city }}</strong>">{{ $jAgency->name }}</a></span>
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
						</div>
						</li>
					@endforeach
				</ul>
			@else
				<div class="alert alert-danger">There are no jobs.</div>
			@endif
			</div>
		</div>
	@endif
@stop