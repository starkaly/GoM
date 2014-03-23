var Audio = function(id, name, description, url, path, latitude, longitude, altitude, radius, since, position_since){
	GeoNode.prototype.constructor.call(this, id, latitude, longitude, altitude, radius, since, position_since);
	
	this.name = name;
	this.description = description;
	this.audioURL = url;
	this.audioPath = path;
	
	this.resourceDrawer = new ResourceDrawer(latitude, longitude, altitude, "images/audio_70.png", name);
}

Audio.prototype = new GeoNode();