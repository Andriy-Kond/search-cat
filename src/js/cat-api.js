// Use it as the 'x-api-key' header when making any request to the API, or by adding as a query string parameter e.g. 'api_key=live_FAKx2pDLsy0XqcD8zWm5HnJoTahsNP10pQpG021j9LSGUyM89HtdGFRCRrCvh7H1'
// GET-запит на ресурс https://api.thecatapi.com/v1/breeds, що повертає масив об'єктів.
// У разі успішного запиту, необхідно наповнити select.breed-select опціями так, щоб value опції містило id породи, а в інтерфейсі користувачеві відображалася назва породи.

import axios from "axios";
import SlimSelect from "slim-select";

axios.defaults.headers.common["x-api-key"] =
  "live_FAKx2pDLsy0XqcD8zWm5HnJoTahsNP10pQpG021j9LSGUyM89HtdGFRCRrCvh7H1";

export async function fetchBreeds(select, loader, refError) {
  select.classList.add("hidden");
  loader.classList.remove("hidden");
  refError.classList.add("hidden");

  await axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((resp) => {
      resp.data.forEach((breed) => {
        const option = document.createElement("option");
        option.value = breed.id;
        option.textContent = breed.name;
        select.appendChild(option);
      });

      select.selectedIndex = -1;
      select.classList.remove("hidden");
      loader.classList.add("hidden");

      const selectSlimSelect = new SlimSelect({
        select: document.querySelector(".breed-select"),
        events: {
          beforeChange: (newVal, oldVal) => {
            // return false; // this will stop the change from happening
          },
        },
        settings: {
          closeOnSelect: true,
          placeholderText: "Select breed here",
        },
      });

      selectSlimSelect.getData([select]);
    })
    .catch((error) => {
      loader.classList.add("hidden");
      refError.classList.remove("hidden");
      console.error("Помилка при отриманні даних:", error);
    });
}

export function fetchCatByBreed(breedId, loader, refError) {
  const catInfo = document.querySelector(".cat-info");
  const options = { breed_ids: breedId };

  catInfo.classList.add("hidden");
  loader.classList.remove("hidden");
  refError.classList.add("hidden");

  axios
    .get(`https://api.thecatapi.com/v1/images/search?${options}`)
    .then((resp) => {
      const catImg = document.createElement("img");
      catImg.src = resp.data[0].url;
      catImg.width = 600;

      catInfo.innerHTML = "";
      catInfo.appendChild(catImg);

      catInfo.classList.remove("hidden");
      loader.classList.add("hidden");
    })
    .catch((error) => {
      loader.classList.add("hidden");
      refError.classList.remove("hidden");
      console.error("Помилка при отриманні даних:", error);
    });
}
