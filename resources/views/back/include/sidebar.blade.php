<nav class="navbar-default navbar-static-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav metismenu" id="side-menu">
			<li class="nav-header">
				<div class="dropdown profile-element">
					<span >
						<img alt="image" class="img-circle" data-src="holder.js/48x48?random=yes" />
					</span>
					<a data-toggle="dropdown" class="dropdown-toggle" href="#">
						<span class="clear"> <span class="block element-top-xs-10"> <strong class="font-bold">{{ $user->first_name . ' ' . $user->last_name }}</strong>
						</span> <span class="text-muted text-xs block">Admin of Programme Chameleon <b class="caret"></b></span> </span>
					</a>
					<ul class="dropdown-menu animated fadeInRight element-top-xs-10">
						<li><a href="#">Settings</a></li>
						<li class="divider"></li>
						<li><a href="{{ route('admin.login') }}">Logout</a></li>
					</ul>
				</div>
				<div class="logo-element">
					PC+
				</div>
			</li>
			<li>
				<a href="{{ route('admin.index') }}"><i class="fa fa-th-large"></i> <span class="nav-label">Dashboard</span></a>
			</li>
			<li>
				<a href="{{ route('admin.cms') }}"><i class="fa fa-list"></i> <span class="nav-label">CMS</span></a>
			</li>
			<li>
				<a href="#"><i class="fa fa-suitcase"></i> <span class="nav-label">Jobs</span> <span class="fa arrow"></span></a>
				<ul class="nav nav-second-level">
					<li><a href="{{ route('admin.job.index') }}">Job List</a></li>
					<li><a href="{{ route('admin.job.industry') }}">Job Industry</a></li>
				</ul>
			</li>
			<li>
				<a href="{{ route('admin.contractor') }}"><i class="fa fa-users"></i> <span class="nav-label">Contractor</span></a>
			</li>
			<li>
				<a href="{{ route('admin.company') }}"><i class="fa fa-building"></i> <span class="nav-label">Company</span></a>
			</li>
			<li>
				<a href="{{ route('admin.agency') }}"><i class="fa fa-user-md"></i> <span class="nav-label">Agency</span></a>
			</li>
			<li>
				<a href="{{ route('admin.resources') }}"><i class="fa fa-files-o"></i> <span class="nav-label">Free Resources</span></a>
			</li>
			<li>
				<a href="{{ route('admin.login') }}">
					<i class="fa fa-sign-out"></i> <span class="nav-label">Logout</span>
				</a>
			</li>
		</ul>
	</div>
</nav>