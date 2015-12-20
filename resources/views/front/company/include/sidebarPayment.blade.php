<?php use Carbon\Carbon; ?>

@if ( ! $company->is_vip)
<div class="panel panel-danger">
	<div class="panel-heading">Not a VIP</div>
	<div class="panel-body">
		<a href="#" data-toggle="modal" data-target="#whatis-contract-modal">What is a VIP/6-month contract?</a>

		<button class="btn btn-primary element-top-10 element-bottom-10" data-checkout-type="1">
			<span class="btn-preloader">
				<i class="fa fa-spinner fa-spin"></i> checking out with paypal, please wait..
			</span>
			<span>Subscribe to 6-month contract.</span>
		</button>

		<div class="element-top-10">
			<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif">
		</div>
	</div>
</div>
@else
<div class="panel panel-success">
	<div class="panel-heading">VIP</div>
	<div class="panel-body">
		<p>You are subscribed to 6 month contract</p>
		<?php
			$vip_since = Carbon::createFromFormat('Y-m-d H:i:s', $company->vip_start);
			$vip_until = Carbon::createFromFormat('Y-m-d H:i:s', $company->vip_end);
		?>
		<p>Since: {{ $vip_since->diffForHumans() }}</p>
		<p>Until: {{ $vip_until->toDayDateTimeString() }}</p>
		<button class="btn btn-danger" id="removeVipBtn">Remove VIP</button>
	</div>
</div>
@endif

<div class="panel panel-default clearfix">
	<div class="panel-heading">Credits</div>
	<div class="panel-body">
		<p>You currently have: {{ $company->credit }}</p>
		<p>Buy more?</p>
		<form method="post" role="form" data-parsley-validate onsubmit="return false;">
			<div class="form-group">
				<input value="1" placeholder="amount of credits" type="number" name="_cred_amt" min="1" class="form-control" />
				<span class="help-block">Each credit is <i class="fa fa-gbp"></i>10</span>
			</div>
			<button type="submit" class="btn btn-primary" data-checkout-type="2">
				<span>Buy Credits</span>
				<span class="btn-preloader">
					<i class="fa fa-spinner fa-spin"></i> checking out with paypal, please wait..
				</span>
			</button>
		</form>

		<div class="element-top-10">
			<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" align="left">
		</div>
	</div>
</div>