<!DOCTYPE html>
<html lang="en" prefix="og:http://ogp.me/ns#">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE9">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="robots" content="follow">
		<meta name="_t" content="{{ csrf_token() }}" />
		<link href="//fonts.googleapis.com" rel="dns-prefetch">
		<title>@yield('title', 'Programme Chameleon')</title>
		@yield('meta_tags')
		<link rel="shortcut icon" href="{{ url('favicon.ico') }}" type="image/x-icon">
		<link rel="icon" href="{{ url('favicon.ico') }}" type="image/x-icon">
	</head>

	<body>
		@if (session()->has('flashMessage'))
			<?php $msg = session('flashMessage'); ?>
			<div class="alert alert-fixed alert-{{ $msg['class'] }}">
				<a href="#" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</a>
				{{ $msg['message'] }}
			</div>
		@endif
		<!--[if IE]>
			<div class="alert alert-fixed alert-danger">
				<a href="#" class="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</a>
				This web is best viewed with Firefox (<a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">download</a>) or Chrome (<a href="https://www.google.com/chrome/browser/desktop/" target="_blank">download</a>).
			</div>
		<![endif]-->

		@yield('content')
		<!-- Scripts -->
		<script type="text/javascript">
			var loadCSS;loadCSS=function(e){var a,t;t=window.document.createElement("link"),a=window.document.getElementsByTagName("head")[0],t.rel="stylesheet",t.href=e,t.media="only x",a.appendChild(t),setTimeout(function(){t.media="all"},0)},loadCSS("//fonts.googleapis.com/css?family=Nunito%3A400%2C300%2C700&ver=4.2.5"),loadCSS('{{ URL::to("/") }}/assets/css/plugins.css?v={{ filemtime(public_path() . "/assets/css/plugins.css") }}'),loadCSS('{{ URL::to("/") }}/assets/css/theme.css?v={{ filemtime(public_path() . "/assets/css/theme.css") }}');
		</script>
		<noscript>
			<link href='//fonts.googleapis.com/css?family=Nunito%3A400%2C300%2C700&ver=4.2.5' rel='stylesheet' type='text/css'>
			<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/plugins.css?v='.filemtime(public_path().'/assets/css/plugins.css')) }}" />
			<link rel="stylesheet" type="text/css" href="{{ asset('assets/css/theme.css?v='.filemtime(public_path().'/assets/css/theme.css')) }}" />
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
					window.origin + '/assets/js/theme.js'
				],
				bundle: [
					window.origin + '/assets/js/app.js'
				]
			};

			$script(App.Scripts.core, "core");

			$script.ready(["core"], function() {
				$script(App.Scripts.bundle_dep, "bundle_dep");
			});

			$script.ready(["core", "bundle_dep"], function() {
				$script(App.Scripts.bundle, "bundle");
			});
		</script>
		<!--googleon: index-->
		<!--[if IE]>
			<script type="text/javascript" src="{{ asset('lib/html5shiv.js') }}"></script>
			<script type="text/javascript" src="{{ asset('lib/respond.js') }}"></script>
		<![endif]-->
		@if (isset($include_gmaps) && $include_gmaps === true)
			@yield('google_maps_script')
		@endif
	</body>
</html>