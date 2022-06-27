const pokemon = ['Charmander', 'Bulbosaur', 'Squirtle']
const pokemonIDs = ['001', '004', '007']
const containerDiv = document.querySelector('#container')

// DOM = Document Object Model
// loop over every ID
// create an HTML Element
// set the HTML element values
// append HTML element to the DOM

pokemonIDs.map((id) => {
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
    console.log('img url', imgUrl)
    let div = document.createElement('div') // adding a div to house the image element
    div.setAttribute('class', 'pokemon-card') // setting the class of the div
    let img = document.createElement('img') // creating the img element itself
    img.src = imgUrl
    div.append(img) // append the img element to the div
    document.body.append(div)
    containerDiv.append(div)
})

