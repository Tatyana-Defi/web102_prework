/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let game of games) {
        // create a new div element
        const gameCard = document.createElement("div");

        // add the class game-card to the div's class list
        gameCard.classList.add("game-card");

        // set the inner HTML using a template literal to display some info about the game
        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
        `;
  // Append the game card to the games-container
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.appendChild(gameCard);
    }
}
// Call the function with the correct variable to add all games to the page
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()}`;


// grab the amount raised card
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount pledged
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab the number of games card
const gamesCard = document.getElementById("num-games");

// calculate the total number of games using the length of the GAMES_JSON array
const totalGames = GAMES_JSON.length;

// set the inner HTML using a template literal
gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    // Remove all existing games from the DOM
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the addGamesToPage function to display the unfunded games
    addGamesToPage(unfundedGames);
}

function filterFundedOnly() {
    // Remove all existing games from the DOM
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the addGamesToPage function to display the funded games
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    // Remove all existing games from the DOM
    deleteChildElements(gamesContainer);

    // Use the addGamesToPage function to display all games from the GAMES_JSON array
    addGamesToPage(GAMES_JSON);
}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// Add event listeners to the buttons in the "Our Games" section

// Connect the filterUnfundedOnly function to the unfundedBtn
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Connect the filterFundedOnly function to the fundedBtn
fundedBtn.addEventListener("click", filterFundedOnly);

// Connect the showAllGames function to the allBtn
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

/// Grab the description container
// Grab the description container
const descriptionContainer = document.getElementById("description-container");

// Use filter to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// Create a string that explains the number of unfunded games using a ternary operator
const unfundedGamesText = unfundedGamesCount === 1
    ? `There is 1 game that has not yet met its funding goal.`
    : `There are ${unfundedGamesCount} games that have not yet met their funding goals.`;

// Create a new DOM element containing the template string
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.innerText = unfundedGamesText;

// Append the new element to the description container
descriptionContainer.appendChild(unfundedGamesElement);

// Create a string using a template literal and ternary operator
const displayStr = `
    A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} games.
    Currently, ${unfundedGamesCount} ${unfundedGamesCount === 1 ? 'game remains' : 'games remain'} unfunded.
    We need your help to fund these amazing games!
`;

// Create a new DOM element containing the template string
const companyInfoElement = document.createElement("p");
companyInfoElement.innerText = displayStr;

// Append the new element to the description container
descriptionContainer.appendChild(companyInfoElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item