const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data for breeds
const breeds = require('./db.json').breeds;

// Endpoint to get a list of breeds
app.get('/api/breeds', (req, res) => {
  res.json(breeds);
});

// Endpoint to search breeds based on shedding and weight
app.get('/api/breeds/search', (req, res) => {
  const { shedding, weight } = req.query;
  let filteredBreeds = breeds;

  // Filter breeds based on shedding
  if (shedding) {
    filteredBreeds = filteredBreeds.filter(breed => breed.shedding.toLowerCase() === shedding.toLowerCase());
  }

  // Filter breeds based on weight
  if (weight) {
    filteredBreeds = filteredBreeds.filter(breed => breed.weight.toLowerCase() === weight.toLowerCase());
  }

  res.json(filteredBreeds);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Event listener for search button
document.getElementById('searchButton').addEventListener('click', searchBreeds);

// Event listener for shedding input field
document.getElementById('sheddingInput').addEventListener('input', handleSheddingInput);

// Event listener for weight input field
document.getElementById('weightInput').addEventListener('input', handleWeightInput);

// Function to search breeds
function searchBreeds() {
  const shedding = document.getElementById('sheddingInput').value;
  const weight = document.getElementById('weightInput').value;

  fetch(`/api/breeds/search?shedding=${shedding}&weight=${weight}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      displayBreeds(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

// Function to handle shedding input
function handleSheddingInput() {
  // You can perform any necessary actions here
}

// Function to handle weight input
function handleWeightInput() {
  // You can perform any necessary actions here
}

// Function to display breeds
function displayBreeds(breeds) {
  const breedInfoContainer = document.getElementById('breedInfo');
  breedInfoContainer.innerHTML = '';

  breeds.forEach(breed => {
    const breedCard = document.createElement('div');
    breedCard.classList.add('breed-card');
    breedCard.innerHTML = `
      <h2>${breed.name}</h2>
      <p>Shedding: ${breed.shedding}</p>
      <p>Weight: ${breed.weight}</p>
    `;
    breedInfoContainer.appendChild(breedCard);
  });
}