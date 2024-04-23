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

        function createAndSetElement(tagName, textContent, id) {
            const element = document.createElement(tagName);
            if (textContent) {
                element.innerText = textContent;
            }
            if (id) {
                element.id = id;
            }
            return element;
        }
        
        const cityElement = createAndSetElement('p', `${responseData.location.name}`, 'cityElement');
        const stateElement = createAndSetElement('p', `${responseData.location.region}`, 'stateElement');
        const lastUpdatedElement = createAndSetElement('p', `Last Updated: ${responseData.current.last_updated}`, 'lastUpdatedElement');
        const temperatureElement = createAndSetElement('p', `${responseData.current.temp_c} ºC`, 'temperatureElement');
        const windSpeedElement = createAndSetElement('p', `Wind Speed: ${responseData.current.wind_kph} km/h`, 'windSpeedElement');
        const windDirectionElement = createAndSetElement('p', `Wind Direction: ${responseData.current.wind_dir}`, 'windDirectionElement');
        const pressureElement = createAndSetElement('p', `Pressure: ${responseData.current.pressure_mb} mb`, 'pressureElement');
        const precipitationElement = createAndSetElement('p', `Precipitation: ${responseData.current.precip_mm} mm`, 'precipitationElement');
        const humidityElement = createAndSetElement('p', `Humidity: ${responseData.current.humidity}%`, 'humidityElement');
        const cloudCoverElement = createAndSetElement('p', `Cloud cover: ${responseData.current.cloud}%`, 'cloudCoverElement');
        const feelsLikeElement = createAndSetElement('p', `FeelsLike: ${responseData.current.feelslike_c} ºC`, 'feelsLikeElement');
        
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

        const mainElements = document.createElement('div');
        const secundaryElements = document.createElement('div');

        locationDiv.appendChild(mainElements);
        locationDiv.appendChild(secundaryElements);

        
        mainElements.appendChild(cityElement);
        mainElements.appendChild(stateElement);
        mainElements.appendChild(temperatureElement);
        mainElements.appendChild(lastUpdatedElement);
        
        secundaryElements.appendChild(windSpeedElement);
        secundaryElements.appendChild(windDirectionElement);
        secundaryElements.appendChild(pressureElement);
        secundaryElements.appendChild(precipitationElement);
        secundaryElements.appendChild(humidityElement);
        secundaryElements.appendChild(cloudCoverElement);
        secundaryElements.appendChild(feelsLikeElement);

            /*
            City: ${cityElement.innerText}<br> 
            State: ${stateElement.innerText};<br>
            Last Updated: ${lastUpdatedElement.innerText}<br>
            Temperature: ${temperatureElement.innerText}°C<br>
            Wind Speed: ${windSpeedElement.innerText} km/h<br>
            Wind Direction: ${windDirectionElement.innerText}<br>
            Pressure: ${pressureElement.innerText} mb<br>
            Precipitation: ${precipitationElement.innerText} mm<br>
            Humidity: ${humidityElement.innerText}%<br>
            Cloud Cover: ${cloudCoverElement.innerText}%<br>
            Feels Like: ${feelsLikeElement.innerText}°C`;
            */

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