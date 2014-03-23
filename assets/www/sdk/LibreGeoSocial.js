const lgsServer = "http://rest.libregeosocial.org/social/";
const lgsFormat = "JSON";

var nodes_list;
var num_layer = 0;

var layers;
var params = "";

function getLGSRemoteResource(method,resource, lgs_callback, num){
	var url = lgsServer + resource;
	request=new XMLHttpRequest();
	request.onreadystatechange=function(){
		if (request.readyState==4){
			//toggleVisibility('progress_bar');
			if (request.status==200){
				text=request.responseText;
				lgs_callback(text, num);
			} else {
				alert('error');
			}
		}
	}
	request.open(method, url, true);
	request.send("");
}

function parseLayerList(raw_data, num){
	
	var layer_type;
	var name;
	var description;
	var since;
	var id = 0;
	var altitude;
	var distance;
	var position_since;
	
	layer_type = name = description = since = position_since = "";
	distance = 0.0;
	altitude = 0.0;
	
	var data = eval('(' + raw_data + ')');
	if(data["code"] != 200)
		return;
	
	var raw_layers = data["results"];
	layers = new Array();
	var layers_length = 0;
	var i = 0;
	for (i = 0; i < raw_layers.length; i++){
		var raw_layer = raw_layers[i];
		if(!raw_layer["id"])
			continue; 
		id = raw_layer["id"];
		name = raw_layer["name"];
		var layer = new GenericLayer(id, layer_type, name, description,  since, "", "", altitude, distance, position_since );
		layers[layers_length] = layer;
		layers_length = layers.length;
	}
	
	if(layers.length > 0)
		getNodesList("", "0", 10.0, 0, 5);
	
}

function parseNodesList(raw_data, layer_id){
	
	var nodes = new Array();
	
	var data = eval('(' + raw_data + ')');
	if(data["code"] != 200)
		return;
	var raw_nodes = data["results"];
	var i = 0;
	var nodes_length = 0;
	for(i = 0; i<raw_nodes.length; i++){
		var node = parseNode(raw_nodes[i], layer_id);
		if(node){
			nodes_length = nodes.length;
			nodes[nodes_length] = node;
		}
	}
	
	if(nodes.length > 0){
		nodes_list = nodes_list.concat(nodes);
	}
	
	num_layer++;
	gettingNodeSystem();
}

function parseNode(raw_node, layer_id){
	var node;
	
	var type = "";
	var since;
	var position_since;
	var username;
	var latitude;
	var longitude;
	var altitude;
	var radius;
	var distance;
	var id = 0;
	latitude = longitude = radius = distance = -1.0;
	altitude = 0.0;
	since = position_since = "";
	
	if(!raw_node["type"])
		return false;
	type = raw_node["type"];
	
	id = raw_node["id"];
	since = raw_node["since"];
	
	if(raw_node["position"]){
		latitude = raw_node["position"]["latitude"];
		longitude = raw_node["position"]["longitude"];
		altitude = raw_node["position"]["altitude"];
		position_since = raw_node["position"]["since"];
		radius = raw_node["position"]["radius"];
	}
	
	
	if (type.toLowerCase() == "person"){
		var name = raw_node["first_name"];
		var lastName = raw_node["last_name"];
		var username = raw_node["username"];
		var status = "";
		var status_since = "";
		if(raw_node["status"]){
			status = raw_node["status"]["message"];
			status_since = raw_node["status"]["since"];
		}
		var email = raw_node["email"];
		var birthday = raw_node["birthday"];
		var avatarId = "";
		var avatarUrl = "";
		if(raw_node["avatar"]){
			avatarId = raw_node["avatar"]["photo_id"];
			avatarUrl = raw_node["avatar"]["photo_url"];
		}
		var country = "";
		var postCode = "";
		if(raw_node["position"]){
			country = raw_node["position"]["country"];
			postCode = raw_node["position"]["post_code"];
		}
		node = new User(id, name, lastName, username, email, status, latitude, longitude, altitude, radius, since, country, postCode, birthday, friends, avatarId, avatarUrl, status_since, position_since);
	}else if (type.toLowerCase() == "photo"){
		var name = raw_node["name"];
		var description = raw_node["description"];
		
		var external_info;
		var url = "";
		if(!id){
			external_info = new ExternalInfo();
			if(raw_node["external_info"]){
				external_info.info_url = raw_node["external_info"]["info_url"];
				external_info.media_url = raw_node["external_info"]["photo_url"];
				external_info.photo_thumb_url = raw_node["external_info"]["photo_thumb"];
				url = raw_node["external_info"]["photo_thumb"];
			}
		}else{
			url = lgsServer + "layer/" + layer_id + "/node/" + id + "/image/";
		}
		
		node = new Photo(id, latitude, longitude, altitude, radius, name, description, url, since, username, position_since, external_info);
		
	}else if (type.toLowerCase() == "note"){
		var title = raw_node["title"];
		var body = raw_node["text"];
		node = new Note(id, title, body, latitude, longitude, altitude, radius, since, position_since);
		
	}else if (type.toLowerCase() == "sound"){
		var name = raw_node["name"];
		var description = raw_node["description"];
		var path = "";
		
		var url = lgsServer + "layer/" + layer_id + "/node/" + id + "/sound_file/";
		
		node = new Audio(id, name, description, url, path, latitude, longitude, altitude, radius, since, position_since);
		
	}else if (type.toLowerCase() == "video"){
		var name = raw_node["name"];
		var description = raw_node["description"];
		
		var external_info = new ExternalInfo();
		if(raw_node["external_info"]){
			external_info.info_url = raw_node["external_info"]["info_url"];
			external_info.media_url = raw_node["external_info"]["video_url"];
			external_info.photo_thumb_url = raw_node["external_info"]["video_thumb_url"];
		}
		
		node = new Video(id, name, description, "", latitude, longitude, altitude, radius, since, position_since, external_info);
		
	}else{
		node = new GeoNode(id, latitude, longitude, altitude, radius, since, position_since);
	}
	/*
	node.altitude = altitude;
	node.latitude = latitude;
	node.longitude = longitude;
	node.radius = radius;
	node.since = since;
	node.id = id; 
	node.position_since = position_since;
	*/
	
	return node;
}

function getLayersList(){
	if(!nodes_list)
		nodes_list = new Array();
	nodes_list.length = 0;
	getLGSRemoteResource("GET", "layer/list/?format=JSON", parseLayerList);
}

function getNodesList(pattern, category, distance, page, elems){
	var i = 0;
	params = "/search/?search=" + pattern + 
								   "&category=" + category +
								   "&latitude=" + 40.33585 + 
								   "&longitude=" + -3.878165 + 
								   "&page=" + page +
								   "&elems=" + elems +
								   "&radius=" + distance + "&format=JSON";
	
	num_layer = 0;
	gettingNodeSystem();
}

function gettingNodeSystem(){
	if(num_layer == layers.length){
		//alert('Loaded nodes: ' + nodes_list.length);
		hideElement('loading_div');
		return;
	}
	showElement('loading_div');
	
	var uri = "layer/" + layers[num_layer].id + params;
	if(layers[num_layer].id)
		getLGSRemoteResource("POST", uri, parseNodesList, layers[num_layer].id);
}