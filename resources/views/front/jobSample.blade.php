<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Web Developer| Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div id="job-detail">
			<div class="container">
				<h1 class="job-detail-title">
					Web Developer
				</h1>
				<button class="btn btn-primary" data-toggle="modal" data-target="#apply-job-modal">Apply</button>
				<div class="company-job-detail clearfix">
					<div class="company-logo">
						<a href="{{ \URL::to('company/company-sample') }}"><img data-src="holder.js/160x49?random=yes" alt="Company Logo" height="49" width="160"></a>
					</div>
					<div class="company-details">
						<span class="company-website">
							<i class="fa fa-fw fa-chain"></i>
							<a href="http://web.com" target="_blank">Website</a>
						</span>
						<span class="company-twitter">
							<i class="fa fa-fw fa-twitter"></i>
							<a href="http://twitter.com" target="_blank">Twitter</a>
						</span>
						<span class="company-facebook">
							<i class="fa fa-fw fa-facebook"></i>
							<a href="http://facebook.com" target="_blank">Facebook</a>
						</span>
						<span class="company-google-plus">
							<i class="fa fa-fw fa-google-plus"></i>
							<a href="http://plus.google.com" target="_blank">Google+</a>
						</span>
					</div>
				</div>

				<div class="the-job-details clearfix">
					<div class="the-job-title">
						<h3>Web Developer</h3>
						<p>Lorem ipsum dolor sit amet, consectetuer adipiscing</p>
					</div>
					<div class="the-job-company">Company 1</div>
					<div class="the-job-location">
						<i class="fa fa-fw fa-map-marker"></i> Texas
					</div>
					<div class="the-job-type">
						<i class="fa fa-fw fa-user"></i> Contract
					</div>
					<div class="the-job-button"></div>
				</div>

				<div class="the-job-aditional-details">
					<span class="the-job-aditional-title job-cat-links">Category : 
						<a href="#">IT</a>
					</span>

					<span class="the-job-aditional-title">
						Salary : <i class="fa fa-gbp"></i> 30,000
					</span>
					<span class="the-job-additional-title">Experience(s) : 1&nbsp;Year</span>
				</div>

				<div id="job-description" class="row">
					<div class="col-md-6">
						<article>
							<h1>Overview</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.

								Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.
							</p>
						</article>
					</div>
					<div class="col-md-6">
						<article>
							<h1>About&nbsp;company 1</h1>
							<p>
								On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted.
							</p>
						</article>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="the-job-content">
	<div class="container">
		<article><h3 class="sc-title normal">Benefits</h3>
			<div class="row">
				<div class="col-sm-4 col-sm-offset-0">
					<ul class="sc-ul">
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
					</ul>
				</div>
				<div class="col-sm-4 col-sm-offset-0">
					<ul class="sc-ul">
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
					</ul>
				</div>
				<div class="col-sm-4 col-sm-offset-0">
					<ul class="sc-ul">
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i> On the other hand, we denounce with righteous</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Dislike men who are so beguiled and demoralized</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Charms of pleasure of the moment</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-arrow-right"></i>  Duty through weakness of will, which is</li>
					</ul>
				</div>
			</div>
			<h3 class="sc-title normal">Qualifications</h3>
			<div class="row">
				<div class="col-sm-6 col-sm-offset-0">
					<ul class="sc-ul">
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i> I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Expound the actual teachings of the great explorer of the truth.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences.</li>
					</ul>
				</div>
				<div class="col-sm-6 col-sm-offset-0">
					<ul class="sc-ul">
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i> I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Expound the actual teachings of the great explorer of the truth.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical.</li>
						<li><i style="color:#71A634" class="fa fa-fw fa-chevron-right"></i>  Right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences.</li>
					</ul>
				</div>
			</div>
		</article>
	</div>
</div>

<div id="apply-job-modal" class="modal fade" aria-hidden="true" role="dialog" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">Web Developer - Company 1</h4>
			</div>

			<div class="modal-body">
				<div class="alert alert-warning" role="alert">
					You need to signed in to apply the job. Click <a href="{{ \URL::to('login') }}">Here</a> to sign in.
				</div>
			</div>

			<div class="modal-footer"></div>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop