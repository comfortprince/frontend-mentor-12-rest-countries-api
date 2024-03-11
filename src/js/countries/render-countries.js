async function fetchCountries() {
	const CountriesEndPoint = 'https://restcountries.com/v3.1/all'
	const response = await fetch(CountriesEndPoint)
	
	if(!response.ok)
		console.log(response)

	const countries = await response.json()

	// console.log(countries[0])

	renderCountries(countries)
}

function renderCountries(countries) {
	const countriesWrapper = document.querySelector('#countries-wrapper')

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
	<a class="shadow" href="#!">
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

fetchCountries()

