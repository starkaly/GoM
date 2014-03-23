
function drawSummaryBox(node){
	// Get the main data
	var distance = displayDistance(calculateDistance(main_location, [node.latitude, node.longitude]), AUTO);
	var name = "";
	var description = "";
	var icon_path = "";
	
	if(node instanceof Note){
		name = node.title;
		description = node.body;
		icon_path = "images/note_70.png";
	}else if(node instanceof Audio){
		name = node.name;
		description = node.description;
		icon_path = "images/audio_70.png";
	}else if(node instanceof User){
		name = node.username;
		description = node.name + " " + node.lastname + "<br><br>" + node.status;
		icon_path = "images/user_70.png";
	}else if(node instanceof Photo){
		name = node.name;
		description = node.description;
		icon_path = node.imageURL;
	}else if(node instanceof Video){
		name = node.name;
		description = node.description;
		icon_path = node.imageURL;
	}
	
	// Fill the box
	var element = document.getElementById('div_summary_name');
	element.innerHTML = '<h3>' + name + '</h3>';
	
	element = document.getElementById('div_summary_distance');
	element.innerHTML = distance;
	
	element = document.getElementById('div_summary_description');
	element.innerHTML = description;
	
	element = document.getElementById('td_summary_image');
	element.innerHTML = '<img id="summary_image" src="' + icon_path + '">';
	
	// Show it
	showSummaryBox();
}

function showSummaryBox(){
	showElement('summary_box');
}

function hideSummaryBox(){
	hideElement('summary_box');
}
