
const flagImages = [
    {
        name: "USA",
        image: "https://flagsapi.com/US/shiny/64.png"
    },
    {
        name: "Belgium",
        image: "https://flagsapi.com/BE/shiny/64.png"
    },
    {
        name: "France",
        image: "https://flagsapi.com/FR/shiny/64.png"
    },
    {
        name: "Germany",
        image: "https://flagsapi.com/DE/shiny/64.png"

    },
    {
        name: "Japan",
        image: "https://flagsapi.com/JP/shiny/64.png"

    },
    {
        name: "Canada",
        image: "https://flagsapi.com/CA/shiny/64.png"

    },
    {
        name: "Australia",
        image: "https://flagsapi.com/AU/shiny/64.png"

    },
    {
        name: "Andorra",
        image: "https://flagsapi.com/AD/shiny/64.png"

    },
    {
        name: "United Arab Emirates",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "Afghanistan",
        image: "https://flagsapi.com/AF/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    {
        name: "",
        image: "https://flagsapi.com/AE/shiny/64.png"

    },
    
    // Add more flag objects as needed
];
// script.js
let score = 0;
let wrongGuesses = 0;
let timerInterval; // Declare timerInterval globally


let totalTime = 60; // Total time in seconds
let remainingTime = totalTime; // Initialize remaining time

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function setupGame() {
    remainingTime = totalTime; // Reset the timer
    updateTimerDisplay();

    shuffle(flagImages);
    updateFlags();
    startTimer(); // Start the countdown timer
}

function updateFlags() {
    const flagNameElement = document.getElementById("flagName");
    const flagOptions = flagImages.slice(0, 3); // Select the first 3 shuffled flags

    const correctIndex = Math.floor(Math.random() * flagOptions.length);
    const correctFlag = flagOptions[correctIndex];

    flagNameElement.innerText = correctFlag.name;

    for (let i = 0; i < 3; i++) {
        const imgElement = document.querySelector(`.flag${i + 1} img`);
        imgElement.src = flagOptions[i].image;
        imgElement.onclick = () => evaluateGuess(i, correctIndex);
    }
}

function evaluateGuess(selectedIndex, correctIndex) {
    if (remainingTime > 0) {
        // Evaluate the guess only if there's remaining time
        if (selectedIndex === correctIndex) {
            score++;
        } else {
            wrongGuesses++;
        }

        if (wrongGuesses >= 3) {
            showScoreboard();
        } else {
            setupGame();
        }
    }
}

function showScoreboard() {
    clearInterval(timerInterval); // Stop the timer
    gameActive = false;
    
    const restartButton = document.querySelector(".restart button");
    restartButton.style.display = "block"; // Display the restart button
    
    const body = document.querySelector("body");
    body.innerHTML = `<h1>Game Over</h1>
                      <p>Your score: ${score}</p>
                      <div class="restart" style="display: block;">
                          <button onclick="restartGame()">Restart</button>
                      </div>`;
}





function updateTimerDisplay() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `Time: ${remainingTime} seconds`;

    if (remainingTime <= 10) {
        timerElement.style.color = "red"; // Change the color to indicate low time
    } else {
        timerElement.style.color = "black";
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateTimerDisplay();

            if (remainingTime === 0) {
                clearInterval(timerInterval);
                showScoreboard();
            }
        }
    }, 1000);

    function restartGame() {
        score = 0;
        wrongGuesses = 0;
        
        // Clear the body content
        const body = document.querySelector("body");
        body.innerHTML = '';
    
        // Reset the timer display and start the game again
        const timerElement = document.createElement("div");
        timerElement.id = "timer";
        timerElement.className = "timer";
        body.appendChild(timerElement);
    
        setupGame(); // Set up the game again
        
        const restartButton = document.querySelector(".restart button");
        restartButton.style.display = "none"; // Hide the restart button again
    }
    
    
    
}

// Start the game when the page loads
window.onload = setupGame;
