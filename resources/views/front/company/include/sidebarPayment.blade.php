<?php use Carbon\Carbon; ?>

@if ( ! $company->is_vip)
<div class="panel panel-danger">
	<div class="panel-heading">Not a VIP</div>
	<div class="panel-body">
		<a href="#" data-toggle="modal" data-target="#whatis-contract-modal">What is a VIP/6-month contract?</a>

		<button class="btn btn-primary element-top-10 element-bottom-10" data-user="company" data-checkout-type="1">
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
		<!--
		don't remove this in case is needed again.
		<button class="btn btn-danger" id="removeVipBtn">Remove VIP</button>
		-->
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
			<button type="submit" data-user="company" class="btn btn-primary" data-checkout-type="2">
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

<div class="modal fade" id="whatis-contract-modal" tabindex="-1" role="dialog" aria-labelledby="whatisContractLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="whatisContractLabel">What is a 6 months contract?</h4>
			</div>
			<div class="modal-body">
				<h2>Programme Chameleon 6 Month Contract - Company</h2>
				<p>Companies Full Service</p>
				<p>Functionality:</p>
				<ul>
					<li>Receive electronic timesheets through Programme Chameleon.</li>
					<li>Submit vacancies on programme chameleon. Search for candidates.</li>
					<li>Companies have jobs page to show own jobs incorporated into their website.</li>
					<li>Unlimited Job posting.</li>
				</ul>
				<p>Charging:</p>
				<ul>
					<li>If hosting (i.e Jobs page on their site). 6 Month contract minimum.</li>
					<li>£1800 for 6 Months – purchased by buying one off credit.</li>
					<li>Sell set up as free if sign up by March 2016.</li>
				</ul>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>