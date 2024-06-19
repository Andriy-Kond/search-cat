import { fetchBreeds, fetchCatByBreed } from "./js/cat-api.js";
import "slim-select/dist/slimselect.css";

const refs = {
  selectRef: document.querySelector(".breed-select"),
  loader: document.querySelector(".loader"),
  // error: document.querySelector(".error"),
};

fetchBreeds(
  refs.selectRef,
  refs.loader
  // refs.error
);

refs.selectRef.addEventListener("change", showCatBreed);

function showCatBreed(e) {
  const breed = e.target.value; // .trim() прибирає пробіли на початку і в кінці, якщо це буде поле input

  fetchCatByBreed(
    breed,
    refs.loader
    // refs.error
  );
}

// const selectSlimSelect = new SlimSelect({
//   select: document.querySelector(".breed-select"),
//   events: {
//     beforeChange: (newVal, oldVal) => {
//       console.log(newVal);

//       // return false; // this will stop the change from happening
//     },
//   },
//   settings: {
//     closeOnSelect: true,
//   },
// });

// selectSlimSelect.getData([]);
