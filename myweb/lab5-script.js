document.addEventListener("DOMContentLoaded", function() {
    // Function for the "Import new badge" button
    document.querySelector("button").addEventListener("click", function() {
        alert("Feature coming soon! This button will allow you to import a new badge.");
    });

    // Function to update rating stars
    const ratingStars = document.querySelector(".archived-course .rating-stars");
    let userRating = 4; // Default rating

    // Display initial rating
    displayRating(userRating);

    // Allow user to click to update rating
    ratingStars.addEventListener("click", function() {
        userRating = (userRating % 5) + 1; // Cycle through ratings 1 to 5
        displayRating(userRating);
    });

    function displayRating(rating) {
        ratingStars.innerHTML = "Your rating: " + "★".repeat(rating) + "☆".repeat(5 - rating);
    }

    // Toggle sections based on navigation
    const sections = {
        "certifications-link": document.getElementById("certifications"),
        "archived-link": document.getElementById("archived"),
        "learning-tools-link": document.getElementById("learning-tools")
    };

    function showSection(sectionId) {
        Object.keys(sections).forEach(key => {
            sections[key].style.display = key === sectionId ? "block" : "none";
        });
    }

    // Add click event listeners to navigation links
    document.getElementById("certifications-link").addEventListener("click", function() {
        showSection("certifications-link");
    });

    document.getElementById("archived-link").addEventListener("click", function() {
        showSection("archived-link");
    });

    document.getElementById("learning-tools-link").addEventListener("click", function() {
        showSection("learning-tools-link");
    });

    // Initially show "My badges" section
    showSection("certifications-link");
});

