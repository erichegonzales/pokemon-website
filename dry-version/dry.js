// DRY = Don't Repeat Yourself

const pokemon = [
    { name: "Bulbasaur", id: "001" },
    { name: "Charmander", id: "004" },
    { name: "Squirtle", id: "007" },
]

const userRoster = []

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const rosterDiv = document.querySelector('#roster')

newBtn.addEventListener('click', async () => {
    let num = prompt('ENTER A POKEMON NUMBER')
    console.log('Number entered: ', num)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
    let dataUrl = `https://pokeapi.co/api/v2/pokemon/${num}`
    let req = await fetch(dataUrl) // request
    let res = await req.json() // result
    let name = res.forms[0].name

    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3`
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioUrl) // use this source
    source.setAttribute('type', 'audio/mpeg') // type of file
    audio.append(source) // put source in the audio

    let h3 = document.createElement('h3')
    h3.innerText = name
    let img = document.createElement('img')
    img.setAttribute("src", imgUrl)
    img.setAttribute('class', 'roster-img')
    let position = document.querySelector(`#pokemon-${userRoster.length + 1}`)
    position.append(img, h3, audio)
    position.addEventListener('click', () => {
        audio.play()
    })
    userRoster.push(num)
})

// DOM = Document Object Model
// loop over every ID
// create an HTML Element
// set the HTML element values
// append HTML element to the DOM

const createPokemon = (pokemonName, imgUrl) => {
    let div = document.createElement('div') // adding a div to house the image element
    let h3 = document.createElement('h3')
    h3.innerText = pokemonName // before: element.name
    div.setAttribute('class', 'pokemon-card') // setting the class of the div
    let img = document.createElement('img') // creating the img element itself
    // audio element existing before it is clicked on / waiting to be clicked on
    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${pokemonName.toLowerCase()}.mp3` // before: element.name
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioUrl) // use this source
    source.setAttribute('type', 'audio/mpeg') // type of file
    audio.append(source) // put source in the audio
    div.addEventListener('click', () => {
        div.classList.add('animate__animated')
        div.classList.add('animate__shakeX')
        // div.classList.add('pokemon-card-flash')
        // console.log('audio', audioUrl)
        setTimeout(() => {
            // div.classList.add('animate__animated'), not the part running the animation
            div.classList.add('animate__shakeX') // but always going to be moving the card
            // div.classList.add('pokemon-card-flash')
        }, 1300)
        audio.play();
    })
    img.src = imgUrl
    div.append(img, h3, audio) // append the elements to the div
    return div; // new
}

pokemon.map((element, index) => {
    console.log(element)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    const pokemonElement = createPokemon(element.name, imgUrl) // new
    containerDiv.append(pokemonElement)
})
