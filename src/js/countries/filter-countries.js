document.querySelector('#countrySearchBox').addEventListener('blur', searchCountries)

function searchCountries(e) {
  const searchTxt = e.target.value
  
  const filteredCountries = window.countries.filter(country => {
    return country.name.common.toLowerCase().includes(searchTxt.toLowerCase())
  })

	renderCountries(filteredCountries)
}

function renderCountries(countries) {
	const countriesWrapper = document.querySelector('#countries-wrapper')

  countriesWrapper.innerHTML = ""

	countries.forEach( (country) => {
		let countryObj = {
			imgUrl: country.flags.png,
			imgAlt: country.flags.alt,
			commonName: country.name.common,
			population: country.population,
			region: country.region,
			capital: country.capital
		}

		countriesWrapper.innerHTML += COUNTRY(countryObj)
	});
}

function COUNTRY(country) {
	let html =
	`
	<a 
    data-name="${country.commonName}" 
    onClick="saveCountryName(this.getAttribute('data-name'))" 
    class="shadow flex flex-col justify-between bg-white dark:bg-dark-blue" 
    href="./country.html"
  >
      <img 
        class="min-w-full h-auto rounded-t" 
        src="${country.imgUrl}" 
        alt="${country.imgAlt}"
      >

      <div class="bg-white dark:bg-dark-blue px-6 py-6 rounded-b">
        <h2 class="text-lg font-bold mb-4">
          ${country.commonName}
        </h2>

        <p>
          <span class="font-semibold">
            Population:
          </span> 
          ${country.population}
        </p>

        <p>
          <span class="font-semibold">
            Region:  
          </span>
          ${country.region}
        </p>

        <p>
          <span class="font-semibold">
            Capital:
          </span>
          ${country.capital}
        </p>
      </div>
    </a>
	`

	return html
}

function saveCountryName(name) {
  localStorage.setItem('country-name', name)
}

fetchCountries()