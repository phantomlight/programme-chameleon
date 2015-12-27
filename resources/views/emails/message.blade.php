<?php use Carbon\Carbon; ?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
	<head>
		<title></title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<style type="text/css">
.font-sans-serif {
	font-family: sans-serif;
}
.font-avenir {
	font-family: Avenir, sans-serif;
}
.mso .wrapper .font-avenir {
	font-family: sans-serif !important;
}
.font-lato {
	font-family: Lato, Tahoma, sans-serif;
}
.mso .wrapper .font-lato {
	font-family: Tahoma, sans-serif !important;
}
.font-cabin {
	font-family: Cabin, Avenir, sans-serif;
}
.mso .wrapper .font-cabin {
	font-family: sans-serif !important;
}
.font-open-Sans {
	font-family: "Open Sans", sans-serif;
}
.mso .wrapper .font-open-Sans {
	font-family: sans-serif !important;
}
.font-roboto {
	font-family: Roboto, Tahoma, sans-serif;
}
.mso .wrapper .font-roboto {
	font-family: Tahoma, sans-serif !important;
}
.font-ubuntu {
	font-family: Ubuntu, sans-serif;
}
.mso .wrapper .font-ubuntu {
	font-family: sans-serif !important;
}
.font-pt-sans {
	font-family: "PT Sans", "Trebuchet MS", sans-serif;
}
.mso .wrapper .font-pt-sans {
	font-family: "Trebuchet MS", sans-serif !important;
}
.font-georgia {
	font-family: Georgia, serif;
}
.font-merriweather {
	font-family: Merriweather, Georgia, serif;
}
.mso .wrapper .font-merriweather {
	font-family: Georgia, serif !important;
}
.font-bitter {
	font-family: Bitter, Georgia, serif;
}
.mso .wrapper .font-bitter {
	font-family: Georgia, serif !important;
}
.font-pt-serif {
	font-family: "PT Serif", Georgia, serif;
}
.mso .wrapper .font-pt-serif {
	font-family: Georgia, serif !important;
}
.font-pompiere {
	font-family: Pompiere, "Trebuchet MS", sans-serif;
}
.mso .wrapper .font-pompiere {
	font-family: "Trebuchet MS", sans-serif !important;
}
.font-roboto-slab {
	font-family: "Roboto Slab", Georgia, serif;
}
.mso .wrapper .font-roboto-slab {
	font-family: Georgia, serif !important;
}
@media only screen and (max-width: 620px) {
	.wrapper .column .size-8 {
		font-size: 8px !important;
		line-height: 14px !important;
	}
	.wrapper .column .size-9 {
		font-size: 9px !important;
		line-height: 16px !important;
	}
	.wrapper .column .size-10 {
		font-size: 10px !important;
		line-height: 18px !important;
	}
	.wrapper .column .size-11 {
		font-size: 11px !important;
		line-height: 19px !important;
	}
	.wrapper .column .size-12 {
		font-size: 12px !important;
		line-height: 19px !important;
	}
	.wrapper .column .size-13 {
		font-size: 13px !important;
		line-height: 21px !important;
	}
	.wrapper .column .size-14 {
		font-size: 14px !important;
		line-height: 21px !important;
	}
	.wrapper .column .size-15 {
		font-size: 15px !important;
		line-height: 23px !important;
	}
	.wrapper .column .size-16 {
		font-size: 16px !important;
		line-height: 24px !important;
	}
	.wrapper .column .size-17 {
		font-size: 17px !important;
		line-height: 26px !important;
	}
	.wrapper .column .size-18 {
		font-size: 17px !important;
		line-height: 26px !important;
	}
	.wrapper .column .size-20 {
		font-size: 17px !important;
		line-height: 26px !important;
	}
	.wrapper .column .size-22 {
		font-size: 18px !important;
		line-height: 26px !important;
	}
	.wrapper .column .size-24 {
		font-size: 20px !important;
		line-height: 28px !important;
	}
	.wrapper .column .size-26 {
		font-size: 22px !important;
		line-height: 31px !important;
	}
	.wrapper .column .size-28 {
		font-size: 24px !important;
		line-height: 32px !important;
	}
	.wrapper .column .size-30 {
		font-size: 26px !important;
		line-height: 34px !important;
	}
	.wrapper .column .size-32 {
		font-size: 28px !important;
		line-height: 36px !important;
	}
	.wrapper .column .size-34 {
		font-size: 30px !important;
		line-height: 38px !important;
	}
	.wrapper .column .size-36 {
		font-size: 30px !important;
		line-height: 38px !important;
	}
	.wrapper .column .size-40 {
		font-size: 32px !important;
		line-height: 40px !important;
	}
	.wrapper .column .size-44 {
		font-size: 34px !important;
		line-height: 43px !important;
	}
	.wrapper .column .size-48 {
		font-size: 36px !important;
		line-height: 43px !important;
	}
	.wrapper .column .size-56 {
		font-size: 40px !important;
		line-height: 47px !important;
	}
	.wrapper .column .size-64 {
		font-size: 44px !important;
		line-height: 50px !important;
	}
}
body {
	margin: 0;
	padding: 0;
	min-width: 100%;
}
.mso body {
	mso-line-height-rule: exactly;
}
.no-padding .wrapper .column .column-top,
.no-padding .wrapper .column .column-bottom {
	font-size: 0px;
	line-height: 0px;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
td {
	padding: 0;
	vertical-align: top;
}
.spacer,
.border {
	font-size: 1px;
	line-height: 1px;
}
.spacer {
	width: 100%;
}
img {
	border: 0;
	-ms-interpolation-mode: bicubic;
}
.image {
	font-size: 12px;
	mso-line-height-rule: at-least;
}
.image img {
	display: block;
}
.logo {
	mso-line-height-rule: at-least;
}
.logo img {
	display: block;
}
strong {
	font-weight: bold;
}
h1,
h2,
h3,
p,
ol,
ul,
blockquote,
.image {
	font-style: normal;
	font-weight: 400;
}
ol,
ul,
li {
	padding-left: 0;
}
blockquote {
	Margin-left: 0;
	Margin-right: 0;
	padding-right: 0;
}
.column-top,
.column-bottom {
	font-size: 32px;
	line-height: 32px;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	transition-duration: 150ms;
	transition-property: all;
}
.half-padding .column .column-top,
.half-padding .column .column-bottom {
	font-size: 16px;
	line-height: 16px;
}
.column {
	text-align: left;
}
.contents {
	table-layout: fixed;
	width: 100%;
}
.padded {
	padding-left: 32px;
	padding-right: 32px;
	word-break: break-word;
	word-wrap: break-word;
}
.wrapper {
	display: table;
	table-layout: fixed;
	width: 100%;
	min-width: 620px;
	-webkit-text-size-adjust: 100%;
	-ms-text-size-adjust: 100%;
}
.wrapper a {
	transition: opacity 0.2s ease-in;
}
table.wrapper {
	table-layout: fixed;
}
.one-col,
.two-col,
.three-col {
	Margin-left: auto;
	Margin-right: auto;
	width: 600px;
}
.centered {
	Margin-left: auto;
	Margin-right: auto;
}
.btn a {
	border-radius: 3px;
	display: inline-block;
	font-size: 14px;
	font-weight: 700;
	line-height: 24px;
	padding: 13px 35px 12px 35px;
	text-align: center;
	text-decoration: none !important;
}
.btn a:hover {
	opacity: 0.8;
}
.two-col .btn a {
	font-size: 12px;
	line-height: 22px;
	padding: 10px 28px;
}
.three-col .btn a,
.wrapper .narrower .btn a {
	font-size: 11px;
	line-height: 19px;
	padding: 6px 18px 5px 18px;
}
@media only screen and (max-width: 620px) {
	.btn a {
		display: block !important;
		font-size: 14px !important;
		line-height: 24px !important;
		padding: 13px 10px 12px 10px !important;
	}
}
.two-col .column {
	width: 300px;
}
.two-col .first .padded {
	padding-left: 32px;
	padding-right: 16px;
}
.two-col .second .padded {
	padding-left: 16px;
	padding-right: 32px;
}
.three-col .column {
	width: 200px;
}
.three-col .first .padded {
	padding-left: 32px;
	padding-right: 8px;
}
.three-col .second .padded {
	padding-left: 20px;
	padding-right: 20px;
}
.three-col .third .padded {
	padding-left: 8px;
	padding-right: 32px;
}
.wider {
	width: 400px;
}
.narrower {
	width: 200px;
}
@media only screen and (min-width: 0) {
	.wrapper {
		text-rendering: optimizeLegibility;
	}
}
@media only screen and (max-width: 620px) {
	[class=wrapper] {
		min-width: 320px !important;
		width: 100% !important;
	}
	[class=wrapper] .one-col,
	[class=wrapper] .two-col,
	[class=wrapper] .three-col {
		width: 320px !important;
	}
	[class=wrapper] .column,
	[class=wrapper] .gutter {
		display: block;
		float: left;
		width: 320px !important;
	}
	[class=wrapper] .padded {
		padding-left: 20px !important;
		padding-right: 20px !important;
	}
	[class=wrapper] .block {
		display: block !important;
	}
	[class=wrapper] .hide {
		display: none !important;
	}
	[class=wrapper] .image img {
		height: auto !important;
		width: 100% !important;
	}
}
.footer {
	width: 100%;
}
.footer .inner {
	padding: 58px 0 29px 0;
	width: 600px;
}
.footer .left td,
.footer .right td {
	font-size: 12px;
	line-height: 22px;
}
.footer .left td {
	text-align: left;
	width: 400px;
}
.footer .right td {
	max-width: 200px;
	mso-line-height-rule: at-least;
}
.footer .links {
	line-height: 26px;
	Margin-bottom: 26px;
	mso-line-height-rule: at-least;
}
.footer .links a:hover {
	opacity: 0.8;
}
.footer .links img {
	vertical-align: middle;
}
.footer .address {
	Margin-bottom: 18px;
}
.footer .campaign {
	Margin-bottom: 18px;
}
.footer .campaign a {
	font-weight: bold;
	text-decoration: none;
}
.footer .sharing div {
	Margin-bottom: 5px;
}
.wrapper .footer .fblike,
.wrapper .footer .tweet,
.wrapper .footer .linkedinshare,
.wrapper .footer .forwardtoafriend {
	background-repeat: no-repeat;
	background-size: 200px 56px;
	border-radius: 2px;
	color: #ffffff;
	display: block;
	font-size: 11px;
	font-weight: bold;
	line-height: 11px;
	padding: 8px 11px 7px 28px;
	text-align: left;
	text-decoration: none;
}
.wrapper .footer .fblike:hover,
.wrapper .footer .tweet:hover,
.wrapper .footer .linkedinshare:hover,
.wrapper .footer .forwardtoafriend:hover {
	color: #ffffff !important;
	opacity: 0.8;
}
.footer .fblike {
	background-image: url(https://i3.createsend1.com/static/eb/master/03-fresh/imgf/fblike.png);
}
.footer .tweet {
	background-image: url(https://i4.createsend1.com/static/eb/master/03-fresh/imgf/tweet.png);
}
.footer .linkedinshare {
	background-image: url(https://i5.createsend1.com/static/eb/master/03-fresh/imgf/lishare.png);
}
.footer .forwardtoafriend {
	background-image: url(https://i6.createsend1.com/static/eb/master/03-fresh/imgf/forward.png);
}
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {
	.footer .fblike {
		background-image: url(https://i7.createsend1.com/static/eb/master/03-fresh/imgf/fblike@2x.png) !important;
	}
	.footer .tweet {
		background-image: url(https://i9.createsend1.com/static/eb/master/03-fresh/imgf/tweet@2x.png) !important;
	}
	.footer .linkedinshare {
		background-image: url(https://i8.createsend1.com/static/eb/master/03-fresh/imgf/lishare@2x.png) !important;
	}
	.footer .forwardtoafriend {
		background-image: url(https://i10.createsend1.com/static/eb/master/03-fresh/imgf/forward@2x.png) !important;
	}
}
@media only screen and (max-width: 620px) {
	.footer {
		width: 320px !important;
	}
	.footer td {
		display: none;
	}
	.footer .inner,
	.footer .inner td {
		display: block;
		text-align: center !important;
		max-width: 320px !important;
		width: 320px !important;
	}
	.footer .sharing {
		Margin-bottom: 40px;
	}
	.footer .sharing div {
		display: inline-block;
	}
	.footer .fblike,
	.footer .tweet,
	.footer .linkedinshare,
	.footer .forwardtoafriend {
		display: inline-block !important;
	}
}
.wrapper h1,
.wrapper h2,
.wrapper h3,
.wrapper p,
.wrapper ol,
.wrapper ul,
.wrapper li,
.wrapper blockquote,
.image,
.btn,
.divider {
	Margin-bottom: 0;
	Margin-top: 0;
}
.wrapper .column h1 + * {
	Margin-top: 20px;
}
.wrapper .column h2 + * {
	Margin-top: 16px;
}
.wrapper .column h3 + * {
	Margin-top: 12px;
}
.wrapper .column p + *,
.wrapper .column ol + *,
.wrapper .column ul + *,
.wrapper .column blockquote + *,
.image + .contents td > :first-child {
	Margin-top: 24px;
}
.contents:nth-last-child(n+3) h1:last-child,
.no-padding .contents:nth-last-child(n+2) h1:last-child {
	Margin-bottom: 20px;
}
.contents:nth-last-child(n+3) h2:last-child,
.no-padding .contents:nth-last-child(n+2) h2:last-child {
	Margin-bottom: 16px;
}
.contents:nth-last-child(n+3) h3:last-child,
.no-padding .contents:nth-last-child(n+2) h3:last-child {
	Margin-bottom: 12px;
}
.contents:nth-last-child(n+3) p:last-child,
.no-padding .contents:nth-last-child(n+2) p:last-child,
.contents:nth-last-child(n+3) ol:last-child,
.no-padding .contents:nth-last-child(n+2) ol:last-child,
.contents:nth-last-child(n+3) ul:last-child,
.no-padding .contents:nth-last-child(n+2) ul:last-child,
.contents:nth-last-child(n+3) blockquote:last-child,
.no-padding .contents:nth-last-child(n+2) blockquote:last-child,
.contents:nth-last-child(n+3) .image,
.no-padding .contents:nth-last-child(n+2) .image,
.contents:nth-last-child(n+3) .divider,
.no-padding .contents:nth-last-child(n+2) .divider,
.contents:nth-last-child(n+3) .btn,
.no-padding .contents:nth-last-child(n+2) .btn {
	Margin-bottom: 24px;
}
.two-col .column p + *,
.wider .column p + *,
.two-col .column ol + *,
.wider .column ol + *,
.two-col .column ul + *,
.wider .column ul + *,
.two-col .column blockquote + *,
.wider .column blockquote + *,
.two-col .image + .contents td > :first-child,
.wider .image + .contents td > :first-child {
	Margin-top: 21px;
}
.two-col .contents:nth-last-child(n+3) p:last-child,
.wider .contents:nth-last-child(n+3) p:last-child,
.no-padding .two-col .contents:nth-last-child(n+2) p:last-child,
.no-padding .wider .contents:nth-last-child(n+2) p:last-child,
.two-col .contents:nth-last-child(n+3) ol:last-child,
.wider .contents:nth-last-child(n+3) ol:last-child,
.no-padding .two-col .contents:nth-last-child(n+2) ol:last-child,
.no-padding .wider .contents:nth-last-child(n+2) ol:last-child,
.two-col .contents:nth-last-child(n+3) ul:last-child,
.wider .contents:nth-last-child(n+3) ul:last-child,
.no-padding .two-col .contents:nth-last-child(n+2) ul:last-child,
.no-padding .wider .contents:nth-last-child(n+2) ul:last-child,
.two-col .contents:nth-last-child(n+3) blockquote:last-child,
.wider .contents:nth-last-child(n+3) blockquote:last-child,
.no-padding .two-col .contents:nth-last-child(n+2) blockquote:last-child,
.no-padding .wider .contents:nth-last-child(n+2) blockquote:last-child,
.two-col .contents:nth-last-child(n+3) .image,
.wider .contents:nth-last-child(n+3) .image,
.no-padding .two-col .contents:nth-last-child(n+2) .image,
.no-padding .wider .contents:nth-last-child(n+2) .image,
.two-col .contents:nth-last-child(n+3) .divider,
.wider .contents:nth-last-child(n+3) .divider,
.no-padding .two-col .contents:nth-last-child(n+2) .divider,
.no-padding .wider .contents:nth-last-child(n+2) .divider,
.two-col .contents:nth-last-child(n+3) .btn,
.wider .contents:nth-last-child(n+3) .btn,
.no-padding .two-col .contents:nth-last-child(n+2) .btn,
.no-padding .wider .contents:nth-last-child(n+2) .btn {
	Margin-bottom: 21px;
}
.three-col .column p + *,
.narrower .column p + *,
.three-col .column ol + *,
.narrower .column ol + *,
.three-col .column ul + *,
.narrower .column ul + *,
.three-col .column blockquote + *,
.narrower .column blockquote + *,
.three-col .image + .contents td > :first-child,
.narrower .image + .contents td > :first-child {
	Margin-top: 18px;
}
.three-col .contents:nth-last-child(n+3) p:last-child,
.narrower .contents:nth-last-child(n+3) p:last-child,
.no-padding .three-col .contents:nth-last-child(n+2) p:last-child,
.no-padding .narrower .contents:nth-last-child(n+2) p:last-child,
.three-col .contents:nth-last-child(n+3) ol:last-child,
.narrower .contents:nth-last-child(n+3) ol:last-child,
.no-padding .three-col .contents:nth-last-child(n+2) ol:last-child,
.no-padding .narrower .contents:nth-last-child(n+2) ol:last-child,
.three-col .contents:nth-last-child(n+3) ul:last-child,
.narrower .contents:nth-last-child(n+3) ul:last-child,
.no-padding .three-col .contents:nth-last-child(n+2) ul:last-child,
.no-padding .narrower .contents:nth-last-child(n+2) ul:last-child,
.three-col .contents:nth-last-child(n+3) blockquote:last-child,
.narrower .contents:nth-last-child(n+3) blockquote:last-child,
.no-padding .three-col .contents:nth-last-child(n+2) blockquote:last-child,
.no-padding .narrower .contents:nth-last-child(n+2) blockquote:last-child,
.three-col .contents:nth-last-child(n+3) .image,
.narrower .contents:nth-last-child(n+3) .image,
.no-padding .three-col .contents:nth-last-child(n+2) .image,
.no-padding .narrower .contents:nth-last-child(n+2) .image,
.three-col .contents:nth-last-child(n+3) .divider,
.narrower .contents:nth-last-child(n+3) .divider,
.no-padding .three-col .contents:nth-last-child(n+2) .divider,
.no-padding .narrower .contents:nth-last-child(n+2) .divider,
.three-col .contents:nth-last-child(n+3) .btn,
.narrower .contents:nth-last-child(n+3) .btn,
.no-padding .three-col .contents:nth-last-child(n+2) .btn,
.no-padding .narrower .contents:nth-last-child(n+2) .btn {
	Margin-bottom: 18px;
}
@media only screen and (max-width: 620px) {
	.wrapper p + *,
	.wrapper ol + *,
	.wrapper ul + *,
	.wrapper blockquote + *,
	.image + .contents td > :first-child {
		Margin-top: 24px !important;
	}
	.contents:nth-last-child(n+3) p:last-child,
	.no-padding .contents:nth-last-child(n+2) p:last-child,
	.contents:nth-last-child(n+3) ol:last-child,
	.no-padding .contents:nth-last-child(n+2) ol:last-child,
	.contents:nth-last-child(n+3) ul:last-child,
	.no-padding .contents:nth-last-child(n+2) ul:last-child,
	.contents:nth-last-child(n+3) blockquote:last-child,
	.no-padding .contents:nth-last-child(n+2) blockquote:last-child,
	.contents:nth-last-child(n+3) .image:last-child,
	.no-padding .contents:nth-last-child(n+2) .image:last-child,
	.contents:nth-last-child(n+3) .divider:last-child,
	.no-padding .contents:nth-last-child(n+2) .divider:last-child,
	.contents:nth-last-child(n+3) .btn:last-child,
	.no-padding .contents:nth-last-child(n+2) .btn:last-child {
		Margin-bottom: 24px !important;
	}
}
td.border {
	width: 1px;
}
tr.border {
	background-color: #e3e3e3;
	height: 1px;
}
tr.border td {
	line-height: 1px;
}
.sidebar {
	width: 600px;
}
.first.wider .padded {
	padding-left: 32px;
	padding-right: 20px;
}
.second.wider .padded {
	padding-left: 20px;
	padding-right: 32px;
}
.first.narrower .padded {
	padding-left: 32px;
	padding-right: 8px;
}
.second.narrower .padded {
	padding-left: 8px;
	padding-right: 32px;
}
.wrapper h1 {
	font-size: 40px;
	line-height: 48px;
}
.wrapper h2 {
	font-size: 24px;
	line-height: 32px;
}
.wrapper h3 {
	font-size: 18px;
	line-height: 24px;
}
.wrapper h1 a,
.wrapper h2 a,
.wrapper h3 a {
	text-decoration: none;
}
.wrapper a:hover {
	text-decoration: none;
}
.wrapper p,
.wrapper ol,
.wrapper ul {
	font-size: 15px;
	line-height: 24px;
}
.wrapper ol,
.wrapper ul {
	Margin-left: 20px;
}
.wrapper li {
	padding-left: 2px;
}
.wrapper blockquote {
	Margin-left: 0;
	padding-left: 18px;
}
.one-col,
.two-col,
.three-col,
.sidebar {
	background-color: #ffffff;
	table-layout: fixed;
}
.wrapper .two-col blockquote,
.wrapper .wider blockquote {
	padding-left: 16px;
}
.wrapper .three-col ol,
.wrapper .narrower ol,
.wrapper .three-col ul,
.wrapper .narrower ul {
	Margin-left: 14px;
}
.wrapper .three-col li,
.wrapper .narrower li {
	padding-left: 1px;
}
.wrapper .three-col blockquote,
.wrapper .narrower blockquote {
	padding-left: 12px;
}
.wrapper h2 {
	font-weight: 700;
}
.wrapper blockquote {
	font-style: italic;
}
.preheader a,
.header a {
	text-decoration: none;
}
.header {
	Margin-left: auto;
	Margin-right: auto;
	width: 600px;
}
.preheader td {
	padding-bottom: 24px;
	padding-top: 24px;
}
.logo {
	width: 280px;
}
.logo div {
	font-weight: 700;
}
.logo div.logo-center {
	text-align: center;
}
.logo div.logo-center img {
	Margin-left: auto;
	Margin-right: auto;
}
.preheader td {
	text-align: right;
	width: 280px;
}
.preheader td {
	letter-spacing: 0.01em;
	line-height: 17px;
	font-weight: 400;
}
.preheader a {
	letter-spacing: 0.03em;
	font-weight: 700;
}
.preheader td {
	font-size: 11px;
}
@media only screen and (max-width: 620px) {
	[class=wrapper] .header,
	[class=wrapper] .preheader td,
	[class=wrapper] .logo,
	[class=wrapper] .sidebar {
		width: 320px !important;
	}
	[class=wrapper] .header .logo {
		padding-left: 10px !important;
		padding-right: 10px !important;
	}
	[class=wrapper] .header .logo img {
		max-width: 280px !important;
		height: auto !important;
	}
	[class=wrapper] .header .preheader td {
		padding-top: 3px !important;
		padding-bottom: 22px !important;
	}
	[class=wrapper] .header .title {
		display: none !important;
	}
	[class=wrapper] .header .webversion {
		text-align: center !important;
	}
	[class=wrapper] h1 {
		font-size: 40px !important;
		line-height: 48px !important;
	}
	[class=wrapper] h2 {
		font-size: 24px !important;
		line-height: 32px !important;
	}
	[class=wrapper] h3 {
		font-size: 18px !important;
		line-height: 24px !important;
	}
	[class=wrapper] .column p,
	[class=wrapper] .column ol,
	[class=wrapper] .column ul {
		font-size: 15px !important;
		line-height: 24px !important;
	}
	[class=wrapper] ol,
	[class=wrapper] ul {
		Margin-left: 20px !important;
	}
	[class=wrapper] li {
		padding-left: 2px !important;
	}
	[class=wrapper] blockquote {
		border-left-width: 4px !important;
		padding-left: 18px !important;
	}
	[class=wrapper] table.border {
		width: 320px !important;
	}
	[class=wrapper] .second .column-top,
	[class=wrapper] .third .column-top {
		display: none;
	}
}
@media only screen and (max-width: 320px) {
	td.border {
		display: none;
	}
}
</style>
	<!--[if !mso]><!--><style type="text/css">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,700,400);
</style><link href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,700,400" rel="stylesheet" type="text/css" /><!--<![endif]--><style type="text/css">
.wrapper h1{}.wrapper h1{font-family:"Open Sans",sans-serif}.mso .wrapper h1{font-family:sans-serif !important}.wrapper h2{}.wrapper h2{font-family:"Open Sans",sans-serif}.mso .wrapper h2{font-family:sans-serif !important}.wrapper h3{}.wrapper h3{font-family:"Open Sans",sans-serif}.mso .wrapper h3{font-family:sans-serif !important}.wrapper p,.wrapper ol,.wrapper ul,.wrapper .image{}.wrapper p,.wrapper ol,.wrapper ul,.wrapper .image{font-family:"Open Sans",sans-serif}.mso .wrapper p,.mso .wrapper ol,.mso .wrapper ul,.mso .wrapper .image{font-family:sans-serif !important}.wrapper .btn a{}.wrapper .btn a{font-family:"Open Sans",sans-serif}.mso .wrapper .btn a{font-family:sans-serif !important}.logo div{}.logo div{font-family:Avenir,sans-serif}.mso .logo div{font-family:sans-serif 
!important}.title,.webversion,.fblike,.tweet,.linkedinshare,.forwardtoafriend,.link,.address,.permission,.campaign{}.title,.webversion,.fblike,.tweet,.linkedinshare,.forwardtoafriend,.link,.address,.permission,.campaign{font-family:"Open Sans",sans-serif}.mso .title,.mso .webversion,.mso .fblike,.mso .tweet,.mso .linkedinshare,.mso .forwardtoafriend,.mso .link,.mso .address,.mso .permission,.mso .campaign{font-family:sans-serif !important}body,.wrapper,.emb-editor-canvas{background-color:#f5f7fa}.border{background-color:#dddee1}.wrapper h1{color:#44a8c7}.wrapper h2{color:#44a8c7}.wrapper h3{color:#3b3e42}.wrapper p,.wrapper ol,.wrapper ul{color:#60666d}.wrapper .image{color:#60666d}.wrapper a{color:#5c91ad}.wrapper a:hover{color:#48768e !important}.wrapper blockquote{border-left:4px solid #f5f7fa}.wrapper .three-col blockquote,.wrapper .narrower blockquote{border-left:2px solid 
#f5f7fa}.wrapper .btn a{background-color:#5c91ad;color:#fff}.wrapper .btn a:hover{color:#fff !important}.logo div{color:#555}.logo div a{color:#555}.logo div a:hover{color:#555 !important}.title,.webversion,.footer .inner td{color:#b9b9b9}.wrapper .title a,.wrapper .webversion a,.wrapper .footer a{color:#b9b9b9}.wrapper .title a:hover,.wrapper .webversion a:hover,.wrapper .footer a:hover{color:#939393 !important}.wrapper .footer .fblike,.wrapper .footer .tweet,.wrapper .footer .linkedinshare,.wrapper .footer .forwardtoafriend{background-color:#7b7c7d}
</style><meta name="robots" content="noindex,nofollow" />
<meta property="og:title" content="My First Campaign" />
</head>
<!--[if mso]>
	<body class="mso">
<![endif]-->
<!--[if !mso]><!-->
	<body class="full-padding" style="margin: 0;padding: 0;min-width: 100%;background-color: #f5f7fa;">
<!--<![endif]-->
		<center class="wrapper" style="display: table;table-layout: fixed;width: 100%;min-width: 620px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #f5f7fa;">
			<table class="header centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 600px;">
				<tbody><tr>
					<td style="padding: 0;vertical-align: top;">
						<table class="preheader" style="border-collapse: collapse;border-spacing: 0;" align="right">
							<tbody><tr>
								<td class="emb-logo-padding-box" style="padding: 0;vertical-align: top;padding-bottom: 24px;padding-top: 24px;text-align: right;width: 280px;letter-spacing: 0.01em;line-height: 17px;font-weight: 400;font-size: 11px;">
									<div class="spacer" style="font-size: 1px;line-height: 2px;width: 100%;">&nbsp;</div>
									<div class="title" style='font-family: "Open Sans",sans-serif;color: #b9b9b9;'>Message</div>
									<div class="webversion" style='font-family: "Open Sans",sans-serif;color: #b9b9b9;'>No Images? <webversion>Click here</webversion></div>
								</td>
							</tr>
						</tbody></table>
						<table style="border-collapse: collapse;border-spacing: 0;" align="left">
							<tbody><tr>
								<td class="logo emb-logo-padding-box" style="padding: 0;vertical-align: top;mso-line-height-rule: at-least;width: 280px;padding-top: 24px;padding-bottom: 24px;">
									<div class="logo-left" style="font-weight: 700;font-family: Avenir,sans-serif;color: #555;font-size: 0px !important;line-height: 0 !important;" align="left" id="emb-email-header"><img style="border: 0;-ms-interpolation-mode: bicubic;display: block;max-width: 200px;" src="{{ asset('assets/img/logo.png') }}" alt="" width="200" height="53" /></div>
								</td>
							</tr>
						</tbody></table>
					</td>
				</tr>
			</tbody></table>
			
					<table class="centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;">
						<tbody><tr>
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
							<td style="padding: 0;vertical-align: top;">
								<table class="one-col" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 600px;background-color: #ffffff;table-layout: fixed;" emb-background-style>
									<tbody><tr>
										<td class="column" style="padding: 0;vertical-align: top;text-align: left;">
											<div><div class="column-top" style="font-size: 32px;line-height: 32px;transition-timing-function: cubic-bezier(0, 0, 0.2, 1);transition-duration: 150ms;transition-property: all;">&nbsp;</div></div>
												<table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%;">
													<tbody><tr>
														<td class="padded" style="padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px;word-break: break-word;word-wrap: break-word;">
															
						<div style="line-height:15px;font-size:1px">&nbsp;</div>
					
														</td>
													</tr>
												</tbody></table>
											
												<table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%;">
													<tbody><tr>
														<td class="padded" style="padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px;word-break: break-word;word-wrap: break-word;">
															
						<h2 style='font-style: normal;font-weight: 700;Margin-bottom: 0;Margin-top: 0;font-size: 24px;line-height: 32px;font-family: "Open Sans",sans-serif;color: #44a8c7;text-align: center;'><span style="color:#0a0a0a">Message From {{ $data['name'] . '(' . $data['email'] . ')' }}</span></h2><p style='font-style: normal;font-weight: 400;Margin-bottom: 0;Margin-top: 16px;font-size: 15px;line-height: 24px;font-family: "Open Sans",sans-serif;color: #60666d;text-align: center;'>{{ $data['message'] }}</p>
					
														</td>
													</tr>
												</tbody></table>
											
											<div class="column-bottom" style="font-size: 32px;line-height: 32px;transition-timing-function: cubic-bezier(0, 0, 0.2, 1);transition-duration: 150ms;transition-property: all;">&nbsp;</div>
										</td>
									</tr>
								</tbody></table>
							</td>
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
						</tr>
					</tbody></table>
				
					<table class="border" style="border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #dddee1;Margin-left: auto;Margin-right: auto;" width="602">
						<tbody><tr class="border" style="font-size: 1px;line-height: 1px;background-color: #e3e3e3;height: 1px;">
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
							<td style="padding: 0;vertical-align: top;line-height: 1px;">&#8203;</td>
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
						</tr>
					</tbody></table>
				
					<table class="centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;">
						<tbody><tr>
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
							<td style="padding: 0;vertical-align: top;">
								<table class="one-col" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 600px;background-color: #ffffff;table-layout: fixed;" emb-background-style>
									<tbody><tr>
										<td class="column" style="padding: 0;vertical-align: top;text-align: left;">
											<div><div class="column-top" style="font-size: 32px;line-height: 32px;transition-timing-function: cubic-bezier(0, 0, 0.2, 1);transition-duration: 150ms;transition-property: all;">&nbsp;</div></div>
												<table class="contents" style="border-collapse: collapse;border-spacing: 0;table-layout: fixed;width: 100%;">
													<tbody><tr>
														<td class="padded" style="padding: 0;vertical-align: top;padding-left: 32px;padding-right: 32px;word-break: break-word;word-wrap: break-word;">
														</td>
													</tr>
												</tbody></table>
											
											<div class="column-bottom" style="font-size: 32px;line-height: 32px;transition-timing-function: cubic-bezier(0, 0, 0.2, 1);transition-duration: 150ms;transition-property: all;">&nbsp;</div>
										</td>
									</tr>
								</tbody></table>
							</td>
							<td class="border" style="padding: 0;vertical-align: top;font-size: 1px;line-height: 1px;background-color: #dddee1;width: 1px;">&#8203;</td>
						</tr>
					</tbody></table>
				
					<table class="border" style="border-collapse: collapse;border-spacing: 0;font-size: 1px;line-height: 1px;background-color: #dddee1;Margin-left: auto;Margin-right: auto;" width="602">
						<tbody><tr><td style="padding: 0;vertical-align: top;">&nbsp;</td></tr>
					</tbody></table>
				
			<table class="footer centered" style="border-collapse: collapse;border-spacing: 0;Margin-left: auto;Margin-right: auto;width: 100%;">
				<tbody><tr>
					<td style="padding: 0;vertical-align: top;">&nbsp;</td>
					<td class="inner" style="padding: 58px 0 29px 0;vertical-align: top;width: 600px;">
						<table class="right" style="border-collapse: collapse;border-spacing: 0;" align="right">
							<tbody><tr>
								<td style="padding: 0;vertical-align: top;color: #b9b9b9;font-size: 12px;line-height: 22px;max-width: 200px;mso-line-height-rule: at-least;">
									<div class="sharing">
										<div style="Margin-bottom: 5px;">
											<fblike class="fblike" style='font-family: "Open Sans",sans-serif;background-image: url(https://i3.createsend1.com/static/eb/master/03-fresh/imgf/fblike.png);background-repeat: no-repeat;background-size: 200px 56px;border-radius: 2px;color: #ffffff;display: block;font-size: 11px;font-weight: bold;line-height: 11px;padding: 8px 11px 7px 28px;text-align: left;text-decoration: none;background-color: #7b7c7d;' cs-button data-width="85" left-align-text="true">
												Like
											</fblike>
										</div>
										<div style="Margin-bottom: 5px;">
											<tweet class="tweet" style='font-family: "Open Sans",sans-serif;background-image: url(https://i4.createsend1.com/static/eb/master/03-fresh/imgf/tweet.png);background-repeat: no-repeat;background-size: 200px 56px;border-radius: 2px;color: #ffffff;display: block;font-size: 11px;font-weight: bold;line-height: 11px;padding: 8px 11px 7px 28px;text-align: left;text-decoration: none;background-color: #7b7c7d;' cs-button data-width="85" left-align-text="true">
												Tweet
											</tweet>
										</div>
										
										<div style="Margin-bottom: 5px;">
											<forwardtoafriend class="forwardtoafriend" style='font-family: "Open Sans",sans-serif;background-image: url(https://i6.createsend1.com/static/eb/master/03-fresh/imgf/forward.png);background-repeat: no-repeat;background-size: 200px 56px;border-radius: 2px;color: #ffffff;display: block;font-size: 11px;font-weight: bold;line-height: 11px;padding: 8px 11px 7px 28px;text-align: left;text-decoration: none;background-color: #7b7c7d;' cs-button data-width="85" left-align-text="true">
												Forward
											</forwardtoafriend>
										</div>
									</div>
								</td>
							</tr>
						</tbody></table>
						<table class="left" style="border-collapse: collapse;border-spacing: 0;" align="left">
							<tbody><tr>
								<td style="padding: 0;vertical-align: top;color: #b9b9b9;font-size: 12px;line-height: 22px;text-align: left;width: 400px;">
									<div class="links emb-web-links" style="line-height: 26px;Margin-bottom: 26px;mso-line-height-rule: at-least;">
										
									</div>
									<div class="address" style='font-family: "Open Sans",sans-serif;Margin-bottom: 18px;'>
										<div>Programme Chameleon<br />
City, Country, Postal Code</div>
									</div>
									<div class="permission" style='font-family: "Open Sans",sans-serif;'>
										<div>Message from customer</div>
									</div>
									<!--<div class="campaign" style='font-family: "Open Sans",sans-serif;Margin-bottom: 18px;'>
										<span>
											<preferences lang="en">Preferences</preferences>
											&nbsp;&nbsp;|&nbsp;&nbsp;
										</span>
										<unsubscribe>Unsubscribe</unsubscribe>
									</div>-->
								</td>
							</tr>
						</tbody></table>
					</td>
					<td style="padding: 0;vertical-align: top;">&nbsp;</td>
				</tr>
			</tbody></table>
		</center>
	
</body></html>