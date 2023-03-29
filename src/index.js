import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

// отримаємо посилання на елементи
const searchInputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

// ставимо слузача на інпут
searchInputEl.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);

function handleSearchCountry(event) {
  const nameCountryInput = event.target.value.trim();
  if (!nameCountryInput) {
    clearMurkup();
    Notiflix.Notify.info('Please enter country name');
    return;
  }

  fetchCountries(nameCountryInput).then(response => {
    console.log(response);
    if (response.length > 10) {
      clearMurkup();
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    }
    if (response.length >= 2 && response.length <= 10) {
      countryInfoEl.innerHTML = '';
      createCountryList(response);
    }
    if (response.length === 1) {
      countryListEl.innerHTML = '';
      createCountryInfo(response);
    }
  });
}
function createCountryList(country) {
  country
    .map(({ name, flags }) => {
      countryListEl.insertAdjacentHTML(
        'beforeend',
        ` <li class="country-list__item">
        <img width="30"
          class="country-flag"
          src="${flags.svg}"
          alt="flag of ${name.official}"
        >
        <p class="country-name">${name.official}</p>
      </li>
        `
      );
    })
    .join('');
}
function createCountryInfo(country) {
  country
    .map(({ name, flags, capital, population, languages }) => {
      countryInfoEl.insertAdjacentHTML(
        'beforeend',
        `<div class="country__wrapper"><img src='${
          flags.svg
        }' class="country-flag" width ="50" alt='flag of ${name.official}' />
      <h2 class='country-name'>${name.official}</h2></div>
      <ul class='country-info__list'>
        <li class='country-info__item'>
          <p class='capital-name'><span class='subtitle'>Capital: </span>
            ${capital}</p>
        </li>
        <li class='country-info__item'>
          <p class='population'><span class='subtitle'>Population: </span>
            ${population}</p>
        </li>
        <li class='country-info__item'>
          <p class='languages'><span class='subtitle'>Languages: </span>
            ${Object.values(languages)}</p>
        </li>
      </ul>
        `
      );
    })
    .join('');
}
function clearMurkup() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
