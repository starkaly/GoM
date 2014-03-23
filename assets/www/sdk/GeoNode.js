var ExternalInfo = function(){
	this.photo_thumb_url = "";
	this.media_url = "";
	this.info_url = "";
}

var GeoNode = function(id, latitude, longitude, altitude, radius, since, position_since, external_info){
	this.id = id;
	this.latitude = latitude;
	this.longitude = longitude;
	this.altitude = altitude;
	this.radius = radius;
	this.since = since;
	this.position_since = position_since;
	
	this.getLocation = function(){
		return [latitude, longitude, altitude];
	}
	
	this.external_info;
	if(external_info)
		this.external_info = external_info;
	
}

// var node = new GeoNode(0, 40.3345, -3.8897, 640, 0, "", "");