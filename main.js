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

const containerDiv = document.querySelector('#container') // select the roster with <button> and <div>
const newBtn = document.querySelector('#new-pokemon-btn') // select the button for adding new pokemon
const rosterDiv = document.querySelector('#roster') // select the roster <div> element

// button for new pokemon
newBtn.addEventListener('click', async () => {
    // send alert when roster is full
    if (userRoster.length === 6) {
        return alert('ROSTER IS FULL')
    }

    // creates an input for user to enter a pokemon number
    let num = prompt('ENTER A POKEMON NUMBER') // alert on website that tells user to enter a pokemon number 

    // adds leading zeros for imgUrl to work
    if (num.length === 2) numZeros = "0" + num
    else if (num.length === 1) numZeros = "00" + num
    else numZeros = num;

    // remove leading zeros for dataUrl to work
    num = parseInt(num, 10)

    console.log('Number entered: ', numZeros) // prints the number entered to DOM
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numZeros}.png` // URL for pokemon images
    let dataUrl = `https://pokeapi.co/api/v2/pokemon/${num}` // URL for pokemon data to access name
    // fetch API accesses resources across the network, which makes HTTP requests, download, and upload files
    let req = await fetch(dataUrl) // gets data from URL
    let res = await req.json() // read the request body and returns it
    let name = res.forms[0].name // access the first element of the pokemon object, which is name

    let audioUrl = `https://play.pokemonshowdown.com/audio/cries/${name.toLowerCase()}.mp3` // URL for pokemon audio
    let audio = document.createElement('audio') // create element for audio
    let source = document.createElement('source') // create element for audio source
    source.setAttribute('src', audioUrl) // attaches source to audio URL
    source.setAttribute('type', 'audio/mpeg') // attaches type of source
    audio.append(source) // appends the source to the audio element

const removeBtn = document.createElement('button') // creates element for delete button

    let h3 = document.createElement('h3') // create <h3> element
    h3.innerText = name // adds the name to the <h3> element
    let img = document.createElement('img') // create element for the image
    img.setAttribute("src", imgUrl) // links the image to the URL source
    img.setAttribute('class', 'roster-img') // add class attribute to image
    let position = document.querySelector(`#pokemon-${userRoster.length + 1}`) // selects all the pokemon elements
    position.append(img, h3, removeBtn,audio) // appends these elements to the pokemon roster
    position.addEventListener('click', () => { // plays the pokemon audio when you click
        audio.play()
    })
    userRoster.push(num) // adds the pokemon to the roster array
    
    removeBtn.textContent = "Delete"
    // document.body.append(removeBtn)
    removeBtn.addEventListener('click', () => {
        img.remove()
        h3.remove()
        audio.remove()
        removeBtn.remove()
    })
})

// function to create pokemon
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
            div.classList.add('animate__shakeX')
        }, 1300)
        audio.play();
    })
    img.src = imgUrl
    div.append(img, h3, audio) // append the elements to the <div> where pokemon is stored
    return div;
}

pokemon.map((element, index) => {
    console.log(element)
    let imgUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${element.id}.png`
    const pokemonElement = createPokemon(element.name, imgUrl)
    containerDiv.append(pokemonElement)
})



