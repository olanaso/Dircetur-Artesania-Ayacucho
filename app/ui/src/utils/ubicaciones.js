
import { baseUrl, getDataFromLocalStorage } from '../utils/config';

let countries = [];

export async function loadData() {
    try {
        const countriesResponse = await fetch(`${baseUrl}/paises`);
        countries = await countriesResponse.json();  
        populateCountries();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function populateCountries() {
    const countrySelect = document.getElementById('pais');
    countrySelect.innerHTML = '<option>Seleccione su País</option>';
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', handleCountryChange);
}

export function handleCountryChange(event) {
    console.log("target para region recibido: ", event.target.value)
    const countryId = parseInt(event.target.value);
    populateStates(countryId);
}

async function populateStates(countryId) {
    const states = await listaRegiones(countryId)
    const stateSelect = document.getElementById('region');
    stateSelect.innerHTML = '<option>Seleccione su Región</option>';

    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.id;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });  
    stateSelect.addEventListener('change', handleStateChange);
}

export async function handleStateChange(event) {
    console.log("target para ciudad recibido: ", event.target.value)
    const stateId = parseInt(event.target.value);
    populateCities(stateId);
}

async function populateCities(stateId) {
    try {
        const cities = await listaCiudades(stateId)
        const citySelect = document.getElementById('ciudad');
        citySelect.innerHTML = '<option>Seleccione su Ciudad</option>';

        //const filteredCities = cities.filter(city => city.state_id === stateId);
        
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city.id;
            option.textContent = city.name;
            citySelect.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading data:', error);
    }
    
}

async function listaRegiones (countryId){
    try {
        const statesResponse = await fetch(`${baseUrl}/regiones?pais_id=${countryId}`);
        return await statesResponse.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
    
}

async function listaCiudades (stateId){
    try {
        const citiesResponse = await fetch(`${baseUrl}/ciudades?region_id=${stateId}`);
        return await citiesResponse.json();
    } catch (error) {
        console.error('Error loading data:', error);
    }
    
}