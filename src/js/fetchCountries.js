import { Notify } from 'notiflix/build/notiflix-notify-aio';
const API_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = 'name,capital,population,flags,languages'

export function fetchCountries(name) {
    return fetch(`${API_URL}${name}?fields=${FIELDS}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(
                Notify.failure('Oops, there is no country with that name', response.statusText)
            );
        }
        return response.json();
    })
}