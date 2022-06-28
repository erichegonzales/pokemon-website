const pokemon = [
    {name: "Bulbasaur", id: "001"},
    {name: "Charmander", id: "004"},
    {name: "Squirtle", id: "007"},
]

const userRoster = []

const containerDiv = document.querySelector('#container')
const newBtn = document.querySelector('#new-pokemon-btn')
const rosterDiv = document.querySelector('#roster')

newBtn.addEventListener('click', () => {
    let num = prompt('ENTER A POKEMON NUMBER')
    console.log('Number entered: ', num)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`
    let img = document.createElement('img')
    img.setAttribute("src", imgUrl)
    img.setAttribute('class', 'roster-img')
    let position = document.querySelector(`#pokemon-${userRoster.length + 1}`)
    position.append(img)
    userRoster.push(num)
})


// DOM = Document Object Model
// loop over every ID
// create an HTML Element
// set the HTML element values
// append HTML element to the DOM

pokemon.map((element, index) => {
    console.log(element)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    let div = document.createElement('div') // adding a div to house the image element
    let h3 = document.createElement('h3')
    h3.innerText = element.name
    div.setAttribute('class', 'pokemon-card') // setting the class of the div
    let img = document.createElement('img') // creating the img element itself

    // audio element existing before it is clicked on / waiting to be clicked on
    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${element.name.toLowerCase()}.mp3`
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.setAttribute('src', audioUrl) // use this source
    source.setAttribute('type', 'audio/mpeg') // type of file
    audio.append(source) // put source in the audio
    div.addEventListener('click', () => {
        console.log('audio', audioUrl)
        audio.play();
    })

    img.src = imgUrl
    div.append(img, h3, audio) // append the elements to the div
    containerDiv.append(div)
})



