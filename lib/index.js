const search = document.querySelector('.search input')
const suggestion = document.querySelector('.suggestion ul')

const endpoint = 'data/se.json'
const cities = []
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data))

function getCity(value) {
  const regex = new RegExp(value, 'gi')
  return cities.filter((place) => place.city.match(regex))
}

function handleSearch() {
  if (this.value == '') {
    suggestion.innerHTML = ''
    return
  }
  const matches = getCity(this.value)
  const elements = matches.map(
    ({ city, country, population }) => `
  <li>
    <span class="city"><span class="highlight">${city}</span>, ${country}</span>
    <span class="population">${numberWithCommas(population)}</span>
  </li>
  `
  )
  suggestion.style.height = 'auto'
  suggestion.innerHTML = elements.join('')
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

search.addEventListener('keyup', handleSearch)
