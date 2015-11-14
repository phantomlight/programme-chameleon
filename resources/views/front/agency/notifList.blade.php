@extends('front.app')

@section('title')
	Notification List | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div class="element-top-30 container">
		<h2 class="page-header"><i class="fa fa-bell"></i> All My Notifications</h2>

		<div class="row">
			<div class="col-sm-6">
				<ul class="list-unstyled sc-list list-notif">
					<li class="alert alert-info"><a href="#">Company 1</a> need you to distribute <a href="#">job 1</a> to one of your contractor.</li>
					<li class="alert alert-info">NOTICE: <a href="#">Company 1</a> has accepted your contractor for <a href="#">job 3</a> <button class="btn btn-primary btn-xs">See Timesheet</button></li>
					<li class="alert alert-danger">NOTICE: <a href="#">Contractor 1</a> has rejected your job offer.</li>
				</ul>

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

			<div class="col-sm-6">
				<form role="form" class="sc-form" data-parsley-validate>
					<div class="form-group">
						<label>Send notification to email?</label>
						<select class="form-control" name="send_to_mail">
							<option value="1">Yes</option>
							<option value="0">No</option>
						</select>
					</div>

					<button class="btn" type="submit">Update</button>
				</form>
			</div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop