<?php
	use App\Utils\Hash;
	use Illuminate\Support\Str;

	if (\User::check()) {
		$user = \User::getUser();
		$contractor = \Contractor::getContractor();
	}

	$_hash = new Hash();
	$_hash = $_hash->getHasher();
?>
	
@extends('front.app')

@section('title')
	Submit Expense | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper element-top-30">
		<div class="container">
			<h2 class="page-header lighten">Submit an expense</h2>

			<div class="row">
				<div class="col-md-4">
					<div class="panel panel-default">
						<div class="panel-heading">Job Detail</div>
						<div class="panel-body">
							<p>Name: {{ $job->title }}</p>
							<p>Status: {{ $job->status }}</p>
						</div>
						<div class="panel-footer">
							<a href="{{ route('job.public', ['id' => $_hash->encode($job->id), 'slug' => Str::slug($job->title)]) }}" target="_blank" class="btn btn-xs btn-primary">See Details</a>
						</div>
					</div>

					<div class="panel panel-default">
						<div class="panel-heading">Your expenses on this job</div>
						<div class="panel-body">
							<?php $expenses = $contractor->expenses()->orderBy('created_at', 'desc')->get(); ?>
							@if (count($expenses) > 0)
								<ul class="list-unstyled sc-list" id="dataFileList">
									@foreach ($expenses as $expense)
										<li data-id="{{ $_hash->encode($expense->id) }}">
											<p>{{ $expense->title }}</p>
											<p class="text-muted"><small><i class="fa fa-clock-o"></i> Submitted {{ $expense->created_at->diffForHumans() }}</small></p>
											@if ($expense->auth_company && ! $expense->auth_agency)
												<label class="label label-success">Authorised, but not by agency.</label>
											@elseif ($expense->auth_company && $expense->auth_agency)
												<label class="label label-success">Authorised.</label>
											@else
												<label class="label label-danger">Not authorised.</label>
											@endif
											<div class="btn-group">
												<button class="btn btn-danger btn-xs" data-remove="{{ route('contractor.job.expense.remove') }}" data-id="{{ $_hash->encode($expense->id) }}">Remove</button>
											</div>
										</li>
									@endforeach
								</ul>
							@else
								<div class="alert alert-danger">
									No expense submitted yet.
								</div>
							@endif
						</div>
					</div>
				</div>

				<div class="col-md-8">
					<form class="sc-form" role="form" onsubmit="return false;" id="submitExpenseForm" data-value="{{ $_hash->encode($job->id) }}" data-parsely-validate>
						<div class="form-group">
							<label>Title</label>
							<input type="text" name="title" required class="form-control" value="Expense details by {{ $user->first_name . ' ' . $user->last_name }}" />
						</div>

						<div class="form-group">
							<label>File</label>
							<input type="file" name="file">
						</div>

						<div class="form-group">
							<label>Amount</label>
							<div class="input-group">
								<input type="number" class="form-control" name="amount" required value="0" min="1">
								<span class="input-group-addon">
									<i class="fa fa-gbp"></i>
								</span>
							</div>
						</div>

						<div class="form-group">
							<label>Category</label>
							<select class="form-control" name="type">
								<option value="food">Food</option>
								<option value="transport">Transport</option>
								<option value="business-operation">Operation</option>
								<option value="other">Other</option>
							</select>
						</div>

						<div class="form-group">
							<label>Details</label>
							<textarea class="form-control" maxlength="2000" name="description"></textarea>
							<p class="help-block">Should you choose &quot;other&quot;, please explain what the expense is about.</p>
						</div>

						<button type="submit" class="btn">
							<span>Submit</span>
							<span class="btn-preloader">
								<i class="fa fa-spinner fa-spin"></i> submitting expense..
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop