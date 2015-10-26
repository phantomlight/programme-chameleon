@extends('app')

@section('title')
Resume Detail | Programme Chameleon
@stop

@section('content')
<div id="wrapper">
	@include('include.header')
	<div id="page-title-wrapper" class="back-light">	
		<div class="container">
			<div class="row">
				<div class="col-sm-4">
					<h1 class="frontend-title">Candidate Profile</h1>
				</div><!-- /.col-md-6 -->
				<div class="col-sm-8">
					<div class="candidate-button">
						<form id="bookmark-resume" method="post" action="#">
							<input name="user_id" value="" type="hidden">
							<input name="action" value="" type="hidden">
							<input name="resume_id" value="" type="hidden">
							<button data-on-finish="<i class='fa fa-star'></i>&nbsp;Bookmark" data-on-success="<i class='fa fa-star-o'></i>&nbsp;Unbookmark" data-loading-text="Proccessing..." id="bookmark-button" type="submit" name="submit" value="submit" class="btn btn-bookmark">
								<i class="fa fa-star"></i>&nbsp;Bookmark
							</button>
	            <a href="#" class="btn btn-contact" data-toggle="modal" data-target="#contact-resume-modal">Contact</a>
						</form>
					</div><!-- /.candidate-button -->
				</div><!-- /.col-md-6 -->
			</div><!-- /.row -->
			<div class="candidate-profile">
				<img src="{{ asset('assets/img/resume-poster2.jpg') }}" class="attachment-jobboard-resume-photo wp-post-image" alt="resume-poster2" height="52" width="52">
				<h3 class="candidate-name"> Jenny Peterson </h3>
				<div class="candidate-details">
					<span>Web Designer</span>
					<span><i class="fa fa-map-marker"></i>&nbsp;Dallas, TX</span>
					<span>
						Member from 7 months
					</span>
					<span><a href="#"><i class="fa fa-twitter"></i></a></span>
					<span><a href="#"><i class="fa fa-linkedin"></i></a></span>
					<span><a href="#"><i class="fa fa-facebook"></i></a></span>
					<span><a href="#"><i class="fa fa-link"></i></a></span>
				</div><!-- /.candidate-details -->
			</div><!-- /.candidate-profile -->
		</div><!-- /.container -->
	</div>

	<div id="content">
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.</p>
					<p>&nbsp;</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.</p>
				</div><!-- /.col-md-6 -->
				<div class="col-md-6">
					<div class="skills-container">
						<h3 class="skills-title">Skills</h3>
						<div class="the-skills">
							<span class="skill-item"> Photoshop </span>
							<span class="skill-item"> Illustrator </span>
							<span class="skill-item"> CSS 3 </span>
							<span class="skill-item"> HTML 5 </span>
							<span class="skill-item"> jQuery </span>
						</div><!-- /.the-skills -->
					</div><!-- /.skills-container -->
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
					</div><!-- /.education-container -->

					<div class="experience-container">
						<h3 class="educations-title">Experience</h3>
						<ul class="resume-lists">
							<li>
								<div class="education-name">
									<strong>Awesome Company</strong>
								</div>
								<span class="education-period"><i class="fa fa-fw fa-calendar"></i>&nbsp;2011 - 2015&nbsp;:&nbsp;</span>
								<span class="education-study-field">Designer</span><br>
								<span class="education-grade"><i class="fa fa-usd fa-fw"></i>&nbsp;Yearly Salary&nbsp;:&nbsp;30000</span><br>
								<span class="education-qualification"><i class="fa fa-fw fa-check"></i>&nbsp;Job Duties&nbsp;:&nbsp;</span>
								<div class="experience-job">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lectus ex, vestibulum sit amet sapien sed, fringilla mollis eros. Integer diam nisl, faucibus vitae massa sit amet, finibus aliquam lectus. Morbi et convallis nunc. Donec vulputate, enim non suscipit eleifend, lacus justo consectetur quam, in ultrices dolor odio a metus. Nunc tempor, purus ut maximus tincidunt, lacus dolor dignissim lacus, at ultrices sapien nulla et tellus. Integer sit amet posuere ligula, eget lacinia magna. Duis sagittis quam non ante sodales viverra.
								</div>
							</li>
						</ul>
					</div><!-- /.experience-container -->

					<div class="experience-container">
						<h3 class="educations-title">URL(s)</h3>
						<ul class="resume-lists">
							<li>
								<div class="education-name"><strong>My Site</strong></div>
								<span class="education-period"><i class="fa fa-fw fa-link"></i>&nbsp;<a href="http://mysite.com" target="_blank">http://mysite.com</a></span>
							</li>
						</ul>
					</div><!-- /.experience-container -->
				</div><!-- /.col-md-6 -->
			</div><!-- /.row -->
		</div><!-- /.container -->
	</div>
</div>

@include('include.footer-query')
@include('include.footer')
@stop