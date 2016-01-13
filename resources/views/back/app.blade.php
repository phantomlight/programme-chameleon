<!DOCTYPE html>
<html lang="en" prefix="og:http://ogp.me/ns#">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="robots" content="nofollow,noindex">
		<meta name="_t" content="{{ csrf_token() }}" />
		<link href="//fonts.googleapis.com" rel="dns-prefetch">
		<title>@yield('title', 'Admin Dashboard')</title>
		@yield('meta_tags')
		<link rel="shortcut icon" href="{{ url('assets/img/ico/favicon.ico') }}" type="image/x-icon">
		<link rel="icon" href="{{ url('assets/img/ico/favicon.ico') }}" type="image/x-icon">
	</head>

	<body>
		<div class="page-preloader">
			<i class="fa fa-spinner fa-spin"></i>
		</div>
		
		@if (session()->has('flashMessage'))
			<?php $msg = session('flashMessage'); ?>
			<div class="alert alert-fixed alert-{{ $msg['class'] }}">
				<a href="#" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</a>
				{{ $msg['message'] }}
			</div>
			@endif
		@yield('content')
		<!-- Scripts -->
		<script type="text/javascript">
			var loadCSS;loadCSS=function(e){var a,t;t=window.document.createElement("link"),a=window.document.getElementsByTagName("head")[0],t.rel="stylesheet",t.href=e,t.media="only x",a.appendChild(t),setTimeout(function(){t.media="all"},0)},loadCSS("//fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300"),loadCSS('{{ URL::to("/") }}/assets/css/back_plugins.css?v={{ filemtime(public_path() . "/assets/css/back_plugins.css") }}'),loadCSS('{{ URL::to("/") }}/assets/css/back.css?v={{ filemtime(public_path() . "/assets/css/back.css") }}');
		</script>
		<noscript>
			<link href='//fonts.googleapis.com/css?family=Roboto+Condensed:400,700,300' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/back_plugins.css?v='.filemtime(public_path().'/assets/css/back_plugins.css')) }}" />
			<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/back.css?v='.filemtime(public_path().'/assets/css/back.css')) }}" />
		</noscript>
		<script type="text/javascript" src="{{ asset('assets/script.min.js') }}"></script>
		<!--googleoff: index-->
		<script type="text/javascript">
			var App = {};
			window.origin = '{{ URL::to("/") }}';
			App.Scripts = {
				core: [
					window.origin + '/lib/jquery.js'
				],
				bundle_dep: [
					window.origin + '/lib/jquery-migrate.js',
					window.origin + '/lib/bootstrap.js',
					window.origin + '/assets/js/_theme.js'
				],
				bundle: [
					window.origin + '/assets/js/_app.js'
				]
			};

			$script(App.Scripts.core, "core");

			$script.ready(["core"], function() {
				$script(App.Scripts.bundle_dep, "bundle_dep");
			});

			$script.ready(["core", "bundle_dep"], function() {
				$script(App.Scripts.bundle, "bundle");
				@yield('post-script')
			});
		</script>
		<!--googleon: index-->
		<!--[if lt IE 9]>
			<script type="text/javascript" src="{{ asset('lib/html5shiv.js') }}"></script>
			<script type="text/javascript" src="{{ asset('lib/respond.js') }}"></script>
		<![endif]-->
		@if (isset($include_gmaps) && $include_gmaps === true)
			@yield('google_maps_script')
		@endif
	</body>
</html>