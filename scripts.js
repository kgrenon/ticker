let selectedFlavors = [];

// Create an array of flavors
let flavors = [
    "Banana Peanut Butter",
    "Moosetracks",
    "Award Winning Chocolate",
    "Banana Pudding",
    "Better Brownie Batter",
    "Birthday Batter", "Brookie Dough Blast", "Birthday Cake",
    "Brown Butter Bourbon Truffle", "Black Cherry", "Cappuccino Crunch",
    "Blueberry Cheesecake", "Caramel Cheesecake Cookie Monster", "Butter Pecan",
    "Chocolate Extreme", "Carrot Cake", "Cinnamon Bun", "Chocolate",
    "Coffee House Cookies & Cream", "Chocolate Marshmallow",
    "Cookie Butter", "Chocolate Moose Tracks", "Cookie Doughlicious",
    "Coconut", "Deep Dish Apple", "Coconut Chocolate Almond", "Key Lime Pie",
    "Coffee", "Marshmallow Overload", "Cookies & Cream", "Midnight Caramel River",
    "Cookie Dough", "Minty Mint Chip", "Cotton Candy", "Oatmeal Cookie Craving",
    "Crazy Vanilla", "Old-Fashioned Vanilla", "Dark Chocolate Raspberry Truffle",
    "Red Velvet", "Eggnog", "Peppermint Stick", "French Vanilla", "Fruiti Cereal Swirl",
    "Green Mint Chip", "Green Mint Grasshopper", "Heavenly Hazelnut", "Lil Blue Panda",
    "Maple Walnut", "Mint Moose Tracks", "Orange Blossom", "Peach",
    "Peanut Butter Caramel Cookie Dough", "Peanut Butter Cup", "Peanut Butter Twist",
    "Pistachio", "Playdough", "Praline Pecan", "Pumpkin", "Raspberry Ice Cream",
    "Road Runner Raspberry", "Rocky Road", "Rum Raisin", "Salty Caramel Truffle",
    "Strawberry", "Strawberry Cheesecake", "Superman", "Sugar Cookie", "Vanilla",
    "Vanilla Bean", "White House Cherry"

];

function populateDropdown() {
    const dropdown = document.getElementById('iceCreamFlavors');

    if (!dropdown) return; // Early return if dropdown is not on the current page

    // Sort the array
    flavors.sort();

    // Clear existing options
    dropdown.innerHTML = '';

    // Add the sorted flavors to the dropdown
    flavors.forEach(flavor => {
        const option = document.createElement('option');
        option.value = flavor;
        option.textContent = flavor;
        dropdown.appendChild(option);
    });
}

populateDropdown();  // Call this to populate the dropdown when the script is loaded

function displayFlavorsOnInput() {
    const ul = document.getElementById("flavorsList");
    ul.innerHTML = ''; // Clear the list first

    for (let flavor of selectedFlavors) {
        const li = document.createElement("li");
        li.textContent = flavor;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = function () { removeFlavor(flavor); };
        li.appendChild(removeButton);

        ul.appendChild(li);
    }
}

function displayFlavorsOnDisplay() {
    const ul = document.getElementById("displayList");
    ul.innerHTML = ''; // Clear the list first

    for (let flavor of selectedFlavors) {
        const li = document.createElement("li");
        li.textContent = flavor;
        ul.appendChild(li);
    }

    // Update the flavor count
    const flavorCountElement = document.getElementById("flavorCount");
    flavorCountElement.textContent = selectedFlavors.length;
}

function addFlavor() {
    const dropdown = document.getElementById("iceCreamFlavors");
    if (dropdown.selectedIndex < 0)
    {
        alert("Please select a flavor!");
        return;
    }


    const selectedFlavor = dropdown.options[dropdown.selectedIndex].value;

    if (!selectedFlavors.includes(selectedFlavor)) {
        selectedFlavors.push(selectedFlavor);

        // If the flavor is not in the main flavors array, add it and re-sort/populate the dropdown
        if (!flavors.includes(selectedFlavor)) {
            flavors.push(selectedFlavor);
            populateDropdown();
        }

        localStorage.setItem("selectedFlavors", JSON.stringify(selectedFlavors));
        displayFlavorsOnInput();
    } else {
        alert(`${selectedFlavor} is already added!`);
    }
}

function removeFlavor(flavor) {
    const index = selectedFlavors.indexOf(flavor);
    if (index !== -1) {
        selectedFlavors.splice(index, 1);
        localStorage.setItem("selectedFlavors", JSON.stringify(selectedFlavors));
        displayFlavorsOnInput(); // Refresh the displayed flavors on the input page
    }
}

// Load selected flavors from local storage
if (localStorage.getItem("selectedFlavors")) {
    selectedFlavors = JSON.parse(localStorage.getItem("selectedFlavors"));
}

// Check which page we're on and display the flavors accordingly
if (document.getElementById("flavorsList")) {
    displayFlavorsOnInput();
}

if (document.getElementById("displayList")) {
    displayFlavorsOnDisplay();
}
