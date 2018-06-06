// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

"use strict";

var audioElement;
var inpg = false;
var wallimagedata;
var selectedImage;
var largeImage;
var SelectPhoto = false;
var TakenPhoto = false;
var homecanvas;
var canvascontext;
var imgData;

// add device and doc ready
//camera functionality 


//wait for the application to be ready before main functions run
function onDeviceReady() {
	console.log("Device Ready");
	innit();
	setup();
	
	var pictureSource = navigator.camera.PictureSourceType;
	var destinationType = navigator.camera.DestinationType;
	console.log(pictureSource, destinationType);
	console.log('device ready', device.platform);
}

$(document).ready(function () {
	console.log("Ready!");
	innit();
	setup();
	var pictureSource = navigator.camera.PictureSourceType;
	var destinationType = navigator.camera.DestinationType;
	console.log(pictureSource, destinationType);
	console.log('device ready', device.platform);
});

function innit() {

	document.addEventListener("online", onOnline, false);
	document.addEventListener("offline", onOffline, false);
	
	if (window.navigator.online) {
		
		$('body').addClass('online');
		console.log("online");
		
	} else {
		
		$('body').addClass('offline');
		console.log("offline");	
	}
}

function onOffline() {
	
	$('body').removeClass('online');
	$('body').addClass('offline');
	console.log("delete online");
}

function onOnline(){
	
	$('body').addClass('online');
	$('body').removeClass('offline');
	console.log("delete offline");
}




//get photo from clicking button in nav on home
$('#getImage').on("click", function() {
	console.log('get photo');
	if (inpg) {
		capturePhotoWithData();
	} else {
		onPhotoDataSuccess(null);
	}
	
});

//get picture from the camera roll of the phone
function selectPhotoWithData() {
	console.log('photo selection event has fired');
	navigator.camera.getPicture(onSelectedPhotoDataSuccess, onFail, {
		destinationType: Camera.DestinationType.DATA_URL,
		sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
		encodingType: Camera.EncodingType.PNG,
		allowEdit: false,
		targetWidth: 200, targetHeight: 200
	});

}
//get picture from live camera element of the phone
function capturePhotoWithData() {
	console.log('photo event has fired');
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality: 80,
		correctOrientation: true
	});
}

//fail message
function onFail(message) {
	alert('Failed because: ' + message);
}

//when an image is selected
function onSelectedPhotoDataSuccess(SelectedImageData) {
	var imgCaptured = SelectedImageData;
	
		var image = new Image();
		image.src = ("data:image/png;base64," + imgCaptured);
		$.mobile.changePage('#uploadPage');
	
	
	//change page
	$(":mobile-pagecontainer").pagecontainer("change", '#picture', {
		transition: "pop",
		showLoadMsg: true
});
	//assign picture gathered to the ccs background the see picture page
	$('#picture').css('background-image', 'url(' + imgCaptured + ')');
}

//when a picture is taken with success
function onPhotoDataSuccess(imageData) {
	TakenPhoto = true;
	wallimagedata = imageData;

	//change page 
	$(":mobile-pagecontainer").pagecontainer("change", '#picture', {
		transition: "pop",
		showLoadMsg: true
});
	//add loader here
	$('#loading2').append( "<p style='color: yellow; font-weight: bold; font-size: 40px;' id='load' class='load'>Loading...</p>" );
	setTimeout(function() { $('#load').remove(); }, 800);
	//assign picture to the background ccs of the document
	$('#picture').css('background-image', 'url(' + wallimagedata + ')');
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);
}

//ALL SWIPE TO CHANGE PAGES FUNCTION
//FOR ALL PAGES
//improved functional usuability
$(document).on('swiperight', "#home", function(){
$.mobile.changePage("#posts", { 
	transition: 'slide',
	reverse: true
});
	console.log("RIGHT (Home - Posts)");
});

$(document).on('swipeleft', "#home", function(){
$.mobile.changePage("#map", { 
	transition: 'slide',
	reverse: false
});
	console.log("LEFT (Home - Map)");
});

$(document).on('swipeleft', "#posts", function(){
$.mobile.changePage("#home", { 
	transition: 'slide',
	reverse: false
});
	console.log("LEFT (Posts - Home)");
});

$(document).on('swiperight', "#map", function(){
$.mobile.changePage("#home", { 
	transition: 'slide',
	reverse: true
});
	console.log("RIGHT (Map - Home)");
});

$(document).on('swipeup', "#profile", function(){
	$("body").pagecontainer("change", "#home");
	console.log("UP (Profile - Home)");
});

$(document).on('swipeup', "#savedImages", function(){
	$("body").pagecontainer("change", "#home");
	console.log("UP (SavedImages - Home)");
});

//Remove tips from the dom functions
function removeDiv() {
	var removeTip = document.getElementById("divtip");
	var removeOk = document.getElementById("tapbackground");
	removeTip.parentNode.removeChild(removeTip);
	removeOk.parentNode.removeChild(removeOk);
}

function removeDivv() {
	var removeTp = document.getElementById("titletip");
	var removeOkk = document.getElementById("tapbackgroun");
	removeTp.parentNode.removeChild(removeTp);
	removeOkk.parentNode.removeChild(removeOkk);
}


var Subbyimage;
$(document).on('pageshow', '#submittion', function () {
	console.log("submittion");
	
	
	var loll = document.getElementById("canvasSub");
	var cntx = loll.getContext('2d');
	
	
	if (TakenPhoto === true) {
	console.log("Creating canvas from taken photo");
	var canny = document.getElementById("canvasSub");
	var ctxx = canny.getContext("2d");
	
	Subbyimage = new Image();
	Subbyimage.src = wallimagedata;
	Subbyimage.onload = function() {
		ctxx.drawImage(Subbyimage, 0, 0, 200, 200);
	};
	
	}
	
		if (SelectPhoto === true) {
	console.log("Creating canvas from selected photo");
	var cann = document.getElementById("canvasSub");
	var ctxxx = cann.getContext("2d");
	
	var Subimage = new Image();
	Subimage.src = largeImage;
	Subimage.onload = function() {
		ctxxx.drawImage(Subimage, 0, 0, 200, 200);
	};
	}
	
});

//console logs to make sure pages are loading correctly
$(document).on('pagecreate', '#profile', function () {
	console.log("profile");
	//creates css for home page to add image to the background
});

$(document).on('pagecreate', '#welcome', function () {
	console.log("welcome");
	$("#welcome").addClass("welcomeimage");
	//creates css for home page to add image to the background
});

//create the map upon getting the home page of the document
$(document).on('pagecreate', '#home', function () {
	$("#home").addClass("nice");
	console.log("home");
	CreateMap();
	//$("#home").addClass("nice");
	//creates css for home page to add image to the background
});

//gets the geolocation of the use everytime the map is page is loaded
$(document).on('pageshow', '#map', function () {
	//53.221083, -0.539515
	console.log("map");
		//maps.setCenter({lat:53.221083, lng:-0.539515});
		//console.log("Reset Centre");
	var GetPos = null;
	var CuurentLocMarker;
	var PostLocationtw;
		GetPos = navigator.geolocation.getCurrentPosition(function (position) {
				//temp var collecting data in an array
				//push an array into an array (multidimensional)
				
				//gets current location of user
				PostLocationtw = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				//place marker of users current location
					CuurentLocMarker = new google.maps.Marker({
					map: maps, 
						icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
					position: PostLocationtw,
					//drop animation when placed in the map
					animation: google.maps.Animation.DROP
				});
				
			});
});

//reset the centre of the map on page show of home
$(document).on('pageshow', '#home', function () {
	//53.221083, -0.539515
		maps.setCenter({lat:53.221083, lng:-0.539515});
		//InfoWindow.close();
		console.log("Reset Centre");
});

$('#map').on('load', function(){
	console.log("map page has fully loaded");
});

$(document).on('pagecreate', '#loadup', function () {
	console.log("loadup");
	$("#loadup").addClass("signupimage");
	//creates css for home page to add image to the background
});

//used when debugging he code in firefox (browser)
document.addEventListener("deviceready", function () {
 	console.log('device ready');
 	//create neat functions for readability
 	setup();
});

// use when in browser
$(document).ready(function () {
 	console.log('ready');
 	setup();
});

//main map of the #map page
var maps;
var CurLocation;
//var CurLocationMark;

//create fake data for the infowindows of fake local data
var FakeDataContent = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + "What is this!" + '</h1>'+
            '<div id="bodyContent">'+
            '<a> Description '+ "I cannot belive the concil havent dealt with this yet!" +'</a> <br>'+
            '<a>Post Type: ' + "Discussion" + '</p> <br>'+
            '</div>'+
            '</div>';

var FakeDataContent2 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + "Rubish Problem" + '</h1>'+
            '<div id="bodyContent">'+
            '<a> Description '+ "Why is there rubish just left here?" +'</a> <br>'+
            '<a>Post Type: ' + "Discussion" + '</p> <br>'+
            '</div>'+
            '</div>';

var FakeDataContent3 = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + "Gate Location" + '</h1>'+
            '<div id="bodyContent">'+
            '<a> Description '+ "Can we get a gate placed here please" +'</a> <br>'+
            '<a>Post Type: ' + "Discussion" + '</p> <br>'+
            '</div>'+
            '</div>';

	//window.localStorage.setItem('What is this!','[{"Title":"What is this!","Description":"I cannot belive the concil havent dealt with this yet!","TypeOfPost":"2","GeoLocation":"Yes","Username":"Yes","Img":""}]');

	//window.localStorage.setItem('Rubish Problem','[{"Title":"Rubish Problem","Description":"Why is there rubish just left here?","TypeOfPost":"2","GeoLocation":"Yes","Username":"Yes","Img":""}]');
	
	//window.localStorage.setItem('Gate Location','[{"Title":"Gate Location","Description":"Can we get a gate placed here please","TypeOfPost":"2","GeoLocation":"Yes","Username":"Yes","Img":""}]');


//function for creating the map upon lauch of the application
function CreateMap() {
		console.log("Created Map");		
		//coords that centre Sincil Bank
		var LatLng = new google.maps.LatLng(53.221083, -0.539515);
		//coords for fake data
		var FakeData = new google.maps.LatLng(53.220857, -0.536235);
		var FakeData2 = new google.maps.LatLng(53.221845, -0.536879);
		var FakeData3 = new google.maps.LatLng(53.219383, -0.541532);
		
		var mapOptions = {
			zoom: 15,
			center: LatLng,
			mapTypeId: 'satellite',
			//means if the map can be dragged around or not
			draggable: true
		};
		//create map on the canvas in the DOM
		maps = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
	
		
	//create info windows for all the fakedata's
		var infowindow = new google.maps.InfoWindow({
			content: FakeDataContent,
			maxWidth: 200
		});
	
		var infowindow2 = new google.maps.InfoWindow({
			content: FakeDataContent2,
			maxWidth: 200
		});
	
		var infowindow3 = new google.maps.InfoWindow({
			content: FakeDataContent3,
			maxWidth: 200
		});
	
	//create fake markers and listerners to display fake data
		var FakeMarker = new google.maps.Marker({
			map: maps, 
			position: FakeData
		});
			
		FakeMarker.addListener('click', function(){
			infowindow.open(maps, FakeMarker);
		});
	
		var FakeMarker2 = new google.maps.Marker({
			map: maps, 
			position: FakeData2
		});
			
		FakeMarker2.addListener('click', function(){
			infowindow2.open(maps, FakeMarker2);
		});
	
		var FakeMarker3 = new google.maps.Marker({
			map: maps, 
			position: FakeData3
		});
			
		FakeMarker3.addListener('click', function(){
			infowindow3.open(maps, FakeMarker3);
		});
	
//adds tilt to the map when zoom in close, easier for users to see exact location of the marker
	maps.setTilt(45);
	var SubmitPostLocationn = null;
	
		SubmitPostLocationn = navigator.geolocation.getCurrentPosition(function (position) {
				
				//gets current location of user
				PostLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				//place marker of users current location
					CurLocationMarkk = new google.maps.Marker({
					map: maps, 
					position: PostLocation,
					//drop animation when placed in the map
					animation: google.maps.Animation.DROP
				});
				
			});
}

//testing code
var lmao;
function readURL(input) 
{
    document.getElementById("bannerImg").style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();
		
        reader.onload = function (e) {
			
            document.getElementById('bannerImg').src =  e.target.result;
			console.log('result', reader.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

var idd;
var PostLocation;
var CurLocationMarkk;
var Username;
var usernamee;
var FormArray = [];

//saves the username of the users when logging
function saveUsername()
{ 
	Username = document.getElementById('username');
	usernamee = Username.value;
	console.log("Username", usernamee);
}
//saves the data of the form
//called when submit is pressed on the form page
function saveData()
{
	var Title;
	var Description;
	var TypeOfPost;
	var GeoLocation;

	var SubmitPostLocation = null;

	//get values of the elements in the DOM
	Title = document.getElementById('name');
	
	Description = document.getElementById('Descrip');
	
	TypeOfPost = document.getElementById('selectTypeOfPost');
	
	GeoLocation = document.getElementById('slider-flip-geolocation');
	
	var canvass = document.getElementById('canvasSub');
	//get data url of the image in the canvas
	var dataURL = canvass.toDataURL();
	
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd;
}

if(mm<10) {
    mm = '0'+mm;
}

today = mm + '/' + dd + '/' + yyyy;
console.log(today);
	
	//store elements in a mulidimentional array
	var Form = {
		Title: Title.value,
		Description: Description.value,
		TypeOfPost: TypeOfPost.value,
		GeoLocation: GeoLocation.value,
		Date: today,
		Username: usernamee,
		Img: dataURL
		//Photo: wallimagedata
		//maybe picture
	};
	//push the array into the array
	FormArray.push(Form);
	console.log(Form, FormArray.length);
	
	idd = Title.value;
	console.log(idd);
	
	//stringify the data ready for location storage
	JSON.stringify(FormArray);
	
	//locally store the data
	window.localStorage.setItem(idd, JSON.stringify(FormArray));
	console.log(FormArray);
	
	//get current location of where they are submitting the post from
	SubmitPostLocation = navigator.geolocation.getCurrentPosition(function (position) {
				
				//gets current location of user
				PostLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				//place marker of users current location
					CurLocationMarkk = new google.maps.Marker({
					map: maps, 
					position: PostLocation,
					//drop animation when placed in the map
					animation: google.maps.Animation.DROP
				});
				
			});
	
	//console.log(PostLocation.position.coords.latitude);
	
	
	
	//set the form values to nothing so form is reset
	document.getElementById("name").value = "";
	document.getElementById("Descrip").value = "";
	document.getElementById("slider-flip-geolocation").value = "Yes";
	document.getElementById("slider-flip-username").value = "Yes";
	Subbyimage = "";
	
}

$('#select').change(function() {
	if ($(this).val() === 'Suggestion') {
        console.log("Suggestion");
    }
	if ($(this).val() === 'Discussion') {
        console.log("Discussion");
    }
    if ($(this).val() === 'Appreciation') {
        console.log("Appreciation");
    }
});

var keys = [];
var newinfowindow;

function ResetFilter() {
	$("#listPosts").empty().append('').listview("refresh");

	//document.getElementById("#select").selectedIndex = 0;
	var TotalSubmittions = window.localStorage.length;
	for (var i = 0; i < TotalSubmittions; i++) {
		$("#listPosts").append("<br><li><a id=" + i +" href='#clickaPost' data-transition='slide'>" + window.localStorage.key(i) + "<p></p></a></li>");
		console.log(i);
	}
	
	//tell JQM to refresh the list
	$("#listPosts").listview('refresh');
	
		$("#listPosts li a").on('click', function () {
				console.log('listposts track');
				$("#clickaPost").attr("idd", $(this).text());
									
		});
}

$(document).on('pageshow', '#posts', function () {
	console.log('posts page');
	$("#listPosts").empty().append('').listview("refresh");
	$('#loading').append( "<p style='color: yellow; font-weight: bold; font-size: 40px;' id='load' class='load'>Loading...</p>" );
	setTimeout(function() { $('#load').remove(); }, 400);
	var TotalSubmittions = window.localStorage.length;
	for (var i = 0; i < TotalSubmittions; i++) {
		$("#listPosts").append("<li><a id=" + i +" href='#clickaPost' data-transition='slide'>" + window.localStorage.key(i) + "<p></p></a></li>");
		console.log(i);
	}
	//tell JQM to refresh the list
	$("#listPosts").listview('refresh');
	
	//var data2;
	//data2 = JSON.parse(FormArray);
	//console.log("Data", FormArray);
	
	$('#select').change(function() {
		
	if ($(this).val() === 'Suggestion') {
		$("#listPosts").empty().append('').listview("refresh");
        console.log("Suggestion");
		
		for (var ii = 0; ii < TotalSubmittions; ii++) {
			var data2;
			data2 = window.localStorage.key(ii);
			var key = data2;
			data2 = window.localStorage.getItem(data2);
			//localStorage.getItem(data2);
			console.log("aye", data2);
			data2 = JSON.parse(data2);
			console.log("Data", data2);
			
			for (var i = 0; i < data2.length; i++) {
				var TypeOfPostVall = ("TypeOfPost", data2[i].TypeOfPost);
				console.log(TypeOfPostVall);
				console.log(key);
			if (TypeOfPostVall === "1"){	
				$("#listPosts").append("<br><li><a id=" + i +" href='#clickaPost' data-transition='slide'>" + key + "<p></p></a></li>");
				console.log(i);
		}
	}
				$("#listPosts").listview('refresh');
}
				$("#listPosts li a").on('click', function () {
				console.log('listposts track');
				$("#clickaPost").attr("idd", $(this).text());
									
		});
		
		
}
	if ($(this).val() === 'Discussion') {
        $("#listPosts").empty().append('').listview("refresh");
        console.log("Discussion");
		
		for (var iii = 0; iii < TotalSubmittions; iii++) {
			var data3;
			data3 = window.localStorage.key(iii);
			var key2 = data3;
			data3 = window.localStorage.getItem(data3);
			//localStorage.getItem(data3);
			console.log("aye", data3);
			data3 = JSON.parse(data3);
			console.log("Data", data3);
			
			for (var j = 0; j < data3.length; j++) {
				var TypeOfPostValll = ("TypeOfPost", data3[j].TypeOfPost);
				console.log(TypeOfPostValll);
				console.log(key2);
			if (TypeOfPostValll === "2"){	
				$("#listPosts").append("<br><li><a id=" + j +" href='#clickaPost' data-transition='slide'>" + key2 + "<p></p></a></li>");
				console.log(j);
		}
	}
				$("#listPosts").listview('refresh');
}
				$("#listPosts li a").on('click', function () {
				console.log('listposts track');
				$("#clickaPost").attr("idd", $(this).text());
									
		});
    }
    if ($(this).val() === 'Appreciation') {
        $("#listPosts").empty().append('').listview("refresh");
        console.log("Appreciation");
		
		for (var iiii = 0; iiii < TotalSubmittions; iiii++) {
			var data4;
			data4 = window.localStorage.key(iiii);
			var key3 = data4;
			data4 = window.localStorage.getItem(data4);
			//localStorage.getItem(data4);
			console.log("aye", data4);
			data4 = JSON.parse(data4);
			console.log("Data", data4);
			
			for (var k = 0; k < data4.length; k++) {
				var TypeOfPostVallll = ("TypeOfPost", data4[k].TypeOfPost);
				console.log(TypeOfPostVallll);
				console.log(key3);
			if (TypeOfPostVallll === "3"){	
				$("#listPosts").append("<br><li><a id=" + k +" href='#clickaPost' data-transition='slide'>" + key3 + "<p></p></a></li>");
				console.log(k);
		}
	}
				$("#listPosts").listview('refresh');
}
			$("#listPosts li a").on('click', function () {
				console.log('listposts track');
				$("#clickaPost").attr("idd", $(this).text());
									
		});
    }
});
	
	$("#listPosts li a").on('click', function () {
				console.log('listposts track');
				$("#clickaPost").attr("idd", $(this).text());
									
		});
	});

//on page show of when a user clicks a post
$(document).on('pageshow', '#clickaPost', function () {
	var DescriptionVal;
	var TypeOfPostVal;
	var TypeOfPostText;
	var username;
	//set the upvote thing to have a value of 1 by default
	$('#topic').upvote({count: 1, upvoted: 0});
	VoteScore = $('#topic').upvote('count');
	console.log("VoteScore", VoteScore);
	//localStorage['clo'] = VoteScore.value;
	
	//get key so we know what data to populate the page with
	var key = $(this).attr("idd");
	console.log('track info', key);
	//Update header with the title of the post
	$("#clickaPost div[data-role=header] h1").text(key);
	var data;
	//get all the data of the post clicked from the key
	data = window.localStorage.getItem(key);
	
	//turn the stringified data back into a JS object
	data = JSON.parse(data);
	console.log("Data", data);

		//loop through the data
		//not needed although did take it out as it works
		for (var i = 0; i < data.length; i++) {
		
		//testing ways of returning data back from JS object
		console.log("Title", data[i].Title);
		console.log("Description", data[i].Description);
		//console.log("Description", data[i].Description);
		
		//set JS object values to var's
		DescriptionVal = ("Description", data[i].Description);
		TypeOfPostVal = ("TypeOfPost", data[i].TypeOfPost);
		var GeoLo = ("GeoLocation", data[i].GeoLocation);
		var imageee = ("Image", data[i].Img);
		username = ("Username", data[i].Username);
		console.log(GeoLo);
		console.log(imageee);
		console.log(DescriptionVal);
		console.log("lol", TypeOfPostVal);
		console.log("hitmate",username);
		
		//$("#PostDescrip").append("<a href='#' data-ajax='false'>" + DescriptionVal + "</a>");
		
		//will hide or show the gelocation button depending if the user selected it or not
		if (GeoLo === "Yes"){
			//show div
			console.log("yes");
			document.getElementById("GeoContainer").style.display = 'block';
		}
		if (GeoLo === "No") {
			document.getElementById("GeoContainer").style.display = 'none';
		}
			
		//pull canvas on page
		var postCanvas = document.getElementById("canvasPost");
		var ctxx = postCanvas.getContext("2d");
			
		//assign imaage to the canvas from the JS object
		var Postimg = new Image();
		Postimg.src = imageee;
		Postimg.onload = function() {
		ctxx.drawImage(Postimg, 0, 0, 200, 200);
		};
		console.log(DescriptionVal);
		//assing description and username to the page
		$('#Postttt').attr('value', DescriptionVal);
		$('#Postttt').html(DescriptionVal);
		$('#user').attr('value', username);
				
		
		//if statements depending on what selection of post the user made
		if (TypeOfPostVal === "1"){
		console.log("one");
			//if 1 add the option that was for 1
		$('#option').val("Suggestion");
		TypeOfPostText = ("Suggestion");
		}
		if (TypeOfPostVal === "2"){
			//if 1 add the option that was for 2
		console.log("two");
		$('#option').val("Discussion");
		TypeOfPostText = ("Discussion");
		}
			
		if (TypeOfPostVal === "3"){
			//if 1 add the option that was for 3
		console.log("three");
		$('#option').val("Appreciation");
		TypeOfPostText = ("Appreciation");	
		}			
	}
	
	//create data of the clicked post
		var NewFakeDataContent = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">' + key + '</h1>'+
            '<div id="bodyContent">'+
            '<a> Description '+ DescriptionVal +'</a> <br>'+
            '<a>Post Type: ' + TypeOfPostText + '</p> <br>'+
			'<a href=#><center>Click to See Post</center></a><br>'+
            '<a> Username: '+ username +'</a> ' +
            '</div>'+
            '</div>';
	
	
	//create new info window for the marker
		newinfowindow = new google.maps.InfoWindow({
			content: NewFakeDataContent,
			maxWidth: 200
		});
		
		console.log(NewFakeDataContent);
	
	//event lister for the marker
		CurLocationMarkk.addListener('click', function() {
			newinfowindow.open(maps, CurLocationMarkk);
			console.log("clicked");
		});	
	
});

//called to recentre the map
function newCentre(postLat, PostLong) {
	
	maps.setCenter ({
		lat: postLat,
		lng: PostLong
	});
}

var VoteScore;
var lol = true;

function setup() {
	localStorage.clear();
	//if()
		//	$('#layy').upvote({count: localStorage, upvoted: 0});

	
//MAP STUFF
//gets users current location and assign it to array, will be used for placing marker of where the user wants to submit the photo is
	
	//define fake coords for the data
	//var fakeMarker1 = new google.maps.LatLng(53.223297, -0.540450);
	
	window.localStorage.setItem('What is this!','[{"Title":"What is this!","Description":"I cannot belive the concil havent dealt with this yet!","TypeOfPost":"1","GeoLocation":"Yes","Username":"","Img":""}]');

	window.localStorage.setItem('Rubish Problem','[{"Title":"Rubish Problem","Description":"Why is there rubish just left here?","TypeOfPost":"2","GeoLocation":"Yes","Username":"","Img":""}]');
	
	window.localStorage.setItem('Gate Location','[{"Title":"Gate Location","Description":"Can we get a gate placed here please","TypeOfPost":"3","GeoLocation":"Yes","Username":"","Img":""}]');
	
	
	
	//when see on map button is clicked will centre the map upon it (usuability)
	$('#seeOnMap').on('click', function () {
		maps.setCenter(PostLocation);
		console.log("new centre");
	});
		
}

//SAVED IMAGES LOAD IMAGE FROM CAMERA ROLL
$('#savedImages').on('pageinit', function(){
	

    });

//was trying to add jquery event loaders, could not get it working
//this code if from the support JQuerymobile documentation
//it not ran inside the program
$(document).on( "click", ".show-page-loading-msg", function() {
    var $this = $( this ),
        theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
        textonly = !!$this.jqmData( "textonly" );
       var html = $this.jqmData( "html" ) || "";
    $.mobile.loading( "show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
    });
})

.on( "click", ".hide-page-loading-msg", function() {
    $.mobile.loading( "hide" );
});

//used to called the camera element
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
		
		document.getElementById("selectImage").onclick = function() {
			inpg = true;
			console.log('select photo');
			if (inpg) {
				selectPhotoWithData();
			} else {
				onPhotoDataSuccess(null);
			}
		};
		
		document.getElementById("retake").onclick = function () {
			inpg = true;
			console.log('get photo');
			if (inpg) {
				capturePhotoWithData();
			} else {
				onPhotoDataSuccess(null);
			}
        };

    
				
        document.getElementById("btntakephoto").onclick = function () {
			inpg = true;
			console.log('get photo');
			if (inpg) {
				capturePhotoWithData();
			} else {
				onPhotoDataSuccess(null);
			}
        };
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    $(document).on('pageshow', function () {
        var obj = $(document).find('nav[data-role="navbar"] a');
        $.each(obj, function (i, val) {
            $(this).removeClass('activeNav');
            var active = '#' + $.mobile.activePage[0].id;
            if ($(this).attr('href') == active) {
                $(this).addClass('activeNav');
            }
        });
    });

})();