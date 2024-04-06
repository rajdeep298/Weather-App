const apiKeys ="c2df330cc2ac1d43db6c37558bb65bfa";
const apiUrl="https://api.openweathermap.org/data/2.5/forecast?units=metric";
let cityName;
let dt1=0;
const weatherIcon=document.querySelector(".weather-icon");
const locApi="http://api.openweathermap.org/geo/1.0/reverse?limit=5";
function getCity(){
    cityName=document.querySelector(".search-input").value;
    console.log(cityName);
    getWeatherByLocation(cityName);
}


function getLoc(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            let lat=position.coords.latitude;
            let lon=position.coords.longitude;
            console.log(lat,lon);
            fetch(locApi+`&lat=${lat}&lon=${lon}&appid=${apiKeys}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                cityName=data[0].name;
                getWeatherByLocation(cityName);
            });
        });
    }
    else{
        alert("Geolocation is not supported by this browser.");
    }
}

const currentDate = new Date();

async function getWeatherByLocation(cityName) {
    const response = await fetch(apiUrl+`&appid=${apiKeys}`+`&q=${cityName}`);
    let responseData = await response.json();
    console.log(responseData);
    document.getElementById("city-name").innerText= "Today's Forecast Highlights of "+responseData.city.name+":";
    document.getElementById("Date").innerText="Date:"+ currentDate.getDate() +"/"+ (currentDate.getMonth()+1) +"/"+ currentDate.getFullYear();
    document.getElementById("feels1").innerText="Feels Like:"+responseData.list[0].main.feels_like+"°C";
    document.getElementById("wind1").innerText="Wind Speed:"+responseData.list[0].wind.speed+"km/h";
    document.getElementById("humidity1").innerText="Humidity:"+responseData.list[0].main.humidity+"%";
    document.getElementById("rain-logo").innerText="Rain:"+responseData.list[0].weather[0].description;
    document.getElementById("max-temp1").innerText="Max Temp:"+responseData.list[0].main.temp_max+"°C";
    document.getElementById("min-temp1").innerText="Min Temp:"+responseData.list[0].main.temp_min+"°C";
    document.getElementById("temp").innerText=responseData.list[0].main.temp+"°C";

    // console.log(responseData.list[0].main.humidity);
    if(responseData.list[0].main.humidity>=80){
        document.getElementById("sug1").innerText="Don't forget to take your umbrella with you today!";
    }
    else if(responseData.list[0].main.humidity>=50){
        document.getElementById("sug1").innerText="There will be not to much rain today!";
    }
    else{
        document.getElementById("sug1").innerText="Today is a sunny day!";
    }

    if(responseData.list[0].main.temp_max>=35){
        document.getElementById("sug2").innerText="It's a hot day today, stay hydrated!";
    }
    else if(responseData.list[0].main.temp_max>=20){
        document.getElementById("sug2").innerText="It's a pleasant day today!";
    }
    else if(responseData.list[0].main.temp_max<=15){
        document.getElementById("sug2").innerText="It's a cold day today, don't forget to take your jacket!";
    }

    if(responseData.list[0].wind.speed>=30){
        document.getElementById("sug3").innerText="It's a stormy day today!";
    }
    else if(responseData.list[0].wind.speed>=25){
        document.getElementById("sug3").innerText="It's a windy day today!";
    }
    else if(responseData.list[0].wind.speed>=15){
        document.getElementById("sug3").innerText="It's a calm day today!";
    }
    else if(responseData.list[0].wind.speed<=15){
        document.getElementById("sug3").innerText="There is not to much airflows today!";
    }
    
    let h3=[document.querySelectorAll(".next1 h3"),
            document.querySelectorAll(".next2 h3"),
            document.querySelectorAll(".next3 h3"),
            document.querySelectorAll(".next4 h3"),
            document.querySelectorAll(".next5 h3"),
            document.querySelectorAll(".next6 h3")
        ];
        
    for(let i=0;i<6;i++){
        let [datePart,timePart]=responseData.list[i+1].dt_txt.split(" ");
        h3[i][0].innerText=datePart;
        h3[i][1].innerText=timePart;
    }

    let p=[document.querySelectorAll(".next1 li"),
            document.querySelectorAll(".next2 li"),
            document.querySelectorAll(".next3 li"),
            document.querySelectorAll(".next4 li"),
            document.querySelectorAll(".next5 li"),
            document.querySelectorAll(".next6 li")
        ];

    for(i=0;i<6;i++){
        p[i][0].innerText="Temp:"+responseData.list[i+1].main.temp+"°C";
        p[i][1].innerText="Humidity:"+responseData.list[i+1].main.humidity+"%";
        p[i][2].innerText="Wind Speed:"+responseData.list[i+1].wind.speed+"km/h";
        p[i][3].innerText="Rain:"+responseData.list[i+1].weather[0].description;
    }    


    let li=[
            document.querySelectorAll(".one li"),
            document.querySelectorAll(".two li"),
            document.querySelectorAll(".three li"),
            document.querySelectorAll(".four li")
        ];
    let h2=[
            document.querySelector(".one h2"),
            document.querySelector(".two h2"),
            document.querySelector(".three h2"),
            document.querySelector(".four h2")
        ];

    for(i=0;i<4;i++){

        h2[i].innerHTML = responseData.list[dt1].dt_txt.split(" ")[0];
        console.log(h2[i]);
        
        li[i][0].innerText="Temp:"+responseData.list[dt1].main.temp+"°C";
        li[i][1].innerText="Humidity:"+responseData.list[dt1].main.humidity+"%";
        li[i][2].innerText="Wind Speed:"+responseData.list[dt1].wind.speed+"km/h";
        li[i][3].innerText="Rain:"+responseData.list[dt1].weather[0].description;
        dt1=dt1+8;
    }    

    if(responseData.list[0].weather[0].main=="Clouds"){
        weatherIcon.src="Images/clouds.png";
    }
    else if(responseData.list[0].weather[0].main=="Clear"){
        weatherIcon.src="Images/clear.png";
    }
    else if(responseData.list[0].weather[0].main=="Rain"){
        weatherIcon.src="Images/rain.png";
    }
    else if(responseData.list[0].weather[0].main=="Snow"){
        weatherIcon.src="Images/snow.png";
    }
    else if(responseData.list[0].weather[0].description=="light rain"){
        weatherIcon.src="Images/drizzle.png";
    }
}