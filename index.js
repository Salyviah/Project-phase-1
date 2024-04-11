document.addEventListener("DOMContentLoaded", function () {
    const fetchFactBtn = document.getElementById("fetchFactBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const resetBtn = document.getElementById("resetBtn"); 
    const factDisplay = document.getElementById("factDisplay");
    const factPicture = document.getElementById("factPicture");
    const factName = document.getElementById("factName");
    const factCharacteristics = document.getElementById("factCharacteristics");
    const favoritesList = document.getElementById("favoritesList"); // New element to display favorites

    fetchFactBtn.addEventListener("click", function () {
        fetchCatFact();
    });

    refreshBtn.addEventListener("click", function () {
        fetchCatFact();
    });

    resetBtn.addEventListener("click", function () {
        resetDisplay();
    });

    function fetchCatFact() {
        fetch("./db/db.json")
            .then(response => response.json())
            .then(data => {
                const catFacts = data.catFacts;
                const randomFact = getRandomFact(catFacts);
                displayFact(randomFact);
            })
            .catch(error => {
                console.error("Error fetching cat facts:", error);
                displayFact("Failed to fetch cat fact. Please try again later.");
            });
    }

    function getRandomFact(factsArray) {
        const randomIndex = Math.floor(Math.random() * factsArray.length);
        return factsArray[randomIndex];
    }

    function displayFact(fact) {
        factName.innerText = `Name: ${fact.name}`;
        factDisplay.innerText = `Fact: ${fact.fact}`;
        factPicture.innerHTML = `<img src="${fact.picture}" alt="Cat Picture">`;
        factCharacteristics.innerText = `Characteristics: ${fact.characteristics.join(", ")}`;
        
        const likeBtn = document.createElement("button");
        likeBtn.innerText = "Like";
        likeBtn.addEventListener("click", function () {
            incrementLikeCount(fact);
        });

        factDisplay.appendChild(likeBtn);
    }

    function resetDisplay() {
        factName.innerText = "";
        factDisplay.innerText = "";
        factPicture.innerHTML = "";
        factCharacteristics.innerText = "";
    }

    function incrementLikeCount(fact) {
        // Implement logic to increment like count for the fact
        alert(`You liked the fact about ${fact.name}`);
    }
});

