<?php 
	if (\User::check()) {
		$user = \User::getUser();
		$company = \Company::getCompany();
		$notifications = $company->notifications()->orderBy('created_at', 'desc')->paginate(15);
	}
?>

@extends('front.app')

@section('title')
	All Notifications | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="common-page-wrapper">
		<div class="container">
			<div class="col-sm-8 element-top-30 element-bottom-30">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h4>All My Notifications</h4>
						<div class="dropdown">
							<button id="nLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								More <span class="caret"></span>
							</button>
							<ul class="dropdown-menu" aria-labelledby="nLabel">
								<li><a href="#" onclick="return false;" id="markReadBtn"> Mark all as read </a></li>
								<li><a href="#" onclick="return false;" id="removeReadNotifBtn"> Remove read notifications </a></li>
							</ul>
						</div>
					</div>
					<div class="panel-body no-padding">
						<ul class="list-group" id="listNotif">
							@if (count($notifications) > 0)
								@foreach ($notifications as $notification)
									<li class="list-group-item" data-id="{{ $notification->id }}">
										<a href="{{ $notification->url }}" target="_blank">
											<p>@if ( ! $notification->has_read) <label class="label label-danger">Unread</label> @endif {{ $notification->title }}</p>
											<p class="text-muted">
												<small><i class="fa fa-clock-o"></i> {{ $notification->created_at->diffForHumans() }}</small>
											</p>
										</a>
										<div class="btn-group">
											<button data-id="{{ $notification->id }}" class="btn btn-primary btn-xs btn-mark-notif">Mark as read</button>
										</div>
									</li>
								@endforeach
							@endif
						</ul>
					</div>
					<div class="panel-footer">
						{!! $notifications->render() !!}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@stop