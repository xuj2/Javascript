var apiKey = "560524aa479b511d092330238acd7d19";


document.getElementById("submit").addEventListener("click", function(e) {
	var req = new XMLHttpRequest();
	var city = document.getElementById("city");
	var zip = document.getElementById("zip");
	if (city.value.length == 0) {
		var field1 = zip.value;
		var field2 = document.getElementById("code2").value;
		var startURL = "https://api.openweathermap.org/data/2.5/weather?zip="
	}
	if (zip.value.length == 0) {
		var field1 = city.value;
		var field2 = document.getElementById("code1").value;
		var startURL = "https://api.openweathermap.org/data/2.5/weather?q="
	}
	var url = startURL + field1 + "," + field2 + "&appid=" + apiKey
	req.open("GET", url, true);
	req.addEventListener('load', function() {
		if (req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText)
			document.getElementById("country").textContent = response.sys.country
			document.getElementById("place").textContent = response.name
			document.getElementById("humidity").textContent = response.main.humidity
			document.getElementById("visibility").textContent = response.visibility
			document.getElementById("wind").textContent = response.wind.speed
			document.getElementById("description").textContent = response.weather[0].description
		} else {
			console.log(req.statusText);
	}});
	req.send(null);
	event.preventDefault();
})

document.getElementById("submitPost").addEventListener("click", function(e) {
	var req = new XMLHttpRequest();
	var name = document.getElementById("name").value;
	var gender = document.getElementById("gender").value;
	var age = document.getElementById("age").value
	var request = JSON.stringify({"name": name, "gender":gender, "age":age})
	req.open("POST", "http://httpbin.org/post", true);
	req.setRequestHeader('Content-Type', 'application/json');
	req.addEventListener('load', function() {
		if(req.status >= 200 && req.status < 400) {
			var response = JSON.parse(req.responseText);
			document.getElementById("output1").textContent = response.json.name;
			document.getElementById("output2").textContent = response.json.gender;
			document.getElementById("output3").textContent = response.json.age;
		} else {
			console.log(req.statusText);
	}});
	req.send(request);
	event.preventDefault();
})
