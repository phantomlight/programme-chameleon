var express = require('express')
, 	bodyParser = require('body-parser')
,		methodOverride = require('method-override')
,		app 		=	express()
, 	server  = require('http').createServer(app)
,		io 			=	require('socket.io').listen(server)
, 	npid 		=	require('npid')
, 	uuid		=	require('node-uuid')
, 	Room 		=	require('./room.js')
, 	_				=	require('underscore')._;

app.set('port', 3000);
app.set('ipaddr', "127.0.0.5");
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

try {
	npid.create('/var/run/pc-meeting.pid', true);
} catch (err) {
	console.log(err);
	//process.exit(1);
}

app.get('/', function (req, res) {
	res.render('index.html');
});

server.listen(app.get('port'), app.get('ipaddr'), function() {
	console.log('Express server listening on IP: ' + app.get('ipaddr') + ':' + app.get('port'));
});

io.set('log level', 1);

var people, rooms, chatHistory = {};
var sockets = [];

function purge(s, action) {
	if (people[s.id].inroom) { // user is in a room
		var room = rooms[people[s.id].inroom]; // which room user is in?
		if (s.id === room.owner) { // user in room and owns room
			if (action === "disconnect") {
				io.sockets.in(s.room).emit("update", "The owner (" + people[s.id].name + ") has left the server. The room is removed and you have been disconnected from it as well");
				var socketids = [];
				for (var i=0; i<sockets.length; i++) {
					socketids.push(sockets[i].id);
					if (_.contains((socketids)), room.people) {
						sockets[i].leave(room.name);
					}
				}

				if (_.contains((room.people)), s.id) {
					for (var i=0; i<room.people.length; i++) {
						people[room.people[i]].inroom = null;
					}
				}

				room.people = _.without(room.people, s.id);
				delete rooms[people[s.id].owns];
				delete people[s.id];
				delete chatHistory[room.name];
				sizePeople = _.size(people);
				sizeRooms = _.size(rooms);
				io.socket.emit("update-people", {people: people, count: sizePeople});
				io.socket.emit("roomList", {rooms: rooms, count: sizeRooms});
				var o = _.findWhere(sockets, {'id': s.id});
				sockets = _.without(sockets, o);
			}
			else if (action === "removeRoom") {
				io.sockets.in(s.room).emit("update", "The owner (" + people[s.id].name + ") has removed the room. You have been disconnected from the room as well.");
				var socketids = [];
				for (var i=0; i<sockets.length; i++) {
					socketids.push(sockets[i].id);
					if (_.contains((socketids)), room.people) {
						sockets[i].leave(room.name);
					}
				}
				if (_.contains((room.people)), s.id) {
					for (var i=0; i<room.people.length; i++) {
						people[room.people[i]].inroom = null;
					}
				}
				delete rooms[people[s.id].owns];
				people[s.id].owns = null;
				room.people = _.without(room.people, s.id);
				delete chatHistory[room.name];
				sizeRooms = _.size(rooms);
				io.sockets.emit("roomList", {rooms: rooms, count: sizeRooms});
			}
			else if (action === "leaveRoom") {
				io.sockets.in(s.room).emit("update", "The owner (" + people[s.id].name + ") has left the room. You have been disconnected from the room as well.");
				var socketids = [];
				for (var i=0; i<sockets.length; i++) {
					socketids.push(sockets[i].id);
					if (_.contains((socketids)), room.people) {
						sockets[i].leave(room.name);
					}
				}
				if (_.contains((room.people)), s.id) {
					for (var i=0; i<room.people.length; i++) {
						people[room.people[i]].inroom = null;
					}
				}
				delete rooms[people[s.id].owns];
				people[s.id].owns = null;
				room.people = _.without(room.people, s.id);
				delete chatHistory[room.name];
				sizeRooms = _.size(rooms);
				io.sockets.emit("roomList", {rooms: rooms, count: sizeRooms});
			}
		}
		else { // user in room, does not own the room
			if (action === "disconnect") {
				io.sockets.emit("update", people[s.id].name + " has disconnected from server.");
				if (_.contains((room.people), s.id)) {
					var pIndex = room.people.indexOf(s.id);
					room.people.splice(pIndex, 1);
					s.leave(room.name);
					delete people[s.id];
					sizePeople = _.size(people);
					io.sockets.emit("update-people", {people: people, count: sizePeople});
					var o = _.findWhere(sockets, {'id': s.id});
					sockets = _.without(sockets, o);
				}
			}
			else if (action === "removeRoom") {
				s.emit("update", "Only owner can remove the room.");
			}
			else if (action === "leaveRoom") {
				if (_.contains((room.people), s.id)) {
					var pIndex = room.people.indexOf(s.id);
					room.people.splice(pIndex, 1);
					people[s.id].inroom = null;
					io.sockets.emit("update", people[s.id].name + " has left the room.");
					s.leave(room.name);
				}
			}
		}
	}
	else { // user not in a room, handles disconnected scenario
		if (action === "disconnect") {
			io.sockets.emit("update", people[s.id].name + " has disconnected from the server.");
			delete people[s.id];
			sizePeople = _.size(people);
			io.sockets.emit("update-people", {people: people, count: sizePeople});
			var o = _.findWhere(sockets, {'id': s.id});
			sockets = _.without(sockets, o);
		}
	}
}

io.sockets.on("connection", function (socket) {
	socket.on("joinserver", function (name, device) {
		var exists = false;
		var ownerRoomID = inRoomID = null;

		_.find(people, function (k, v) {
			if (k.name.toLowerCase() === name.toLowerCase()) {
				return exists = true;
			}
		});

		if (exists) { // provide new username
			var randomNumber = Math.floor(Math.random() * 1001);
			do {
				var proposedName = name + randomNumber;
				_.find(people, function (k, v) {
					if (k.name.toLowerCase() === proposedName.toLowerCase()) {
						return exists = true;
					}
				});
			} while ( ! exists);
			socket.emit("exists", {
				msg: "Username already exists, choose another.",
				proposedName: proposedName
			});
		}
		else {
			people[socket.id] = {
				"name": name,
				"owns": ownerRoomID,
				"inroom": inroom,
				"device": device
			};

			socket.emit("update", "You have connected to the server.");
			io.sockets.emit("update", people[socket.id].name + " is online.");
			sizePeople = _.size(people);
			sizeRooms = _.size(rooms);
			io.sockets.emit("update-people", {people: people, count: sizePeople});
			socket.emit("roomList", {rooms: rooms, count: sizeRooms});
			socket.emit("joined"); // for geolocation
			sockets.push(socket);
		}
	});

	socket.on("getOnlinePeople", function (fn) {
		fn({people: people});
	});

	socket.on("countryUpdate", function (data) {
		var country = data.country.toLowerCase();
		people[socket.id].country = country;
		io.sockets.emit("update-people", {people: people, count: sizePeople});
	});

	socket.on("typing", function (data) {
		if (typeof people[socket.id] !== "undefined") {
			io.sockets.in(socket.room).emit("isTyping", {isTyping: data, person: people[socket.id].name});
		}
	});

	socket.on("send", function (msTime, msg) {
		//process.exit(1);
		var re = /^[w]:.*:/;
		var whisper = re.test(msg);
		var whisperStr = msg.split(":");
		var found = false;

		if (whisper) {
			var whisperTo = whisperStr[1];
			var keys = Object.keys(people);

			if (keys.length != 0) {
				for (var i=0; i<keys.length; i++) {
					if (people[keys[i]].name === whisperTo) {
						var whisperId = keys[i];
						found = true;
						if (socket.id === whisperId) {
							socket.emit("update", "Cannot whisper to yourself");
						}
						break;
					}
				}
			}

			if (found && socket.id !== whisperId) {
				var whisperTo = whisperStr[1];
				var whisperMsg = whisperStr[2];
				socket.emit("whisper", {name: "You"}, whisperMsg);
				io.sockets.socket(whisperId).emit("whisper", msTime, people[socket.id], whisperMsg);
			}
			else {
				socket.emit("update", "Cannot find " + whisperTo);
			}
		}
		else {
			if (io.sockets.manager.roomClients[socket.id]['/' + socket.room] !== undefined) {
				io.sockets.in(socket.room).emit("chat", msTime, people[socket.id], msg);
				socket.emit("isTyping", false);
				if (_.size(chatHistory[socket.room]) > 10) {
					chatHistory[socket.room].splice(0, 1);
				}
				else {
					chatHistory[socket.room].push(people[socket.id].name + ": " + msg);
				}
			}
			else {
				socket.emit("update", "Please connect to a room.");
			}
		}
	});

	socket.on("disconnect", function () {
		if (typeof people[socket.id] !== "undefined") {
			purge(socket, "disconnect");
		}
	});

	socket.on("createRoom", function (name) {
		if (people[socket.id].inroom) {
			socket.emit("update", "You are in a room. Please leave it first.");
		}
		else if ( ! people[socket.id].owns) {
			var id = uuid.v4();
			var room = new Room(name, id, socket.id);
			rooms[id] = room;
			sizeRooms = _.size(rooms);
			io.sockets.emit("roomList", {
				rooms: rooms,
				count: sizeRooms
			});
			socket.room = name;
			socket.join(socket.room);
			people[socket.id].owns = id;
			prople[socket.id].inroom = id;
			room.addPerson(socket.id);
			socket.emit("update", "Welcome to " + room.name + ".");
			socket.emit("sendRoomID", {id: id});
			chatHistory[socket.room] = [];
		}
		else {
			socket.emit("update", "You have already created a room");
		}
	});

	socket.on("check", function (name, fn) {
		var match = false;
		_.find(rooms, function (k, v) {
			if (k.name === name) {
				return match = true;
			}
		});
		fn({result: match});
	});

	socket.on("removeRoom", function (id) {
		var room = rooms[id];
		if (socket.id === room.owner) {
			purge(socket, "removeRoom");
		}
		else {
			socket.emit("update", "Only owner can remove room.");
		}
	});

	socket.on("joinRoom", function (id) {
		if (typeof people[socket.id] !== "undefined") {
			var room = rooms[id];
			if (socket.id === room.owner) {
				socket.emit("update", "You are the owner of this room.");
			}
			else {
				if (people[socket.id].inroom !== null) {
					socket.emit("update", "You already in the room.");
				}
				else {
					room.addPerson(socket.id);
					people[socket.id].inroom = id;
					socket.room = room.name;
					socket.join(socket.room);
					var user = people[socket.id];
					io.sockets.in(socket.room).emit("update", user.name + " has connected to " + room.name + " room.");
					socket.emit("update", "Welcome to " + room.name + ".");
					socket.emit("sendRoomID", {id: id});
					var keys = _.keys(chatHistory);
					if (_.contains(keys, socket.room)) {
						socket.emit("history", chatHistory[socket.room]);
					}
				}
			}
		}
		else {
			socket.emit("update", "Please enter a valid name first.");
		}
	});

	socket.on("leaveRoom", function (id) {
		var room = rooms[id];
		if (room) purge(socket, "leaveRoom");
	});
});