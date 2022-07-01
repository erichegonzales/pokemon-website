// DOM = Document Object Model
// loop over every ID
// create an HTML Element
// set the HTML element values
// append HTML element to the DOM

/*
Right now our Pokemon project works but has no constraints/safeguards. 
Fix it up by meeting the goals below. You may rewrite ANY of the code (html, css included) HOWEVER you see fit, 
so long as the goals are met and you may work with 1 partner.

COMMIT AND PUSH after you accomplish each goal
1. When entering a Pokemon number, that is one or two digits, it should work as well as it does when entering a number of three digits.
2. When the user has added 6 Pokemon to their roster, do not allow them to add any more.
3. Allow the user to remove a pokemon from their roster.
4. When the user tries to remove a pokemon, make them confirm that they want to remove it before it removes that pokemon.
5. In the Pokemon roster section, allow the user to nickname Pokemon in their roster. 
6. The user interface (webpage) should display the nickname instead of the Pokemon name if the Pokemon has a nickname.
*/

// creating pokemon object
const pokemon = [
    { name: "Bulbasaur", id: "001" },
    { name: "Charmander", id: "004" },
    { name: "Squirtle", id: "007" },
]

// empty array for the roster
const userRoster = []

const containerDiv = document.querySelector('#container') // storing the roster container with <button> and <div>
const newBtn = document.querySelector('#new-pokemon-btn') // storing the button for adding new pokemong
const rosterDiv = document.querySelector('#roster') // storing the roster <div> element

// button for new pokemon
// event that occurs when button is clicked
newBtn.addEventListener('click', async () => {
    if (userRoster.length === 6) {
        return alert('ROSTER IS FULL')
    }
    
    let num = prompt('ENTER A POKEMON NUMBER') // alert on website that tells user to enter a pokemon number 

    // adds leading zeros for imgUrl
    if (num.length === 2) numZeros = "0" + num
    else if (num.length === 1) numZeros = "00" + num
    else numZeros = num;

    // remove leading zeros for dataUrl
    num = parseInt(num, 10)
    console.log('this is', num)

    console.log('Number entered: ', numZeros) // prints the number entered to DOM
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numZeros}.png` // URL to images of pokemon
    let dataUrl = `https://pokeapi.co/api/v2/pokemon/${num}` // URL to the data to the pokemon
    // Fetch API accesses resources across the network. 
    // make HTTP requests, download, and upload files
    let req = await fetch(dataUrl)
    let res = await req.json() // reads the request body and returns it
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
        setTimeout(() => {
            div.classList.add('animate__shakeX') // but always going to be moving the card
        }, 1300)
        audio.play();
    })
    img.src = imgUrl
    div.append(img, h3, audio) // append the elements to the div
    return div;
}

pokemon.map((element, index) => {
    console.log(element)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    const pokemonElement = createPokemon(element.name, imgUrl)
    containerDiv.append(pokemonElement)
})



