!function e(t,n,o){function a(r,s){if(!n[r]){if(!t[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(i)return i(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=n[r]={exports:{}};t[r][0].call(d.exports,function(e){var n=t[r][1][e];return a(n?n:e)},d,d.exports,e,t,n,o)}return n[r].exports}for(var i="function"==typeof require&&require,r=0;r<o.length;r++)a(o[r]);return a}({"/home/ford/web/www-job/resources/assets/js/front/app.js":[function(e,t,n){"use strict";var o=e("./core"),a=e("./forms"),i=e("./plugins");new o.Core,new i.Plugins,new a.Forms},{"./core":"/home/ford/web/www-job/resources/assets/js/front/core.js","./forms":"/home/ford/web/www-job/resources/assets/js/front/forms.js","./plugins":"/home/ford/web/www-job/resources/assets/js/front/plugins.js"}],"/home/ford/web/www-job/resources/assets/js/front/core.js":[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this.disable(),this.formMessage(),this.serializeForm(),this.setupAjax(),Number.prototype.formatMoney=function(e,t,n){var o=this,e=isNaN(e=Math.abs(e))?2:e,t=void 0==t?".":t,n=void 0==n?",":n,a=0>o?"-":"",i=parseInt(o=Math.abs(+o||0).toFixed(e))+"",r=(r=i.length)>3?r%3:0;return a+(r?i.substr(0,r)+n:"")+i.substr(r).replace(/(\d{3})(?=\d)/g,"$1"+n)+(e?t+Math.abs(o-i).toFixed(e).slice(2):"")}}return a(e,[{key:"disable",value:function(){$.fn.extend({disable:function(e){return this.each(function(){e?($(this).find("span").hide(),$(this).attr("disabled","disabled").find(".btn-preloader").show()):($(this).find("span").show(),$(this).removeAttr("disabled").find(".btn-preloader").hide())})}})}},{key:"formMessage",value:function(){$.fn.showMessage=function(e,t,n){var o;return o=void 0,void 0===n&&(n=""),$(".status-message").remove(),o="<div class='status-message element-top-10 "+n+"'> <div role='alert' class='fade-in alert alert-dismissable alert-"+t+"'> <button type='button' class='close' data-dismiss='alert'> <span aria-hidden='true'><i class='fa fa-times'></i></span> <span class='sr-only'>Close</span> </button>"+e+"</div></div>",$(o).appendTo(this).hide().fadeIn(900)}}},{key:"serializeForm",value:function(){$.fn.serializeForm=function(){var e,t,n,o;return e=void 0,t=void 0,n=void 0,o=void 0,this.length<1?!1:(e={},t=e,o=':input[type!="checkbox"][type!="radio"], input:checked',n=function(){var n,o,a,i;if(n=void 0,o=void 0,a=void 0,i=void 0,!this.disabled&&(i=this.name.replace(/\[([^\]]+)?\]/g,",$1").split(","),o=i.length-1,n=$(this),i[0])){for(a=0;o>a;)t=t[i[a]]=t[i[a]]||(""===i[a+1]||"0"===i[a+1]?[]:{}),a++;void 0!==t.length?t.push(n.val()):t[i[o]]=n.val(),t=e}},this.filter(o).each(n),this.find(o).each(n),e)}}},{key:"setupAjax",value:function(){$.ajaxSetup({statusCode:{403:function(e){return window.alert("Forbidden content!")},404:function(e){return window.alert("Requested route not found!")},500:function(e){return window.alert("Internal server error!")}},crossDomain:!1,dataType:"json",cache:!0,async:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}})}}]),e}();n.Core=i},{}],"/home/ford/web/www-job/resources/assets/js/front/forms.js":[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i={key1:"VefT5WpnGT",key2:"lRYj3IbU0e",pub_key:window.origin+"/gen",handshake:window.origin+"/handshake"},r=function(){function e(){if(o(this,e),$("#companyPostJobForm")[0]){var t,n;!function(){var e=function(){return t.index(t.filter(".current"))},o=function(e){t.removeClass("current").eq(e).addClass("current"),$(".form-navigation .previous").toggle(e>0);var n=e>=t.length-1;$(".form-navigation .next").toggle(!n),$(".form-navigation [type=submit]").toggle(n),$("html, body").animate({scrollTop:$("#companyPostJobForm").offset().top-100},100)};t=$(".form-section"),n=$("#companyPostJobForm"),$(".form-navigation .previous").click(function(){o(e()-1)}),$(".form-navigation .next").click(function(){n.parsley().validate("block-"+e())&&o(e()+1)}),t.each(function(e,t){$(t).find(":input").attr("data-parsley-group","block-"+e)}),o(0)}()}$("#register-form")[0]&&this.initRegisterForm(),$("#login-form")[0]&&this.initLoginForm(),$("#contractorAccountForm")[0]&&this.initContractorAccountForm(),$("#contractorJobAlertForm")[0]&&this.initContractorJobAlertForm()}return a(e,[{key:"initRegisterForm",value:function(){var e,t=$("#register-form"),n=!1,o=t.data("route");t.find("[type=submit]").on("click",function(a){t.parsley().validate()&&!n&&(n=!0,e=$.jCryption.encrypt(i.key1,i.key2),t.find("[type=submit]").disable(!0),$.jCryption.authenticate(e,i.pub_key,i.handshake,function(){$.post(o,{data:JSON.stringify($.jCryption.encrypt(t.serialize(),e))}).done(function(e){n=!1,t.showMessage(e.message,e.type),t.find("[type=submit]").disable(!1)}).fail(function(e,o,a){n=!1,t.showMessage(e.responseText,"danger"),t.find("[type=submit]").disable(!1)})}))})}},{key:"initLoginForm",value:function(){var e,t=$("#login-form"),n=!1,o=t.data("route");t.find("[type=submit]").on("click",function(a){t.parsley().validate()&&!n&&(n=!0,e=$.jCryption.encrypt(i.key1,i.key2),t.find("[type=submit]").disable(!0),$.jCryption.authenticate(e,i.pub_key,i.handshake,function(){$.post(o,{data:JSON.stringify($.jCryption.encrypt(t.serialize(),e))}).done(function(e){n=!1,t.showMessage(e.message,e.type),t.find("[type=submit]").disable(!1),"success"===e.type&&location.replace(e.redirect)}).fail(function(e,o,a){n=!1,t.showMessage(e.responseText,"danger"),t.find("[type=submit]").disable(!1)})}))})}},{key:"initContractorAccountForm",value:function(){var e=!1,t=$("#contractorAccountForm"),n='<div class="row element-top-10"><div class="col-md-3"><input type="text" name="exp_company" class="form-control" placeholder="Company" /></div><div class="col-md-3"><input type="text" name="exp_year" class="form-control" placeholder="Year" /></div><div class="col-md-3"><input type="text" name="exp_salary" class="form-control" placeholder="Salary" /></div><div class="col-md-3"><input type="text" name="exp_position" class="form-control" placeholder="Position" /></div><div class="element-top-10">&nbsp;</div><div class="col-sm-10"><textarea class="form-control" name="exp_desc" maxlength="2000">Explain a little about your job duties.</textarea></div><div class="col-sm-2"><button class="btn btn-danger btn-xs">Remove</button></div></div>',o='<div class="row element-top-10"><div class="col-md-3"><input type="text" name="edu_name" class="form-control" placeholder="Institution Name" /></div><div class="col-md-3"><input type="text" name="edu_type" class="form-control" placeholder="ex. Design/Engineering/Business" /></div><div class="col-md-3"><input type="text" name="edu_gpa" class="form-control" placeholder="GPA/Score" /></div><div class="col-md-3"><input type="text" name="edu_qualification" class="form-control" placeholder="ex. Ph.D" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>',a='<div class="row element-top-10"><div class="col-md-5"><input type="text" name="web_name" class="form-control" placeholder="Name of the web" /></div><div class="col-md-5"><input type="text" name="web_adress" class="form-control" placeholder="http://www.programmechameleon.com" /></div><div class="col-sm-2 element-top-10"><button class="btn btn-danger btn-xs">Remove</button></div></div>',i=["image/gif","image/jpeg","image/pjpeg","image/png"],r=["application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];$("input[name=file_cv]").on("change",function(){if(this.files[0].size>5e6)$(this).parent().showMessage("File cannot be more than 5Mb.","danger");else if(-1===$.inArray(this.files[0].type,r))$(this).parent().showMessage("Can only upload .doc or .docx files.","danger");else if(e)alert("Another upload process is running, please wait.");else{e=!0;var n=new FormData;n.append("file",this.files[0]),$.ajax({method:"post",url:window.origin+"/contractor/update-resume",data:n,crossDomain:!1,dataType:"json",cache:!0,processData:!1,contentType:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}}).done(function(n){e=!1,alert(n.message),t.showMessage(n.message,n.type)}).fail(function(n,o,a){e=!1,alert(n.responseText),t.showMessage(n.responseText,"danger")})}}),$("input[name=image]").on("change",function(){if(this.files[0].size>5e6)$(this).parent().showMessage("File cannot be more than 5Mb.","danger");else if(-1===$.inArray(this.files[0].type,i))$(this).parent().showMessage("Can only upload .jpg, .gif, or .png files.","danger");else if(e)alert("Another upload process is running, please wait.");else{e=!0;var n=new FormData;n.append("file",this.files[0]),$.ajax({method:"post",url:window.origin+"/contractor/update-avatar",data:n,crossDomain:!1,dataType:"json",cache:!0,processData:!1,contentType:!1,headers:{"X-CSRF-Token":$('meta[name="_t"]').attr("content")}}).done(function(n){e=!1,alert(n.message),"success"===n.type&&$("img.tmp-img").attr("src",n.image),t.showMessage(n.message,n.type)}).fail(function(n,o,a){e=!1,alert(n.responseText),t.showMessage(n.responseText,"danger")})}}),$("#expContainer").find("button#addExp").on("click",function(e){e.preventDefault(),$("#expContainer").append(n)}),$("#eduContainer").find("button#addEducation").on("click",function(e){e.preventDefault(),$("#eduContainer").append(o)}),$("#urlContainer").find("button#addWebsite").on("click",function(e){e.preventDefault(),$("#urlContainer").append(a)}),$("#expContainer").on("click","button.btn-danger",function(e){confirm("Remove this experience data? Cannot be undo.")&&$(this).parent().parent().remove()}),$("#eduContainer").on("click","button.btn-danger",function(e){confirm("Remove this education data? Cannot be undo.")&&$(this).parent().parent().remove()}),$("#urlContainer").on("click","button.btn-danger",function(e){confirm("Remove this website data? Cannot be undo.")&&$(this).parent().parent().remove()}),t.find("[type=submit]").on("click",function(n){if(n.preventDefault(),e)alert("Another upload process is running, please wait.");else{e=!0,t.find("[type=submit]").disable(!0);var o=[],a=[],i=[];$("#eduContainer .row").each(function(e){var t={name:$(this).find("input[name=edu_name]").val(),type:$(this).find("input[name=edu_type]").val(),gpa:$(this).find("input[name=edu_gpa]").val(),qualification:$(this).find("input[name=edu_qualification]").val()};o.push(t)}),$("#expContainer .row").each(function(e){var t={company:$(this).find("input[name=exp_company]").val(),year:$(this).find("input[name=exp_year]").val(),position:$(this).find("input[name=exp_position]").val(),salary:$(this).find("input[name=exp_salary]").val(),description:$(this).find("textarea[name=exp_desc]").val()};a.push(t)}),$("#urlContainer .row").each(function(e){var t={name:$(this).find("input[name=web_name]").val(),address:$(this).find("input[name=web_adress]").val()};i.push(t)}),$.post(window.origin+"/contractor/update-account",{data:t.serializeForm(),description:$(".summernote").code(),eduData:JSON.stringify(o),expData:JSON.stringify(a),urlData:JSON.stringify(i)}).done(function(n){e=!1,t.showMessage(n.message,n.type),alert(n.message),t.find("[type=submit]").disable(!1)}).fail(function(n,o,a){e=!1,alert(n.responseText),t.showMessage(n.responseText,"danger"),t.find("[type=submit]").disable(!1)})}})}},{key:"initContractorJobAlertForm",value:function(){var e=$("#contractorJobAlertForm"),t=!1;e.find("[type=submit]").on("click",function(n){n.preventDefault(),e.parsley().validate()&&!t?(e.find("[type=submit]").disable(!0),t=!0,$.post(window.origin+"/contractor/job-alert",{data:e.serializeForm()}).done(function(n){t=!1,e.showMessage(n.message,n.type),e.find("[type=submit]").disable(!1)}).fail(function(n,o,a){t=!1,e.showMessage(n.responseText,"danger"),e.find("[type=submit]").disable(!1)})):e.showMessage("Another process is running.","info")})}}]),e}();n.Forms=r},{}],"/home/ford/web/www-job/resources/assets/js/front/plugins.js":[function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),i=function(){function e(){o(this,e),this.initBootstrap();var t={init:"1",home_init:"1"};$("img[data-image-resize]")[0]&&$.each($("img[data-image-resize]"),function(e,t){$(t).parent().imgLiquid({fill:!0,verticalAlign:"center",horizontalAlign:"center"})}),$("#advance-search-option")[0]&&$(".advance-search-toggle").click(function(e){return $("#advance-search-option:visible").length?$("#advance-search-option").slideUp():$("#advance-search-option").slideDown(),!1});var n=$(window).width();n>767||$("li.menu-item-has-children > a").on("click",function(e){e.preventDefault(),$(this).next(".sub-menu").slideToggle("fast")}),$("#job-category-dropdown").minimalect({placeholder:"Select Job Category"}),$("#job-type-dropdown").minimalect({placeholder:"Select Job Type"}),t.init&&($("select#experience_min")[0]&&$("select#experience_max")[0]&&$("select#experience_min, select#experience_max").selectToUISlider({labels:10,labelSrc:"text",tooltip:!0}),$("select#sallary_min")[0]&&$("select#sallary_max")[0]&&$("select#sallary_min, select#sallary_max").selectToUISlider({labels:11,labelSrc:"text",tooltip:!0})),$("#job-listing-tabs").tabs({hide:{effect:"fade",duration:"fast"},show:{effect:"fade",duration:"fast"}});var n=$(window).width();767>n&&$("li.has-children > a").on("click",function(e){e.preventDefault(),$(this).next(".sub-menu").slideToggle("fast")}),$("#countrySelector")[0]&&this.formCountrySelectorInit(),$(".summernote")[0]&&$(".summernote").summernote({dialogsInBody:!0})}return a(e,[{key:"initBootstrap",value:function(){$(".panel-tooltip").tooltip(),$('[data-toggle="popover"]').popover(),$(".input-daterange input").each(function(){$(this).datepicker({format:"yyyy-mm-dd",startDate:"+1d"})})}},{key:"formCountrySelectorInit",value:function(){$.ajax({type:"get",data:{type:"all"},dataType:"json",url:window.origin+"/api/country",success:function(e){for(var t in e)if(e.hasOwnProperty(t)){var n="GBR"===e[t].Code?'selected="selected"':"";$("#countrySelector").append('<option value="'+e[t].Code+'" '+n+">"+e[t].Name+"</option>")}if($("#citySelector")[0]){var o=!1;$("#citySelector").empty();var a=function(){o=!0,$.ajax({type:"get",data:{value:$("#countrySelector").val()},dataType:"json",url:window.origin+"/api/city",success:function(e){o=!1,$("#citySelector").empty();for(var t in e)e.hasOwnProperty(t)&&$("#citySelector").append('<option value="'+e[t].Name+'">'+e[t].Name+"</option>")},error:function(e,t,n){o=!1,confirm("Cannot load "+country+"'s city list, reload?")&&location.reload()}})};a(),$("#countrySelector").on("change",function(){o?alert("Please wait while previous list was loaded."):a()})}},error:function(e,t,n){confirm("Cannot load country list, reload?")&&location.reload()}})}}]),e}();n.Plugins=i},{}]},{},["/home/ford/web/www-job/resources/assets/js/front/app.js"]);