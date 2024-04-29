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
const mainElementsDiv = document.querySelector('.main-elements');
const secondaryElementsDiv = document.querySelector('.secondary-elements');
const mainElements01 = document.querySelector('.main-elements-01');
const mainElements02 = document.querySelector('.main-elements-02');


async function getData(inputValue) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=a8361c2199b2472e859114108241004&q=${inputValue}`, { mode: 'cors' });
    const responseData = await response.json();

    const forecast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a8361c2199b2472e859114108241004&q=${inputValue}&days=3`, { mode: 'cors' });
    const forecastData = await forecast.json();

    // Verificando se a requisição foi bem sucedida
    if (response.ok) {
        mainElements01.innerHTML = '';
        mainElements02.innerHTML = '';
        secondaryElementsDiv.innerHTML = '';
        
        // Limpa o conteúdo anterior
        console.log(responseData.location);
        console.log(responseData.current);

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
        const feelsLikeElement = createAndSetElement('p', `Feels Like ${responseData.current.feelslike_c} ºC`, 'feelsLikeElement');
        const conditionTextElement = createAndSetElement('p', `${responseData.current.condition.text}`, 'conditionTextElement');

        const iconElement = document.createElement('img');
        iconElement.classList.add('main-icon');
        iconElement.src = responseData.current.condition.icon;

        hoursDiv.innerHTML = '';

        const agora = new Date();
        const horaAtual = agora.getHours();
        
        for (let i = 0; i < forecastData.forecast.forecastday[0].hour.length; i++) {
            const horaPrevisao = parseInt(forecastData.forecast.forecastday[0].hour[i].time.slice(11, 13), 10);
        
            if (horaPrevisao >= horaAtual) {
                hoursDiv.innerHTML += `${(forecastData.forecast.forecastday[0].hour[i].time).slice(11, 16)} ---
                    ${(forecastData.forecast.forecastday[0].hour[i].precip_mm).toFixed(2)} mm ----
                    ${(forecastData.forecast.forecastday[0].hour[i].temp_c).toFixed(1)} ºC <br>`;
            }
        }

        const forecastIcon01 = document.createElement('img');
        const forecastIcon02 = document.createElement('img');
        const forecastIcon03 = document.createElement('img');

        forecastIcon01.src = forecastData.forecast.forecastday[0].day.condition.icon;
        forecastIcon02.src = forecastData.forecast.forecastday[1].day.condition.icon;
        forecastIcon03.src = forecastData.forecast.forecastday[2].day.condition.icon;

        forecastIcon01.classList.add('forecast-icon');
        forecastIcon02.classList.add('forecast-icon');
        forecastIcon03.classList.add('overmorrow-icon');

        function obterDiaEMes(data) {
            const dia = data.getDate();
            const mes = data.getMonth() + 1; // Adicionando 1 para ajustar o índice baseado em zero
        
            // Formatando para garantir que tenhamos dois dígitos no dia e no mês
            const diaFormatado = dia < 10 ? `0${dia}` : dia;
            const mesFormatado = mes < 10 ? `0${mes}` : mes;
        
            return `${diaFormatado}/${mesFormatado}`;
        }

        function obterDiaSemana(data) {
            const diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const diaSemanaIndex = data.getDay();
            return diasSemana[diaSemanaIndex];
        }
        
        const hoje = new Date();
        const amanha = new Date();
        const depoisDeAmanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        depoisDeAmanha.setDate(depoisDeAmanha.getDate() + 2);

        today.innerHTML = `
        <span class="day-of-week">${obterDiaSemana(hoje)}</span> 
        <span class="date">${obterDiaEMes(hoje)}</span> 
        ${(forecastData.forecast.forecastday[0].day.maxtemp_c).toFixed(0)} ºC <br> 
        ${forecastData.forecast.forecastday[0].day.mintemp_c} ºC 
        `;
        today.appendChild(forecastIcon01);
        
        tomorrow.innerHTML = `
            <span class="day-of-week">${obterDiaSemana(amanha)}</span> 
            <span class="date">${obterDiaEMes(amanha)}</span> 
            ${(forecastData.forecast.forecastday[1].day.maxtemp_c).toFixed(0)} ºC <br> 
            ${forecastData.forecast.forecastday[1].day.mintemp_c} ºC
        `;
        tomorrow.appendChild(forecastIcon02);
        
        overmorrow.innerHTML = `
            <span class="day-of-week">${obterDiaSemana(depoisDeAmanha)}</span> 
            <span class="date">${obterDiaEMes(depoisDeAmanha)}</span> 
            ${(forecastData.forecast.forecastday[2].day.maxtemp_c).toFixed(0)} ºC <br>
            ${forecastData.forecast.forecastday[2].day.mintemp_c} ºC
        `;
        overmorrow.appendChild(forecastIcon03);
    


        mainElements01.appendChild(cityElement);
        mainElements01.appendChild(stateElement);
        mainElements01.appendChild(lastUpdatedElement);

        mainElements02.appendChild(iconElement);
        mainElements02.appendChild(temperatureElement);
        mainElements02.appendChild(conditionTextElement);
               
        secondaryElementsDiv.appendChild(feelsLikeElement);

        // Função para criar um contêiner com texto e imagem SVG
        function createPropertyContainer(property, value, svgSrc) {
            const container = document.createElement('div');
            container.classList.add(`property-container`);
            
            const nameTextElement = document.createElement('p');
            nameTextElement.textContent = `${property}`;
            nameTextElement.classList.add('text-element');
            
            const valueTextElement = document.createElement('p');
            valueTextElement.textContent = `${value}`;
            valueTextElement.classList.add('text-element');

            const svgElement = document.createElement('img');
            svgElement.src = svgSrc;
            svgElement.classList.add('svg-icon'); // Adicione uma classe para estilização

            container.appendChild(svgElement);
            container.appendChild(nameTextElement);
            container.appendChild(valueTextElement);

            return container;
        }

        const containerInsideContainer = document.createElement('div');
        containerInsideContainer.classList.add('container-inside');

        if (responseData.current.precip_mm > 1) {
            const secondaryContainer = createPropertyContainer('Precipitation', `${responseData.current.precip_mm}mm`, 'img/precip.svg');
            containerInsideContainer.appendChild(secondaryContainer);
        } else {
            const secondaryContainer = createPropertyContainer('Humidity', `${responseData.current.humidity}%`, 'img/drops.svg');
            containerInsideContainer.appendChild(secondaryContainer);  
        }

        // Exemplo de utilização para várias propriedades
        const properties = [
            { name: 'Pressure', value: `${responseData.current.pressure_mb}mb`, svgSrc: 'img/pressure.svg' },
            { name: 'Wind Speed', value: `${responseData.current.wind_kph} km/h`, svgSrc: 'img/wind.svg' }
            // Adicione mais propriedades conforme necessário
        ];

        // Loop para criar contêineres para cada propriedade e adicioná-los ao elemento principal
        properties.forEach(property => {
            const container = createPropertyContainer(property.name, property.value, property.svgSrc);
            containerInsideContainer.appendChild(container);
        });

        secondaryElementsDiv.appendChild(containerInsideContainer);


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
        
            for (let i = 0; i < (forecastData.forecast.forecastday[dayNumber].hour).length; i++) {
                const horaPrevisao = parseInt(forecastData.forecast.forecastday[dayNumber].hour[i].time.slice(11, 13), 10);
        
                if (horaPrevisao >= horaAtual) {
                    hoursDiv.innerHTML += `${(forecastData.forecast.forecastday[0].hour[i].time).slice(11, 16)} ---
                        ${(forecastData.forecast.forecastday[dayNumber].hour[i].precip_mm).toFixed(2)} mm ----
                        ${(forecastData.forecast.forecastday[dayNumber].hour[i].temp_c).toFixed(1)} ºC <br>`;
                }
            }
        });

    } else {
        console.error('Erro:', response.status);
    }
}

submitButton.addEventListener('click', () => {
    const searchValue = input.value;
    getData(searchValue);
});


getData('Canoas');