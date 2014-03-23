var User = function(id, name, lastName, username, email, status, latitude, longitude, altitude, radius, since, country, postCode, birthday, friends, avatarId, avatarUrl, status_since, position_since){
	GeoNode.prototype.constructor.call(this, id, latitude, longitude, altitude, radius, since, position_since);
	
	this.name = name;
	this.lastName = lastName;
	this.username = username;
	this.email = email;
	this.status = status;
	this.status_since = status_since;
	this.country = country;
	this.postCode = postCode;
	this.birthday = birthday;
	this.friends = friends;
	this.avatarId = avatarId;
	this.avatarUrl = avatarUrl;
	
	this.resourceDrawer = new ResourceDrawer(latitude, longitude, altitude, "images/user_70.png", username);
}

User.prototype = new GeoNode();