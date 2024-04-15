// http://api.weatherapi.com/v1/current.json?key=a8361c2199b2472e859114108241004&q=canoas
//  Dados a serem recolhidos: { 
//      cidade; estado; diaHoje; diaAmanha; diaDepoisAmanha; horaLocal;
//      temperaturaAtual; umidade; pressão; velVento; sensacaoTerm; precipitacaoChuva;
//      temperaturaMax; temperaturaMin;
//  }  
// fonte: Nunito;



const containerDiv = document.querySelector('.container-div');
const locationDiv = document.querySelector('.location-div');
const daysDiv = document.querySelector('.days-div');
const hoursDiv = document.querySelector('.hours-div');
const input = document.querySelector('input');
const submitButton = document.querySelector('.submit-btn');
const today = document.querySelector('.today');
const tomorrow = document.querySelector('.tomorrow');
const overmorrow = document.querySelector('.overmorrow');

async function getData(inputValue) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a8361c2199b2472e859114108241004&q=${inputValue}`, { mode: 'cors' });
    const responseData = await response.json();
    //containerDiv.innerHTML = '';

    const forecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a8361c2199b2472e859114108241004&q=${inputValue}&days=3`, { mode: 'cors' });
    const forecastData = await forecast.json();

    // Verificando se a requisição foi bem sucedida
    if (response.ok) {
        locationDiv.innerHTML = '';
        
        // Limpa o conteúdo anterior
        console.log(responseData.location);
        console.log(responseData.current)

        console.log(forecastData.forecast.forecastday[0]);
        console.log(forecastData.forecast.forecastday[1]);
        console.log(forecastData.forecast.forecastday[2]);

        hoursDiv.innerHTML = '';

        for (let i=0; i<(forecastData.forecast.forecastday[0].hour).length; i++) {
            hoursDiv.innerHTML += `${(forecastData.forecast.forecastday[0].hour[i].time).slice(11,16)} ---
                ${(forecastData.forecast.forecastday[0].hour[i].precip_mm).toFixed(2)} ----
                ${(forecastData.forecast.forecastday[0].hour[i].temp_c).toFixed(2)} ºC <br>`; 
        }

        today.innerHTML = `Today: <br> <br>${forecastData.forecast.forecastday[0].day.maxtemp_c} / 
            ${forecastData.forecast.forecastday[0].day.mintemp_c}`;

        tomorrow.innerHTML = `Tomorrow: <br> <br> ${forecastData.forecast.forecastday[1].day.maxtemp_c} /
            ${forecastData.forecast.forecastday[1].day.mintemp_c}`;

        overmorrow.innerHTML = `Overmorrow: <br> <br> ${forecastData.forecast.forecastday[2].day.maxtemp_c} /
            ${forecastData.forecast.forecastday[2].day.mintemp_c}`;

        const locationElement = document.createElement('p');
        locationElement.innerHTML = `City: ${responseData.location.name}<br> 
            State: ${responseData.location.region};<br>
            Last Updated: ${responseData.current.last_updated}<br>
            Temperature: ${responseData.current.temp_c}°C<br>
            Wind Speed: ${responseData.current.wind_kph} km/h<br>
            Wind Direction: ${responseData.current.wind_dir}<br>
            Pressure: ${responseData.current.pressure_mb} mb<br>
            Precipitation: ${responseData.current.precip_mm} mm<br>
            Humidity: ${responseData.current.humidity}%<br>
            Cloud Cover: ${responseData.current.cloud}%<br>
            Feels Like: ${responseData.current.feelslike_c}°C`;

        locationDiv.appendChild(locationElement);

        daysDiv.addEventListener('click', (event) => {
            hoursDiv.innerHTML = '';

            let dayNumber = 0;

            if (event.target.id === 'today') {
                dayNumber = 0;
            } else if (event.target.id === 'tomorrow') {
                dayNumber = 1;
            } else if (event.target.id === 'overmorrow') {
                dayNumber = 2;
            }

            for (let i=0; i<(forecastData.forecast.forecastday[dayNumber].hour).length; i++) {
                    hoursDiv.innerHTML += `${(forecastData.forecast.forecastday[0].hour[i].time).slice(11,16)} ---
                        ${(forecastData.forecast.forecastday[dayNumber].hour[i].precip_mm).toFixed(2)} ----
                        ${(forecastData.forecast.forecastday[dayNumber].hour[i].temp_c).toFixed(2)} ºC <br>`; 
            }
        })

    } else {
        console.error('Erro:', response.status);
    }
}

submitButton.addEventListener('click', () => {
    const searchValue = input.value;
    getData(searchValue);
});


getData('Canoas');