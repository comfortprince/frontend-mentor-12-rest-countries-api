async function fetchCountry() {
  let countryName = getCountryName()

  const COUNTRY_END_POINT = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
	const response = await fetch(COUNTRY_END_POINT)
	
	if(!response.ok)
		console.log(response)

	const countrys = await response.json()

	renderCountryDetails(countrys[0])
}

async function renderCountryDetails(country) {
	const countryDetails = document.querySelector('#country-details')

  const borderCountries = []

  if('borders' in country){
    await fetch(`https://restcountries.com/v3.1/alpha?codes=${(function () {
      let str = ""
      for(let key in country.borders){
        if(country.borders.hasOwnProperty(key)){
          str += country.borders[key] + ","
        }
      }
      return str
    })()}`)
    .then((response)=>{
      if(!response.ok)
        throw new Error("Failed to fetch border countries.")

      return response.json()
    })
    .then((data)=>{
      data.forEach( function(country) {
        borderCountries.push(country.name.common)
      });
    })
  }

  let countryObj = {
    imgUrl: country.flags.png,
    imgAlt: country.flags.alt,
    commonName: country.name.common,
    nativeName: country.name.nativeName,    // Some countries have multiple native names
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.tld,
    currencies: country.currencies,         // Some countries have multiple currencies
    languages: country.languages,           // Some countries have Multiple languages
    borderCountries: borderCountries,       // Some countries have Multiple border countries
    capital: country.capital
  }

	countryDetails.innerHTML += COUNTRY_DETAILS(countryObj)
}

function COUNTRY_DETAILS(country) {
	let html =
	`
	<div class="md:w-1/2">
    <img 
      class="w-full h-auto rounded-t" 
      src="${country.imgUrl}" 
      alt="${country.imgAlt}"
    >
  </div>

  <div class="md:w-1/2">
    <div class="flex flex-col gap-8">
      <h2 class="text-2xl font-semibold">
        ${country.commonName}
      </h2>

      <div class="flex flex-col max-md:gap-8 lg:flex-row lg:justify-between">
        <div class="flex flex-col gap-1">
          <p>
            <span class="font-semibold">
              Native Name: 
            </span>
            ${(function () {
              let innerHTML = ""

              for(let key in country.nativeName){
                if(country.nativeName.hasOwnProperty(key)){
                  innerHTML += 
                  `
                    <span>
                      ${country.nativeName[key].common}, 
                    </span>
                  `
                }
              }

              return innerHTML
            })()}
          </p>
          <p>
            <span class="font-semibold">
              Population: 
            </span>
            <span>
              ${country.population}
            </span>
          </p>
          <p>
            <span class="font-semibold">
              Region: 
            </span>
            <span>
              ${country.region}
            </span>
          </p>
          <p>
            <span class="font-semibold">
              Sub Region: 
            </span>
            <span>
              ${country.subregion}
            </span>
          </p>
          <p>
            <span class="font-semibold">
              Capital: 
            </span>
            <span>
              ${country.capital}
            </span>
          </p>
        </div>
        <div class="flex flex-col gap-1">
          <p>
            <span class="font-semibold">
              Top Level Domain: 
            </span>
            <span>
              ${country.topLevelDomain}
            </span>
          </p>
          <p>
            <span class="font-semibold">
              Currencies: 
            </span>
            ${(function () {
              let innerHtml = ""

              for(let key in country.currencies){
                if(country.currencies.hasOwnProperty(key)){
                  innerHtml += 
                  `
                    <span>
                      ${key}
                    </span>
                  `
                }
              }

              return innerHtml;
            })()}
          </p>
          <p>
            <span class="font-semibold">
              Languages: 
            </span>
            ${(function() {
              let innerHtml = "<span>"

              for(let key in country.languages){
                if(country.languages.hasOwnProperty(key)){
                  value = country.languages[key]
                  innerHtml += value + ', '
                }
              }

              innerHtml += "</span>"
              return innerHtml
            })()}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div class="text-lg font-semibold">
          Border Countries:
        </div>
        <div class="flex flex-wrap gap-2">
          ${(function () {
            let innerHtml = ""

            for(let i = 0; i != country.borderCountries.length; ++i){
              innerHtml +=
              `
                <span class="inline-block bg-white dark:bg-dark-blue px-8 shadow font-light py-2">
                  ${country.borderCountries[i]}
                </span>
              `
            }

            return innerHtml
          })()}
        </div>
      </div>
    </div>
  </div>
	`

	return html
}

function getCountryName() {
  const AUTHORS_COUNTRY = 'zimbabwe'

  if(!('country-name' in localStorage))
    return AUTHORS_COUNTRY
  
  return localStorage.getItem('country-name')
}

fetchCountry()