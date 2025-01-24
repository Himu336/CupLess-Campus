let points = localStorage.getItem("points") || 0;

// Stats per pledge
const plasticSavedPerPledge = 1; // Number of cups saved per pledge
const co2ReducedPerPledge = 0.25; // Kilograms of CO₂ reduced per pledge
const treesSavedPerPledge = 0.01; // Fraction of a tree saved per pledge

// Messages for motivation
const messages = [
  "You're making a difference, one cup at a time!",
  "Small changes lead to big impacts—keep it up!",
  "Every action counts—thanks for your effort!",
  "You're part of the change the world needs!",
  "The planet thanks you for your pledge!",
  "Together, we can create a greener future!"
];

// Fun facts
const funFacts = [
  "Saving one plastic cup conserves enough energy to power a light bulb for 1 hour.",
  "Every 1kg of CO₂ reduced is like planting a tree and letting it grow for 10 years.",
  "Each tree saved absorbs up to 48 pounds of CO₂ every year!",
  "The average person uses 500 disposable cups annually. You're ahead of the curve!",
  "By reducing CO₂ emissions, you're helping slow global warming—awesome work!",
  "Every reusable cup saves 2.5 liters of water otherwise wasted in production.",
  "Reducing waste today creates a cleaner future for the next generation."
];

// Show the pledge section with a fade-in effect when "Take a Pledge" button is clicked
document.querySelector("#take-pledge-btn").addEventListener("click", function () {
  const pledgeSection = document.querySelector("#pledge-section");
  pledgeSection.style.display = "block";
  setTimeout(() => {
    pledgeSection.style.opacity = 1;
    pledgeSection.style.transform = "translateY(0)";
  }, 10);
});

document.getElementById("community").style.display = "block"; // To show the section


// Add points when the pledge is confirmed
function confirmPledge() {
  points++;
  localStorage.setItem("points", points);


  // Log the pledge to the backend
  fetch("/api/pledge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "Reusable cup used" }),
  });

  // Hide the pledge section with a fade-out effect after confirming
  const pledgeSection = document.querySelector("#pledge-section");
  pledgeSection.style.opacity = 0;
  pledgeSection.style.transform = "translateY(20px)";
  setTimeout(() => {
    pledgeSection.style.display = "none";
  }, 500); // Wait for the animation to complete before hiding

  // Update the dashboard
  updateDashboard();
}

// Function to update the dashboard stats
function updateDashboard() {
  const totalPledges = points;
  document.querySelector("#totalPledges").textContent = totalPledges;
  document.querySelector("#plasticCupsSaved").textContent =
    totalPledges * plasticSavedPerPledge;
  document.querySelector("#co2Reduced").textContent =
    (totalPledges * co2ReducedPerPledge).toFixed(1) + "kg";
  document.querySelector("#treesSaved").textContent =
    (totalPledges * treesSavedPerPledge).toFixed(2);

  // Update motivational message
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  document.querySelector("#motivationalMessage").textContent = randomMessage;

  // Update fun facts
  updateFunFacts();
}

// Function to update random fun facts
function updateFunFacts() {
  const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  document.querySelector("#funFacts").textContent = randomFact;
}

// Add event listener to the "Confirm Pledge" button
document.querySelector("#confirm-pledge-btn").addEventListener("click", confirmPledge);

// Initialize dashboard on page load
updateDashboard();
