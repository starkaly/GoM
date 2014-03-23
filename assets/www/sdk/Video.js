var Video = function(id, name, description, path, latitude, longitude, altitude, radius, since, position_since, external_info){
	GeoNode.prototype.constructor.call(this, id, latitude, longitude, altitude, radius, since, position_since, external_info);
	
	this.name = name;
	this.description = description;
	this.videoPath = path;
	
	this.imageURL = "images/media.png";
	if(external_info)
		this.imageURL = external_info.photo_thumb_url;
	
	this.resourceDrawer = new ResourceDrawer(latitude, longitude, altitude, this.imageURL, name);
}

Video.prototype = new GeoNode();