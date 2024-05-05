import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";

const refs = {
  select: document.querySelector(".breed-select"),
  loader: document.querySelector(".loader"),
  error: document.querySelector(".error"),
};

fetchBreeds(refs.select, refs.loader, refs.error);

refs.select.addEventListener("change", showCatBreed);

function showCatBreed(e) {
  const breed = e.target.value;

  fetchCatByBreed(breed, refs.loader, refs.error);
}
