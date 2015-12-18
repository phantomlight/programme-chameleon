<?php
	use App\Utils\Hash;

	if (\User::check()) {
		$user = \User::getUser();
		$agency = \Agency::getAgency();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>

@extends('front.app')

@section('title')
	My Company Affiliates | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.agency.header')
	<div class="container">
		<div class="row element-top-50 element-bottom-50">
			<div class="col-sm-4">
				<div class="panel panel-default">
					<div class="panel-heading">My Affiliates</div>
					<div class="panel-body">
						<?php $companies = $agency->companies()->orderBy('created_at', 'desc')->get(); ?>
						@if (count($companies) > 0)
							<ul class="list-unstyled sc-list" id="companyAffiliateList">
								@foreach ($companies as $company)
									<li data-id="{{ $_hash->encode($company->id) }}">
										<div class="media">
											<div class="media-left">
												@if (! is_null($company->image))
												<img src="{{ asset($company->image) }}" width="52" />
												@else
												<img data-src="holder.js/52x52?random=yes&text=no-image" />
												@endif
											</div>
											<div class="media-body">
												<h4 class="media-heading">{{ $company->name }}</h4>
												<p>Status: {{ ucwords($company->pivot->status) }}</p>
												<p class="text-muted"><small>Been your affiliate since: <strong>{{ $company->pivot->created_at->diffForHumans() }}</strong></small></p>
												<div class="btn-group">
													<button class="btn btn-xs btn-danger" data-id="{{ $_hash->encode($company->id) }}"><i class="fa fa-times"></i> Remove</button>
												</div>
											</div>
										</div>
									</li>
								@endforeach
							</ul>
						@else
							<div class="alert alert-danger">You don't have any affiliates yet.</div>
						@endif
					</div>
				</div>
			</div>

			<div class="col-sm-8">
				<div class="panel panel-default">
					<div class="panel-heading">
						<form action="" role="form">
							<div class="row form-group">
								<div class="col-sm-8">
									<input type="text" class="form-control" name="query" placeholder="Search for company.." />
								</div>

								<div class="col-sm-4">
									<button type="submit" name="searchBy" value="company" class="btn btn-primary">Search</button>
								</div>
							</div>
						</form>
					</div>

					<div class="panel-body">
						<?php
							if (\Input::has('searchBy') && \Input::get('query') !== '') {
								$companies = \Company::getByQuery(trim(\Input::get('query')), true , 15);
							}
							else $companies = \Company::getAll(true, 15);
						?>
						@if (count($companies) > 0)
							<ul class="list-unstyled sc-list" id="companyAffiliateSearchList">
								@foreach ($companies as $company)
									<li>
										<div class="media">
											<div class="media-left">
												@if (! is_null($company->image))
												<img src="{{ asset($company->image) }}" width="52" />
												@else
												<img data-src="holder.js/52x52?random=yes&text=no-image" />
												@endif
											</div>
											<div class="media-body">
												<h4 class="media-heading">{{ $company->name }}</h4>
												<div class="btn-group">
													<a href="#" class="btn btn-xs btn-primary">Details</a>
													<button class="btn btn-xs btn-success" data-id="{{ $_hash->encode($company->id) }}"><i class="fa fa-check"></i> Request Affiliate</button>
												</div>
											</div>
										</div>
									</li>
								@endforeach
							</ul>
						@else
							<div class="alert alert-danger">
								No company available to display.
							</div>
						@endif
					</div>

					@if (count($companies) > 0)
						<div class="panel-footer">
							{!! $companies->appends(\Input::all())->render() !!}
						</div>
					@endif
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop