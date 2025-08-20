const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput'); 
const card = document.querySelector('.card');
const apikey = 'ed76794758e5f42aa6a3aeef1678acfa';
weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value; 

if (city) {
    try {
     const weatherData= await getWeatherData(city);
     displayWeatherinfo(weatherData);
    } catch (error) {
        console.error(error)
        displayerror(error);
    }
    
} else {
    displayerror("Please enter a city");
}
})

 async function getWeatherData(city) {
const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`    
const response = await fetch(apiurl);
console.log(response);
if(!response){
    throw new Error("could not found the city") 
}
    return await response.json();
 }

 function displayWeatherinfo(data){
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;
    card.textContent="";
    card.style.display="flex";
    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmoji=document.createElement("p");
    cityDisplay.textContent=city;
    card.appendChild(cityDisplay);
    cityDisplay.classList.add('cityDisplay');
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)} °C`;
    card.appendChild(tempDisplay);
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.textContent=`humidity: ${humidity} %`;
    card.appendChild(humidityDisplay);
    humidityDisplay.classList.add('humidityDisplay')
    descDisplay.textContent=description;
    card.appendChild(descDisplay);
    descDisplay.classList.add('descDisplay')
    weatherEmoji.textContent=getWeatherEmoji(id);
    card.appendChild(weatherEmoji);
    weatherEmoji.classList.add('weatherEmoji')
 }
 function getWeatherEmoji(weatherId){
switch(true){
case (weatherId >= 200 && weatherId < 300):
return "🌩️";
case (weatherId >= 300 && weatherId < 400):
return "🌧️";
case (weatherId >= 500 && weatherId < 600):
return "🌧️";
case (weatherId >= 600 && weatherId < 700):
return "❄️";
case (weatherId >= 700 && weatherId < 800):
return "💨";
case (weatherId === 800):
return "☀️";
case (weatherId >= 801 && weatherId < 810):
return "☁️";
default:
return "❓";
 }}
function displayerror(message){
    const errorDisplay=document.createElement("p");
    errorDisplay.textContent=message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}