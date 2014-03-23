var Note = function(id, title, body, latitude, longitude, altitude, radius, since, position_since){
	GeoNode.prototype.constructor.call(this, id, latitude, longitude, altitude, radius, since, position_since);
	this.title = title;
	this.body = body;
	
	this.resourceDrawer = new ResourceDrawer(latitude, longitude, altitude, "images/note_70.png", title);
}

Note.prototype = new GeoNode();