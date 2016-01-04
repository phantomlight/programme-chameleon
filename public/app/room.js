function Room(name, id, owner) {
	this.name = name;
	this.id = id;
	this.owner = owner;
	this.people = [];
	this.peopleLimit = 4;
	this.status = 'available';
	this.private = false;
}

Room.prototype.addPerson = function(pid) {
	if (this.status === 'available') {
		this.people.push(pid);
	}
}

Room.prototype.removePerson = function(pid) {
	var pIndex = -1;
	for (var i=0; i < this.people.length; i++) {
		if (this.people[i].id === person.id) {
			pIndex = i;
			break;
		}
	}
	this.people.remove(pIndex);
}

Room.prototype.getPerson = function(pid) {
	var person = null;
	for (var i=0; i < this.people.length; i++) {
		if (this.people[i].id == pid) {
			person = this.people[i];
			break;
		}
	}
	return person;
}

Room.prototype.isAvailable = function() {
	return this.available === 'available';
}

Room.prototype.isPrivate = function() {
	return this.private;
}

module.exports = Room;