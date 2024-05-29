const baseUrl = `${window.location.protocol}//${window.location.host}`;
let countries = [];
let states = [];
let cities = [];

export async function loadData() {
    try {
        const countriesResponse = await fetch(baseUrl + '/countries.json');
        countries = await countriesResponse.json();

        const statesResponse = await fetch(baseUrl + '/states.json');
        states = await statesResponse.json();

        const citiesResponse = await fetch(baseUrl + '/cities.json');
        cities = await citiesResponse.json();

        populateCountries();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function populateCountries() {
    const countrySelect = document.getElementById('pais');
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.id;
        option.textContent = country.name;
        countrySelect.appendChild(option);
    });

    countrySelect.addEventListener('change', handleCountryChange);
}

function handleCountryChange(event) {
    const countryId = parseInt(event.target.value);
    populateStates(countryId);
}

function populateStates(countryId) {
    const stateSelect = document.getElementById('region');
    stateSelect.innerHTML = '<option>Seleccione su Región</option>';

    const filteredStates = states.filter(state => state.country_id === countryId);
    filteredStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state.id;
        option.textContent = state.name;
        stateSelect.appendChild(option);
    });

    stateSelect.addEventListener('change', handleStateChange);
}

function handleStateChange(event) {
    const stateId = parseInt(event.target.value);
    populateCities(stateId);
}

function populateCities(stateId) {
    const citySelect = document.getElementById('ciudad');
    citySelect.innerHTML = '<option>Seleccione su Ciudad</option>';

    const filteredCities = cities.filter(city => city.state_id === stateId);
    filteredCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}
