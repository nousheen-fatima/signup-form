const countryElem = document.getElementById("countryInput");

async function getCountriesData(countryName) {
  const response = await fetch(
    "https://restcountries.com/v3.1/name/" + countryName
  );

  const data = await response.json();
  return data;
}

const showCountryOptions = (countries) => {
  const countrySelect = document.getElementById("countrySelect");
  // Clear existing options
  while (countrySelect.firstChild) {
    countrySelect.removeChild(countrySelect.firstChild);
  }
  // Populate the dropdown with the list of countries
  countries.forEach((countryName) => {
    const option = document.createElement("option");
    option.textContent = countryName;
    countrySelect.appendChild(option);
  });
};

let timeoutToken;

const debounce = (e) => {
  clearTimeout(timeoutToken);
  timeoutToken = setTimeout(() => {
    const countryName = e.target.value; // input value

    getCountriesData(countryName).then((data) => {
      let countriesName = data.map((c) => c.name.common);
      showCountryOptions(countriesName);
    });
  }, 1000);
};

countryElem.addEventListener("input", debounce);
