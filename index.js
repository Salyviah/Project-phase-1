document.addEventListener("DOMContentLoaded", function () {
    const fetchFactBtn = document.getElementById("fetchFactBtn");
    const factDisplay = document.getElementById("factDisplay");
    const factPicture = document.getElementById("factPicture");
    const factName = document.getElementById("factName");
    const factCharacteristics = document.getElementById("factCharacteristics");

    fetchFactBtn.addEventListener("click", function () {
        fetchCatFact();
    });

    function fetchCatFact() {
        fetch("db.json")
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
    }
});