!function e(t,a,o){function n(r,s){if(!a[r]){if(!t[r]){var l="function"==typeof require&&require;if(!s&&l)return l(r,!0);if(i)return i(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var d=a[r]={exports:{}};t[r][0].call(d.exports,function(e){var a=t[r][1][e];return n(a?a:e)},d,d.exports,e,t,a,o)}return a[r].exports}for(var i="function"==typeof require&&require,r=0;r<o.length;r++)n(o[r]);return n}({"/home/ford/web/www-job/resources/assets/js/front/company.js":[function(e,t,a){"use strict";var o,n=(e("./core"),e("./plugins"),!1);if($("#companyPostJobForm")[0]){var i,o;!function(){var e=function(){return i.index(i.filter(".current"))},t=function(e){i.removeClass("current").eq(e).addClass("current"),$(".form-navigation .previous").toggle(e>0);var t=e>=i.length-1;$(".form-navigation .next").toggle(!t),$(".form-navigation [type=submit]").toggle(t),$("html, body").animate({scrollTop:o.offset().top-100},100)};i=$(".form-section"),o=$("#companyPostJobForm"),$(".form-navigation .previous").click(function(){t(e()-1)}),$(".form-navigation .next").click(function(){o.parsley().validate("block-"+e())&&t(e()+1)}),i.each(function(e,t){$(t).find(":input").attr("data-parsley-group","block-"+e)}),t(0),o.find("[type=submit]").on("click",function(e){e.preventDefault(),o.parsley().validate()&&!n&&(n=!0,$(".page-preloader").show(),o.find("[type=submit]").disable(!0),$.post(window.origin+"/job/submit-job",{data:o.serializeForm()}).done(function(e){n=!1,$(".page-preloader").hide(),o.showMessage(e.message,e.type),o.find("[type=submit]").disable(!1)}).fail(function(e,t,a){n=!1,$(".page-preloader").hide(),o.showMessage(e.responseText,"danger"),o.find("[type=submit]").disable(!1)}))})}()}if($("#companyEditJobForm")[0]){var i,o,r;!function(){var e=function(){return i.index(i.filter(".current"))},t=function(e){i.removeClass("current").eq(e).addClass("current"),$(".form-navigation .previous").toggle(e>0);var t=e>=i.length-1;$(".form-navigation .next").toggle(!t),$(".form-navigation [type=submit]").toggle(t),$("html, body").animate({scrollTop:o.offset().top-100},100)};i=$(".form-section"),o=$("#companyEditJobForm"),r=o.data("job"),$(".form-navigation .previous").click(function(){t(e()-1)}),$(".form-navigation .next").click(function(){o.parsley().validate("block-"+e())&&t(e()+1)}),i.each(function(e,t){$(t).find(":input").attr("data-parsley-group","block-"+e)}),t(0),o.find("[type=submit]").on("click",function(e){e.preventDefault(),o.parsley().validate()&&!n&&(n=!0,$(".page-preloader").show(),o.find("[type=submit]").disable(!0),$.post(window.origin+"/job/edit-job",{data:o.serializeForm(),job:r}).done(function(e){n=!1,$(".page-preloader").hide(),o.showMessage(e.message,e.type),o.find("[type=submit]").disable(!1)}).fail(function(e,t,a){n=!1,$(".page-preloader").hide(),o.showMessage(e.responseText,"danger"),o.find("[type=submit]").disable(!1)}))})}()}if($("#companyEditAccountForm")[0]&&(o=$("#companyEditAccountForm"),o.find("[type=submit]").on("click",function(e){e.preventDefault(),o.parsley().validate()&&!n&&(n=!0,$(".page-preloader").show(),o.find("[type=submit]").disable(!0),$.post(window.origin+"/company/update-account",{data:o.serializeForm()}).done(function(e){o.showMessage(e.message,e.type),o.find("[type=submit]").disable(!1),n=!1,$(".page-preloader").hide()}).fail(function(e,t,a){o.showMessage(e.responseText,"danger"),o.find("[type=submit]").disable(!1),n=!1,$(".page-preloader").hide()}))})),$("#timesheetList")[0]){var s=$("#timesheetList");s.find(".btn-give-job").on("click",function(e){e.preventDefault();var t=$(this);confirm("Give the job to this contractor?")&&!n&&(n=!0,$(".page-preloader").show(),s.find(".btn-give-job").disable(!0),$.post(window.origin+"/job/give-job",{job:t.data("job"),contractor:t.data("value")}).done(function(e){n=!1,$(".page-preloader").hide(),s.find(".btn-give-job").disable(!1),"success"===e.type?confirm(e.message)&&location.reload():alert(e.message)}).fail(function(e,t,a){alert(e.responseText),n=!1,$(".page-preloader").hide(),s.find(".btn-give-job").disable(!1)}))})}if($("#jobContractorList")[0]&&$(".btn-remove-contract").on("click",function(e){e.preventDefault();var t=$(this),a=$("#jobContractorList").data("job"),o=t.data("value");confirm("Remove this contractor from this job?")&&(n?alert("Another process is running, please wait."):(n=!0,$(".btn-remove-contract").disable(!0),$(".page-preloader").show(),$.post(window.origin+"/job/cancel-contractor",{job:a,contractor:o}).done(function(e){"success"===e.type?(alert(e.message),t.parent().parent().parent().parent().remove()):alert(e.message),n=!1,$(".btn-remove-contract").disable(!1),$(".page-preloader").hide()}).fail(function(e,t,a){alert(e.responseText),n=!1,$(".btn-remove-contract").disable(!1),$(".page-preloader").hide()})))}),$("#jobStatusChanger")[0]){var l=$("#jobStatusChanger"),c=l.data("job");l.on("change",function(){n?alert("Another process is running, please wait"):(n=!0,l.disable(!0),$(".page-preloader").show(),$.post(window.origin+"/job/status-change",{job:c,value:l.val()}).done(function(e){"success"===e.type?"open"===l.val()?l.parent().parent().parent().removeClass("panel-danger").addClass("panel-success"):l.parent().parent().parent().removeClass("panel-success").addClass("panel-danger"):alert(e.message),l.disable(!1),n=!1,$(".page-preloader").hide()}).fail(function(e,t,a){alert(e.responseText),n=!1,l.disable(!1),$(".page-preloader").hide()}))})}if($("#removeJobBtn")[0]&&$("#removeJobBtn").on("click",function(e){var t=$("#removeJobBtn");if(confirm("Remove this job? CANNOT BE UNDO.")){var a=t.data("job");n?alert("Another process is running, please wait."):(n=!0,t.disable(!0),$(".page-preloader").show(),$.post(window.origin+"/job/remove-job",{job:a}).done(function(e){"success"===e.type?(alert(e.message),location.replace(e.redirect)):alert(e.message),n=!1,t.disable(!1),$(".page-preloader").hide()}).fail(function(e,a,o){alert(e.responseText),n=!1,t.disable(!1),$(".page-preloader").hide()}))}}),$("#agencyAffiliateList")[0]){var s=$("#agencyAffiliateList");s.on("click",".btn-success",function(e){var t=$(this);if(confirm("Accept this agency as your affiliate?")&&!n){var a=t.data("id");n=!0,s.find(".btn").disable(!0),$(".page-preloader").show(),$.post(window.origin+"/company/add-affiliate",{id:a}).done(function(e){n=!1,s.find(".btn").disable(!1),$(".page-preloader").hide(),alert(e.message)}).fail(function(e,t,a){n=!1,s.find(".btn").disable(!1),$(".page-preloader").hide(),alert(e.responseText)})}}),s.on("click",".btn-danger",function(e){var t=$(this);if(confirm("Remove this agency from your affiliate list?")&&!n){var a=t.data("id");n=!0,s.find(".btn").disable(!0),$(".page-preloader").show(),$.post(window.origin+"/company/remove-affiliate",{id:a}).done(function(e){n=!1,s.find(".btn").disable(!1),$(".page-preloader").hide(),alert(e.message),"success"===e.type&&s.find('li[data-id=" '+a+'"]').remove()}).fail(function(e,t,a){n=!1,s.find(".btn").disable(!1),$(".page-preloader").hide(),alert(e.responseText)})}})}if($("#removeVipBtn")[0]&&$("#removeVipBtn").on("click",function(e){e.preventDefault(),confirm("Really Remove VIP?")&&(n||($("#removeVipBtn").disable(!0),$(".page-preloader").show(),n=!0,$.post(window.origin+"/company/remove-vip").done(function(e){alert(e.message),$("#removeVipBtn").disable(!1),$(".page-preloader").hide(),n=!1,"success"===e.type&&location.reload()}).fail(function(e,t,a){alert(e.responseText),$("#removeVipBtn").disable(!1),$(".page-preloader").hide(),n=!1})))}),$("#listNotif")[0]){var s=$("#listBotif");s.find(".btn-mark-notif").on("click",function(e){if(e.preventDefault(),!n){var t=$(this),a=t.data("id");s.find(".btn-mark-notif").disable(!0),n=!0,$.post(window.origin+"/company/update-notif",{id:a,read:!0}).done(function(e){s.find(".btn-mark-notif").disable(!1),n=!1,"success"===e.type&&s.find("li[data-id="+a+"]").remove()}).fail(function(e,t,a){s.find(".btn-mark-notif").disable(!1),n=!1})}}),$("#removeReadNotifBtn").on("click",function(e){n||($("#removeReadNotifBtn").disable(!0),n=!0,$.post(window.origin+"/company/remove-notif").done(function(e){$("#removeReadNotifBtn").disable(!1),n=!1,alert(e.message)}).fail(function(e,t,a){$("#removeReadNotifBtn").disable(!1),n=!1}))})}},{"./core":"/home/ford/web/www-job/resources/assets/js/front/core.js","./plugins":"/home/ford/web/www-job/resources/assets/js/front/plugins.js"}],"/home/ford/web/www-job/resources/assets/js/front/core.js":[function(e,t,a){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this.disable(),this.formMessage(),this.serializeForm(),this.setupAjax(),Number.prototype.formatMoney=function(e,t,a){var o=this,e=isNaN(e=Math.abs(e))?2:e,t=void 0==t?".":t,a=void 0==a?",":a,n=0>o?"-":"",i=parseInt(o=Math.abs(+o||0).toFixed(e))+"",r=(r=i.length)>3?r%3:0;return n+(r?i.substr(0,r)+a:"")+i.substr(r).replace(/(\d{3})(?=\d)/g,"$1"+a)+(e?t+Math.abs(o-i).toFixed(e).slice(2):"")}}return n(e,[{key:"disable",value:function(){$.fn.extend({disable:function(e){return this.each(function(){e?($(this).find("span").hide(),$(this).attr("disabled","disabled").find(".btn-preloader").show()):($(this).find("span").show(),$(this).removeAttr("disabled").find(".btn-preloader").hide())})}})}},{key:"formMessage",value:function(){$.fn.showMessage=function(e,t,a){var o;return o=void 0,void 0===a&&(a=""),$(".status-message").remove(),o="<div class='status-message element-top-10 "+a+"'> <div role='alert' class='fade-in alert alert-dismissable alert-"+t+"'> <button type='button' class='close' data-dismiss='alert'> <span aria-hidden='true'><i class='fa fa-times'></i></span> <span class='sr-only'>Close</span> </button>"+e+"</div></div>",$(o).appendTo(this).hide().fadeIn(900)}}},{key:"serializeForm",value:function(){$.fn.serializeForm=function(){var e,t,a,o;return e=void 0,t=void 0,a=void 0,o=void 0,this.length<1?!1:(e={},t=e,o=':input[type!="checkbox"][type!="radio"], input:checked',a=function(){var a,o,n,i;if(a=void 0,o=void 0,n=void 0,i=void 0,!this.disabled&&(i=this.name.replace(/\[([^\]]+)?\]/g,",$1").split(","),o=i.length-1,a=$(this),i[0])){for(n=0;o>n;)t=t[i[n]]=t[i[n]]||(""===i[n+1]||"0"===i[n+1]?[]:{}),n++;void 0!==t.length?t.push(a.val()):t[i[o]]=a.val(),t=e}},this.filter(o).each(a),this.find(o).each(a),e)}}},{key:"setupAjax",value:function(){$.ajaxSetup({statusCode:{403:function(e){return window.alert("Forbidden content!")},404:function(e){return window.alert("Requested route not found!")},500:function(e){return window.alert("Internal server error!")}},crossDomain:!1,dataType:"json",cache:!0,async:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}})}}]),e}();a.Core=i},{}],"/home/ford/web/www-job/resources/assets/js/front/plugins.js":[function(e,t,a){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this.initBootstrap();var t={init:"1",home_init:"1"};$("img[data-image-resize]")[0]&&$.each($("img[data-image-resize]"),function(e,t){$(t).parent().imgLiquid({fill:!0,verticalAlign:"center",horizontalAlign:"center"})}),$("#advance-search-option")[0]&&$(".advance-search-toggle").click(function(e){return $("#advance-search-option:visible").length?$("#advance-search-option").slideUp():$("#advance-search-option").slideDown(),!1});var a=$(window).width();a>767||$("li.menu-item-has-children > a").on("click",function(e){e.preventDefault(),$(this).next(".sub-menu").slideToggle("fast")}),$("#job-category-dropdown").minimalect({placeholder:"Select Job Category"}),$("#job-type-dropdown").minimalect({placeholder:"Select Job Type"}),t.init&&($("select#experience_min")[0]&&$("select#experience_max")[0]&&$("select#experience_min, select#experience_max").selectToUISlider({labels:10,labelSrc:"text",tooltip:!0}),$("select#salary_min")[0]&&$("select#salary_max")[0]&&$("select#salary_min, select#salary_max").selectToUISlider({labels:11,labelSrc:"text",tooltip:!0})),$("#job-listing-tabs").tabs({hide:{effect:"fade",duration:"fast"},show:{effect:"fade",duration:"fast"}});var a=$(window).width();if(767>a&&$("li.has-children > a").on("click",function(e){e.preventDefault(),$(this).next(".sub-menu").slideToggle("fast")}),$("#countrySelector")[0]&&this.formCountrySelectorInit(),$(".summernote")[0]&&$(".summernote").summernote({dialogsInBody:!0}),$("[data-checkout-type]")[0]){var n=!1;$.each($("[data-checkout-type]"),function(e,t){$(this).on("click",function(e){if(n)alert("Another payment is processing, please wait.");else{var t=$(this);e.preventDefault(),n=!0,$(".page-preloader").show(),t.disable(!0);var a=t.data("checkout-type"),o={};1==a?o={type:"paypal",value:a}:2==a&&(o={type:"paypal",value:a,amount:t.parent().find("input[name=_cred_amt]").val()}),$.post(window.origin+"/api/payment/process-payment",o).done(function(e){"success"===e.type?window.open(e.redirect):alert(e.message),t.disable(!1),n=!1,$(".page-preloader").hide()}).fail(function(e,a,o){n=!1,$(".page-preloader").hide(),alert(o.message),t.disable(!1)})}})})}}return n(e,[{key:"initBootstrap",value:function(){$('.panel-tooltip, [data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$(".input-daterange input").each(function(){$(this).datepicker({format:"yyyy-mm-dd",startDate:"+1d"})})}},{key:"formCountrySelectorInit",value:function(){$.ajax({type:"get",data:{type:"all"},dataType:"json",url:window.origin+"/api/country",success:function(e){for(var t in e)if(e.hasOwnProperty(t)){var a="";if(""!==$("#countrySelector").data("value")){var o=$("#countrySelector").data("value");a=e[t].Name===o?'selected="selected"':""}else a="GBR"===e[t].Code?'selected="selected"':"";$("#countrySelector").append('<option value="'+e[t].Name+'" data-code="'+e[t].Code+'" '+a+">"+e[t].Name+"</option>")}if($("#citySelector")[0]){var n=!1;$("#citySelector").empty();var i=function(){n=!0,$.ajax({type:"get",data:{value:$("#countrySelector :selected").data("code")},dataType:"json",url:window.origin+"/api/city",success:function(e){n=!1,$("#citySelector").empty();for(var t in e)if(e.hasOwnProperty(t)){var a="";if(""!==$("#citySelector").data("value")){var o=$("#citySelector").data("value");a=e[t].Name===o?'selected="selected"':""}$("#citySelector").append('<option value="'+e[t].Name+'" '+a+">"+e[t].Name+"</option>")}},error:function(e,t,a){n=!1,confirm("Cannot load "+country+"'s city list, reload?")&&location.reload()}})};i(),$("#countrySelector").on("change",function(){n?alert("Please wait while previous list was loaded."):i()})}},error:function(e,t,a){confirm("Cannot load country list, reload?")&&location.reload()}})}}]),e}();a.Plugins=i},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/company.js"]);