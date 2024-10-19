document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById("container");
    const button1 = document.getElementById("newbutton");
    const button2 = document.getElementById("newbutton2");
    const button3 = document.getElementById("newbutton3");

    createNewPad(16); // Create the initial grid

    button1.addEventListener("click", () => {
        let userInput = prompt("Enter the number of squares per side for the new grid");

        while (userInput > 100 || userInput < 1 || isNaN(userInput)) {
            userInput = prompt("Please enter a number between 1 and 100");
        }
        createNewPad(userInput); // Create new grid based on user input
    });

    function createNewPad(gridSize) {
        gridContainer.innerHTML = ""; // Clear the previous grid
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set the grid size

        for (let i = 0; i < gridSize * gridSize; i++) {
            const gridItem = document.createElement("div");
            gridItem.classList.add("gridItem");
            gridItem.setAttribute("data-darken", 0); // Initialize the darken attribute to track interactions
            gridContainer.appendChild(gridItem); // Append the grid item
        }

        activateSketch(); // Enable sketching with new grid
    }

    function activateSketch() {
        const gridItems = document.querySelectorAll(".gridItem"); // Get all the grid items
        button2.addEventListener("click", () => {
        gridItems.forEach(gridItem => {
            gridItem.addEventListener("mouseover", () => {
                let darkenCount = parseInt(gridItem.getAttribute("data-darken")); // Get the current darken count
                
                if (darkenCount === 0) {
                    // First interaction: set a random color
                    const randomColor = getRandomRGB();
                    gridItem.style.backgroundColor = randomColor;
                    gridItem.setAttribute("data-color", randomColor); // Store the original color
                } 

                // On subsequent interactions, darken the color by 10%
                if (darkenCount < 10) {
                    darkenCount++;
                    gridItem.setAttribute("data-darken", darkenCount); // Update the darken count
                    const originalColor = gridItem.getAttribute("data-color");
                    const darkerColor = darkenColor(originalColor, darkenCount * 10); // Darken by 10% per interaction
                    gridItem.style.backgroundColor = darkerColor;
                }
            });
        });
    });
    }

    button3.addEventListener("click", () => {
        const gridItems = document.querySelectorAll(".gridItem");
        gridItems.forEach(gridItem => {
            gridItem.style.backgroundColor = ""; // Clear the background color
            gridItem.setAttribute("data-darken", 0); // Reset darken count
        });
    });

    // Generate random RGB color
    function getRandomRGB() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    // Darken a color by reducing its RGB values by a percentage
    function darkenColor(rgbColor, percentage) {
        const rgbValues = rgbColor.match(/\d+/g).map(Number); // Extract RGB values
        const factor = 1 - (percentage / 100); // Calculate darkening factor (e.g., 10% -> 0.9)
        const [r, g, b] = rgbValues.map(value => Math.floor(value * factor)); // Apply darkening factor
        return `rgb(${r}, ${g}, ${b})`; // Return the darkened color
    }
});
