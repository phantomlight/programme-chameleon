!function e(t,a,n){function i(s,r){if(!a[s]){if(!t[s]){var d="function"==typeof require&&require;if(!r&&d)return d(s,!0);if(o)return o(s,!0);var l=new Error("Cannot find module '"+s+"'");throw l.code="MODULE_NOT_FOUND",l}var c=a[s]={exports:{}};t[s][0].call(c.exports,function(e){var a=t[s][1][e];return i(a?a:e)},c,c.exports,e,t,a,n)}return a[s].exports}for(var o="function"==typeof require&&require,s=0;s<n.length;s++)i(n[s]);return i}({"/home/ford/web/www-job/resources/assets/js/back/app.js":[function(e,t,a){"use strict";var n=e("./core"),i=e("./forms"),o=e("./plugins"),s=e("./tables");new n.Core,new o.Plugins,new i.Forms,new s.Tables},{"./core":"/home/ford/web/www-job/resources/assets/js/back/core.js","./forms":"/home/ford/web/www-job/resources/assets/js/back/forms.js","./plugins":"/home/ford/web/www-job/resources/assets/js/back/plugins.js","./tables":"/home/ford/web/www-job/resources/assets/js/back/tables.js"}],"/home/ford/web/www-job/resources/assets/js/back/core.js":[function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=function(){function e(){n(this,e),this.disable(),this.formMessage(),this.serializeForm(),this.setupAjax()}return i(e,[{key:"disable",value:function(){$.fn.extend({disable:function(e){return this.each(function(){e?($(this).find("span").hide(),$(this).attr("disabled","disabled").find(".btn-preloader").show()):($(this).find("span").show(),$(this).removeAttr("disabled").find(".btn-preloader").hide())})}})}},{key:"formMessage",value:function(){$.fn.showMessage=function(e,t,a){var n;return n=void 0,void 0===a&&(a=""),$(".status-message").remove(),n="<div class='status-message m-t "+a+"'> <div role='alert' class='fade-in alert alert-dismissable alert-"+t+"'> <button type='button' class='close' data-dismiss='alert'> <span aria-hidden='true'><i class='fa fa-times'></i></span> <span class='sr-only'>Close</span> </button>"+e+"</div></div>",$(n).appendTo(this).hide().fadeIn(900)}}},{key:"serializeForm",value:function(){$.fn.serializeForm=function(){var e,t,a,n;return e=void 0,t=void 0,a=void 0,n=void 0,this.length<1?!1:(e={},t=e,n=':input[type!="checkbox"][type!="radio"], input:checked',a=function(){var a,n,i,o;if(a=void 0,n=void 0,i=void 0,o=void 0,!this.disabled&&(o=this.name.replace(/\[([^\]]+)?\]/g,",$1").split(","),n=o.length-1,a=$(this),o[0])){for(i=0;n>i;)t=t[o[i]]=t[o[i]]||(""===o[i+1]||"0"===o[i+1]?[]:{}),i++;void 0!==t.length?t.push(a.val()):t[o[n]]=a.val(),t=e}},this.filter(n).each(a),this.find(n).each(a),e)}}},{key:"setupAjax",value:function(){$.ajaxSetup({statusCode:{403:function(e){return window.alert("Forbidden content!")},404:function(e){return window.alert("Requested route not found!")},500:function(e){return window.alert("Internal server error!")}},crossDomain:!1,dataType:"json",cache:!0,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}})}}]),e}();a.Core=o},{}],"/home/ford/web/www-job/resources/assets/js/back/forms.js":[function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o={key1:"VefT5WpnGT",key2:"lRYj3IbU0e",pub_key:window.origin+"/gen",handshake:window.origin+"/handshake"},s={login:window.origin+"/admin/login"},r=function(){function e(){n(this,e),$("#adminLoginForm")[0]&&this.initAdminLoginForm("#adminLoginForm"),$(".form-action-add")[0]&&this.initCommonAddForm(),$(".form-action-edit")[0]&&this.initCommonEditForm()}return i(e,[{key:"initAdminLoginForm",value:function(e){var t=!1,a=$(e);a.find("[type=submit]").on("click",function(e){e.preventDefault();var n;return!a.parsley().validate()||t?void a.showMessage("Logging you in","info"):(t=!0,$(".page-preloader").show(),n=$.jCryption.encrypt(o.key1,o.key2),$.jCryption.authenticate(n,o.pub_key,o.handshake,function(){a.find("[type=submit]").disable(!0),$.post(s.login,{data:JSON.stringify($.jCryption.encrypt(a.serialize(),n))}).done(function(e){t=!1,$(".page-preloader").hide(),a.showMessage(e.message,e.type),"success"===e.type?window.location.replace(e.redirect):a.find("[type=submit]").disable(!1)}).fail(function(e,n,i){t=!1,$(".page-preloader").hide(),a.showMessage(e.responseText,"danger"),a.find("[type=submit]").disable(!1)})}),!1)})}},{key:"initCommonAddForm",value:function(){var e=!1,t=["image/gif","image/jpeg","image/pjpeg","image/png"],a=null;$("button[type=cancel]").on("click",function(e){e.preventDefault(),$(".form-action-add")[0].reset()}),$("input[type=file]")[0]&&$("input[type=file]").on("change",function(){this.files[0].size>5e6?($(this).parent().showMessage("File cannot be larger than 5mb !","danger"),a=null):-1===$.inArray(this.files[0].type,t)?($(this).parent().showMessage("File cannot be uploaded !","danger"),a=null):($(this).parent().showMessage('<i class="fa fa-check"></i> File can be uploaded',"success"),a=this.files[0])}),$(".form-action-add").find("[type=submit]").on("click",function(t){t.preventDefault();var n=$(".form-action-add"),i=n.find("input[data-route]").val();if(!n.parsley().validate()||e)return void n.showMessage("Something wrong!","info");e=!0,$(".page-preloader").show();var o=new FormData;if(o.append("data",JSON.stringify(n.serializeForm())),$("input[type=file]")[0]&&o.append("image",a),$(".summernote")[0]){var s={};$(".summernote").each(function(e){s[$(this).attr("data-id")]=$(this).code()}),o.append("longText",JSON.stringify(s))}return n.find("input, textarea, select, button").attr("disabled","disabled"),n.find("button, .btn, input").addClass("disabled").attr("disabled","disabled"),n.find("[type=submit]").disable(!0),$.ajax({method:"post",url:i,data:o,crossDomain:!1,dataType:"json",cache:!0,processData:!1,contentType:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}}).done(function(t){e=!1,$(".page-preloader").hide(),n.showMessage(t.message,t.type),n.find("input, textarea, select, button").removeClass("disabled").removeAttr("disabled"),n.find("[type=submit]").disable(!1),"success"===t.type&&(n[0].reset(),"true"===n.find("input[data-route]").attr("data-reload")&&setTimeout(function(){location.reload()},3e3))}).fail(function(t,a,i){e=!1,$(".page-preloader").hide(),n.showMessage(t.responseText,"danger"),n.find("input, textarea, select, button").removeClass("disabled").removeAttr("disabled"),n.find("[type=submit]").disable(!1)}),!1})}},{key:"initCommonEditForm",value:function(){var e=!1,t=["image/gif","image/jpeg","image/pjpeg","image/png"],a=null;$("button[type=cancel]").on("click",function(e){e.preventDefault(),$(".form-action-edit")[0].reset()}),$("input[type=file]")[0]&&$("input[type=file]").on("change",function(){this.files[0].size>5e6?($(this).parent().showMessage("File cannot be larger than 3Mb !","danger"),a=null):-1===$.inArray(this.files[0].type,t)?($(this).parent().showMessage("File cannot be uplaoded !","danger"),a=null):($(this).parent().showMessage('<i class="fa fa-check"></i> File allowed',"success"),a=this.files[0])}),$(".form-action-edit").find("[type=submit]").on("click",function(t){t.preventDefault();var n=$(".form-action-edit"),i=n.find("input[data-route]").val();if(!n.parsley().validate()||e)return void n.showMessage("Something wrong!","info");e=!0,$(".page-preloader").show();var o=new FormData;if(o.append("data",JSON.stringify(n.serializeForm())),$("input[type=file]")[0]&&o.append("image",a),$(".summernote")[0]){var s={};$(".summernote").each(function(e){s[$(this).attr("data-id")]=$(this).code()}),o.append("longText",JSON.stringify(s))}return n.find("input, textarea, select, button").attr("disabled","disabled"),n.find("button, .btn, input").addClass("disabled").attr("disabled","disabled"),n.find("[type=submit]").disable(!0),$.ajax({method:"post",url:i,data:o,crossDomain:!1,dataType:"json",cache:!0,processData:!1,contentType:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}}).done(function(t){e=!1,$(".page-preloader").hide(),n.showMessage(t.message,t.type),n.find("input, textarea, select, button").removeClass("disabled").removeAttr("disabled"),n.find("[type=submit]").disable(!1),"success"===t.type&&(n[0].reset(),"true"===n.find("input[data-route]").attr("data-reload")&&setTimeout(function(){location.reload()},3e3))}).fail(function(t,a,i){e=!1,$(".page-preloader").hide(),n.showMessage(t.responseText,"danger"),n.find("input, textarea, select, button").removeClass("disabled").removeAttr("disabled"),n.find("[type=submit]").disable(!1)}),!1})}}]),e}();a.Forms=r},{}],"/home/ford/web/www-job/resources/assets/js/back/plugins.js":[function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),o=function(){function e(){function t(){!$("body").hasClass("mini-navbar")||$("body").hasClass("body-small")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(500)},100)):$("body").hasClass("fixed-sidebar")?($("#side-menu").hide(),setTimeout(function(){$("#side-menu").fadeIn(500)},300)):$("#side-menu").removeAttr("style")}function a(){var e=$("body > #wrapper").height()-61;$(".sidebard-panel").css("min-height",e+"px");var t=$("nav.navbar-default").height(),a=$("#page-wrapper").height();t>a&&$("#page-wrapper").css("min-height",t+"px"),a>t&&$("#page-wrapper").css("min-height",$(window).height()+"px"),$("body").hasClass("fixed-nav")&&$("#page-wrapper").css("min-height",$(window).height()-60+"px")}n(this,e),this.initBootstrap(),$(".ibox-tools")[0]&&this.initIbox(),$("#side-menu")[0]&&$("#side-menu").metisMenu(),$(document).width()<769?$("body").addClass("body-small"):$("body").removeClass("body-small"),$(".navbar-minimalize").click(function(){$("body").toggleClass("mini-navbar"),t()}),a(),$(window).bind("load",function(){$("body").hasClass("fixed-sidebar")&&$(".sidebar-collapse").slimScroll({height:"100%",railOpacity:.9})}),$(".summernote")[0]&&$(".summernote").summernote({dialogsInBody:!0})}return i(e,[{key:"initBootstrap",value:function(){$('[data-toggle="tooltip"]').tooltip(),$('[data-toggle="popover"]').popover(),$(".modal").appendTo("body"),$("#datepicker")[0]&&$("#datepicker").find("input").datepicker({clearBtn:!0,format:"yyyy-mm-dd"})}},{key:"initIbox",value:function(){$(".collapse-link").click(function(){var e=$(this).closest("div.ibox"),t=$(this).find("i"),a=e.find("div.ibox-content");a.slideToggle(200),t.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down"),e.toggleClass("").toggleClass("border-bottom"),setTimeout(function(){e.resize(),e.find("[id^=map-]").resize()},50)}),$(".close-link").click(function(){var e=$(this).closest("div.ibox");e.remove()})}}]),e}();a.Plugins=o},{}],"/home/ford/web/www-job/resources/assets/js/back/tables.js":[function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0});var i=function o(){n(this,o);var e=!0;$(".footable-init")[0]&&$(".footable-init").each(function(t){var a=$(this),n=null,i=a.attr("data-remove-link");a.find(".check-all").click(function(e){$(this).is(":checked")?a.find("input:checkbox").each(function(e){$(this).prop("checked",!0)}):a.find("input:checkbox").each(function(e){$(this).prop("checked",!1)})}),$("#configTableMenu a").on("click",function(e){var t=$("#configTableMenu").attr("data-target"),o=$(this).attr("data-value");if("remove"===o){if(confirm("Remove checked data? Cannot be undo")){var s=[];a.find("input[type=checkbox]:checked").not(".check-all").each(function(e){s.push($(this).val())}),$.post(i,{i:s}).done(function(e){n.trigger("footable_redraw"),alert(e.message)}).fail(function(e,t,a){n.trigger("footable_redraw"),alert(e.responseText)})}}else $("#"+t).tableExport({type:o,escape:"false"})}),$(".ft-form").on("submit",function(t){var o=$(this);o.parsley().validate()&&(e=!0,$(".page-preloader").show(),$.get(a.attr("data-route"),{data:o.serializeForm()}).done(function(t){e=!1,$(".page-preloader").hide(),a.find("tbody").empty();for(var o=0;o<t.length;o++){var s=t[o],r="<tr>";$("th[data-sort]").each(function(){var e=$(this).attr("data-id");"id"===e?r+='<td><input type="checkbox" value="'+s.id+'" /></td>':"actions"===e?(r+='<td><div class="btn-group">',s.hasOwnProperty("viewLink")&&(r+='<a class="btn btn-xs btn-white" href="'+s.viewLink+'">View</a>'),s.hasOwnProperty("editLink")&&(r+='<a class="btn btn-xs btn-white" href="'+s.editLink+'">Edit</a>'),s.hasOwnProperty("removeLink")&&(r+='<a class="btn btn-xs btn-white" data-action="remove" data-id="'+s.id+'">Remove</a>'),r+="</div></td>"):r+="<td>"+s[e]+"</td>"}),r+="</td>",a.find("tbody").append(r),n.trigger("footable_redraw")}$('[data-action="remove"]').on("click",function(t){confirm("Remove data? Cannot be undo")&&(e=!0,$(".page-preloader").show(),$.post(i,{i:$(this).attr("data-id")}).done(function(t){e=!1,$(".page-preloader").hide(),alert(t.message),"success"===t.type&&location.reload()}).fail(function(t,a,i){e=!1,$(".page-preloader").hide(),n.trigger("footable_redraw"),alert(t.responseText)}))})}).fail(function(t,a,n){alert(n.responseText),e=!1,$(".page-preloader").hide()}))}),n=a.footable({columns:$.get(a.attr("data-route")).done(function(t){a.find("tbody").empty();for(var o=0;o<t.length;o++){var s=t[o],r="<tr>";$("th[data-sort]").each(function(){var e=$(this).attr("data-id");"id"===e?r+='<td><input type="checkbox" value="'+s.id+'" /></td>':"actions"===e?(r+='<td><div class="btn-group">',s.hasOwnProperty("viewLink")&&(r+='<a class="btn btn-xs btn-white" href="'+s.viewLink+'">View</a>'),s.hasOwnProperty("editLink")&&(r+='<a class="btn btn-xs btn-white" href="'+s.editLink+'">Edit</a>'),s.hasOwnProperty("removeLink")&&(r+='<a class="btn btn-xs btn-white" data-action="remove" data-id="'+s.id+'">Remove</a>'),r+="</div></td>"):r+="<td>"+s[e]+"</td>"}),r+="</td>",a.find("tbody").append(r),n.trigger("footable_redraw")}$('[data-action="remove"]').on("click",function(t){confirm("Remove data? Cannot be undo")&&(e=!0,$(".page-preloader").show(),$.post(i,{i:$(this).attr("data-id")}).done(function(t){alert(t.message),e=!1,$(".page-preloader").hide(),"success"===t.type&&location.reload()}).fail(function(t,a,i){n.trigger("footable_redraw"),e=!1,$(".page-preloader").hide(),alert(t.responseText)}))})}).fail(function(t,a,n){alert(n.responseText),e=!1,$(".page-preloader").hide()})}),n=a.footable()}),$(".footable-simple")[0]&&$(".footable-simple").footable()};a.Tables=i},{}]},{},["/home/ford/web/www-job/resources/assets/js/back/app.js"]);