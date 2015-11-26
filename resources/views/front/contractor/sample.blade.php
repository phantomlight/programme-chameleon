<?php if(\User::check()) $user = \User::getUser(); ?>
	
@extends('front.app')

@section('title')
Contractor 1 | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('front.include.header')
	<div id="page-title-wrapper">
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<h1 class="frontend-title"></h1>
				</div>
				<div class="col-sm-8">
					<div class="candidate-button">
						<form role="form" onsubmit="return false;">
							<button id="bookmark-button" class="btn btn-warning disabled" data-content="Login to bookmark this resume" data-container="body" data-placement="left" data-trigger="hover" data-toggle="popover" value="submit" name="submit" type="submit" data-loading-text="Proccessing..." data-on-success="<i class='fa fa-star'></i> Bookmarked" data-original-title="" title="">
								<i class="fa fa-star"></i>
								Bookmarked
							</button>
							<a class="btn btn-primary" href="" target="_blank" download="">Download Resume</a>
							<a class="btn btn-info" data-target="#contact-resume-modal" data-toggle="modal" href="#">Contact</a>
						</form>
					</div>
				</div>
			</div>

			<div class="candidate-profile">
				<img src="{{ asset('assets/img/avatar52.jpg') }}" class="resume-img" />
				<h2 class="resume-name">Sean Horsley</h2>
				<div class="candidate-details">
					<span>Web Designer</span>
					<span>
						<i class="fa fa-map-marker"></i>
						Dallas, TX
					</span>
					<span> Member from 8 months </span>
					<span>
						<a href="#">
							<i class="fa fa-twitter"></i>
						</a>
					</span>
					<span>
						<a href="#">
							<i class="fa fa-linkedin"></i>
						</a>
					</span>
					<span>
						<a href="#">
							<i class="fa fa-facebook"></i>
						</a>
					</span>
					<span>
						<a href="#">
							<i class="fa fa-link"></i>
						</a>
					</span>
				</div>
			</div>
		</div>
	</div>

	<div id="content" class="element-top-30 element-bottom-30">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.</p>
					<p>&nbsp;</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.</p>
				</div>
				<div class="col-md-6">
					<div class="skills-container">
						<h3 class="skills-title">Skills</h3>
						<div class="the-skills">
							<span class="skill-item"> Photoshop </span>
							<span class="skill-item"> Illustrator </span>
							<span class="skill-item"> CSS 3 </span>
							<span class="skill-item"> HTML 5 </span>
							<span class="skill-item"> jQuery </span>
						</div>
					</div>
					<div class="education-container">
						<h3 class="educations-title">Education</h3>
						<ul class="resume-lists">
							<li>
								<div class="education-name"><strong>The Education Institution Name</strong></div>
								<span class="education-period"><i class="fa fa-fw fa-calendar"></i>&nbsp;Test Education&nbsp;:&nbsp;</span>
								<span class="education-study-field">Design</span><br>
								<span class="education-grade"><i class="fa fa-fw fa-star"></i>&nbsp;Grade / GPA&nbsp;:&nbsp;3.6</span><br>
								<span class="education-qualification"><i class="fa fa-fw fa-check"></i>&nbsp;Qualification&nbsp;:&nbsp;Ph.D</span>
							</li>
						</ul>
					</div>
					<div class="experience-container">
						<h3 class="educations-title">Experience</h3>
						<ul class="resume-lists">
							<li>
								<div class="education-name"><strong>Awesome Company</strong></div>
								<span class="education-period"><i class="fa fa-fw fa-calendar"></i>&nbsp;20011 - 20015&nbsp;:&nbsp;</span>
								<span class="education-study-field">Designer</span><br>
								<span class="education-grade"><i class="fa fa-usd fa-fw"></i>&nbsp;Yearly Salary&nbsp;:&nbsp;30000</span><br>
								<span class="education-qualification"><i class="fa fa-fw fa-check"></i>&nbsp;Job Duties&nbsp;:&nbsp;</span>
								<div class="experience-job">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.
								</div>
							</li>
						</ul>
					</div>

					<div class="experience-container">
						<h3 class="educations-title">URL(s)</h3>
						<ul class="resume-lists">
							<li>
								<div class="education-name"><strong>My Site</strong></div>
								<span class="education-period"><i class="fa fa-fw fa-link"></i>&nbsp;<a href="http://mysite.com" target="_blank">http://mysite.com</a></span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="contact-resume-modal" class="modal fade" aria-hidden="true" role="dialog" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="contact-job-seeker" action="" data-parsley-validate onsubmit="return false;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
					<h4 class="modal-title">Contact Job Seeker</h4>
				</div>

				<div class="modal-body">
					<div class="form-group">
						<label for="contact_name">Your Name*</label>
						<input class="form-control" name="contact_name" id="contact_name" required="required" type="text">
					</div>

					<div class="form-group">
						<label for="contact_email">Your Email*</label>
						<input class="form-control" name="contact_email" id="contact_email" required="required" type="email">
					</div>

					<div class="form-group">
						<label for="contact_message&quot;">Your Message*</label>
						<textarea name="contact_message" id="contact_message" class="form-control" required="required" rows="8"></textarea>
					</div>
					
					<div class="contact-form-status alert alert-success alert-dismissable" role="alert">
						<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true"><i class="fa fa-times"></i></span><span class="sr-only">Close</span></button>
						<strong>Thank you!</strong> Your message was sent successfully
					</div>
				</div>

				<div class="modal-footer">
					<button class="btn btn-send-contact-form" type="submit" name="submit" id="submit" value="1" data-loading-text="Sending...">Send</button>
					<input name="job_seeker_id" value="1 " type="hidden">
					<input name="action" value="send_contact_action" type="hidden">
				</div>
			</form>
		</div>
	</div>
</div>

@include('front.include.footer-query')
@include('front.include.footer')
@stop