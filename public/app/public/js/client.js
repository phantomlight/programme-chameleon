var final_transcript = '';
var recognizing = false;
var last10Messages = [];

if ( ! ('webkitSpeechRecognition' in window)) {
	console.log('Speech input is not available.');
}
else {
	var recoginition = new webkitSpeechRecognition();
	recoginition.continuous = true;
	recoginition.interimResults = true;

	recoginition.onstart = function () {
		recognizing = true;
	};

	recoginition.onresult = function (e) {
		var interim_transcript = '';
		for (var i = e.resultIndex; i < e.results.length; ++i) {
			if (e.results[i].isFinal) {
				final_transcript += e.results[i][0].transcript;
				$('#msg').addClass('final');
				$('#msg').removeClass('interim');
			}
			else {
				interim_transcript += e.results[i][0].transcript;
				$('#msg').val(interim_transcript);
				$('#msg').addClass('interim');
				$('#msg').removeClass('final');
			}
		}
		$('#msg').val(final_transcript);
	};
}

function startButton(e) {
	if (recognizing) {
		recoginition.stop();
		recognizing = false;
		$('#start_button').prop('value', 'Record');
		return;
	}

	final_transcript = '';
	recoginition.lang = "en-GB";
	recoginition.start();
	$('#start_button').prop('value', 'Recording...Click to stop.');
	$('#msg').val();
}

function toggleNameForm() {
	$('#login-screen').toggle();
}

function toggleChatWindow() {
	$('#main-chat-screen').toggle();
}

function zeroPad(num, size) {
	var s = num + "";
	while (s.length < size) {
		s = "0" + s;
	}
	return s;
}

function timeFormat(msTime) {
	var d = new Date(msTime);
	return zeroPad(d.getHours(), 2) + ":" + zeroPad(d.getMinutes(), 2) + ":" + zeroPad(d.getSeconds(), 2) + " ";
}

$(document).ready(function() {
	var socket = io.connect("127.0.0.5:3000");
	var myRoomID = null;

	$('form').submit(function (e) {
		e.preventDefault();
	});

	$('#converstation').bind("DOMSubtreeModified", function () {
		$('#converstation').animate({
			scrollTop: $('#converstation')[0].scrollHeight
		});
	});

	$('#main-chat-screen').hide();
	$('#errors').hide();
	$('#name').focus();
	$('#join').attr('disabled', 'disabled');

	if ($('#name').val() === "") {
		$('#join').attr('disabled', 'disabled');
	}

	$('#name').keypress(function () {
		var name = $('#name').val();
		if (name.length < 2) {
			$('#join').attr('disabled', 'disabled');
		}
		else {
			$('#errors').empty().hide();
			$('#join').removeAttr('disabled');
		}
	});

	$("#nameForm").submit(function() {
		var name = $("#name").val();
		var device = "desktop";
		if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
			device = "mobile";
		}
		if (name === "" || name.length < 2) {
			$("#errors").empty();
			$("#errors").append("Please enter a name");
			$("#errors").show();
		} else {
			socket.emit("joinserver", name, device);
			toggleNameForm();
			toggleChatWindow();
			$("#msg").focus();
		}
	});

	$('#chatForm').submit(function () {
		var msg = $('#msg').val();
		if (msg !== "") {
			socket.emit("send", new Date().getTime(), msg);
			$('#msg').val("");
		}
	});

	var typing = false;
	var timeout = undefined;

	function timeoutFunction() {
		typing = false;
		socket.emit("typing", false);
	}

	$('#msg').keypress(function (e) {
		if (e.which !== 13) {
			if (typing === false && myRoomID !== null && $('#msg').is(":focus")) {
				typing = true;
				socket.emit("typing", true);
			}
			else {
				clearTimeout(timeout);
				timeout = setTimeout(timeoutFunction, 5000);
			}
		}
	});

	$('#showCreateRoom').click(function() {
		$('#createRoomForm').toggle();
	});

	$('#createRoomBtn').click(function() {
		var roomExists = false;
		var roomName = $('#createRoomName').val();
		socket.emit("check", roomName, function (data) {
			roomExists = data.result;
			if (roomExists) {
				$('#errors').empty().show();
				$('#errors').append("Room <i>" + roomName + "</i> already exists");
			}
			else {
				if (roomName.length > 0) {
					socket.emit("createRoom", roomName);
					$('#errors').empty().hide();
				}
			}
		});
	});

	$('#rooms').on('click', '.joinRoomBtn', function () {
		var roomName = $(this).siblings('span').text();
		var roomID = $(this).attr('id');
		socket.emit("joinRoom", roomID);
	}); 

	$('#rooms').on('click', '.removeRoomBtn', function () {
		var roomName = $(this).siblings('span').text();
		var roomID = $(this).attr('id');
		socket.emit("removeRoom", roomID);
		$('#createRoom').show();
	});

	$('#leave').click(function () {
		var roomID = myRoomID;
		socket.emit("leaveRoom", roomID);
		$('#createRoom').show();
	});

	$('#people').on('click', '.whisper', function () {
		var name = $(this).siblings('span').text();
		$('#msg').val('w:' + name + ':');
		$('#msg').focus();
	});

	/**
	 * Sockets
	 */

	socket.on("isTyping", function (data) {
		if (data.isTyping) {
			if ( $("#" + data.person + "").length === 0) {
				$("#updates").append("<li id=" + data.person + "><span class='text-muted'><small><i class='fa fa-keyboard-o'></i> " + data.person + " is typing</small></span></li>");
				timeout = setTimeout(timeoutFunction, 5000);
			}
			else {
				$("#" + data.person + "").remove();
			}
		}
	});

	socket.on("exists", function (data) {
		$('#errors').empty().show();
		$('#errors').append(data.msg + " Try <strong>" + data.proposedName + "</strong>");
		toggleNameForm();
		toggleChatWindow();
	});

	socket.on("joined", function () {
		$('#errors').hide();
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(positionSuccess, positionError, {enableHighAccuracy: true});
		}
		else {
			$('#errors').show();
			$('#errors').append("Your browser is old and does not support geolocation.");
		}
	});

	function positionError(e) {
		console.log(e);
	}

	function positionSuccess(pos) {
		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;

		$.ajax({
			type: "get",
			url: "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"+lat+"%2C"+lon+"%22%20and%20gflags%3D%22R%22&format=json",
			dataType: "json",
			success: function (data) {
				socket.emit("countryUpdate", {
					country: data.query.results.Result.countryCode
				});
			},
			error: function (xhr, status, e) {
				console.log(xhr.responseText);
			}
		});
	}

	socket.on("history", function (data) {
		if (data.length !== 0) {
			$('#msgs').append("<li><strong><span class='text-warning'>Last 10 messages:</span></strong></li>");
			$.each(data, function (data, msg) {
				$('#msgs').append("<li><span class='text-warning'>" + msg + "</span></li>");
			});
		}
		else {
			$('#msgs').append("<li><strong><span class='text-warning'>No past messages in this room.</span></strong></li>");
		}
	});

	socket.on("update", function (msg) {
		$('#msgs').append("<li>" + msg + "</li>");
	});

	socket.on("update-people", function (data) {
		$('#people').empty();
		$('#people').append("<li class=\"list-group-item active\">People online <span class=\"badge\">" + data.count + "</span></li>");
		$.each(data.people, function(a, obj) {
			if ( !("country" in obj) ) {
				html = "";
			}
			else {
				html = "<img class=\"flag flag-" + obj.country + "\"/>";
			}
			$('#people').append("<li class=\"list-group-item\"><span>" + obj.name + "</span> <i class=\"fa fa-"+obj.device+"\"></i> " + html + " <a href=\"#\" class=\"whisper btn btn-xs\">whisper</a></li>");
		});
	});

	socket.on("chat", function (msTime, person, msg) {
		$('#msgs').append("<li><strong><span class='text-success'>" + timeFormat(msTime) + person.name + "</span></strong>: " + msg +"</li>");
		$('#' + person.name + "").remove();
		clearTimeout(timeout);
		timeout = setTimeout(timeoutFunction, 0);
	});

	socket.on("whisper", function (msTime, person, msg) {
		if (person.name === "You") s = "whisper"
		else s = "whispers"
		$("#msgs").append("<li><strong><span class='text-muted'>" + timeFormat(msTime) + person.name + "</span></strong> " + s + ": " + msg + "</li>");
	});

	socket.on("roomList", function (data) {
		$('#rooms').text("");
		$('#rooms').append("<li class=\"list-group-item active\">List of rooms <span class=\"badge\">" + data.count + "</span></li>");
		if ( ! jQuery.isEmptyObject(data.rooms)) {
			$.each(data.rooms, function (id, room) {
				var html = "<button id=" + id + " class='joinRoomBtn btn btn-default btn-xs'>Join</button>" + " " + "<button id=" + id + " class='removeRoomBtn btn btn-xs btn-danger'>Remove</button>";
				$('#rooms').append("<li id=" + id + " class=\"list-group-item\"><span>" + room.name + "</span><div class=\"btn-group\">" + html + "</div></li>");
			});
		}
		else {
			$('#rooms').append("<li class=\"list-group-item\">There are no rooms yet.</li>");
		}
	});

	socket.on("sendRoomID", function (data) {
		myRoomID = data.id;
	});

	socket.on("disconnect", function () {
		$("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
		$('#msg').attr('disabled', 'disabled');
		$('#send').attr('disabled', 'disabled');
	});
});