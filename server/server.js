const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// API to log pledges
app.post("/api/pledge", (req, res) => {
  const contributionsPath = path.join(__dirname, "../data/contributions.json");
  const data = JSON.parse(fs.readFileSync(contributionsPath, "utf-8"));
  const newContribution = {
    timestamp: new Date(),
    message: req.body.message || "Reusable cup used",
  };
  data.push(newContribution);
  fs.writeFileSync(contributionsPath, JSON.stringify(data, null, 2));
  res.status(200).send({ message: "Pledge logged successfully!" });
});

// API to fetch contributions and impact data
app.get("/api/contributions", (req, res) => {
  const contributionsPath = path.join(__dirname, "../data/contributions.json");
  const data = JSON.parse(fs.readFileSync(contributionsPath, "utf-8"));
  
  // Calculate total pledges
  const totalPledges = data.length;

  // Generate impact message based on the number of pledges
  let impactMessage = '';
  
  // Check for every 2 pledges and display messages for multiple milestones
  if (totalPledges % 2 === 0 && totalPledges <= 50) {
    if (totalPledges <= 2) {
      impactMessage = `${totalPledges} pledges = Save 2 fish from dying due to ocean plastic, reduce landfill by preventing 5 plastic straws!`;
    } else if (totalPledges <= 10) {
      impactMessage = `${totalPledges} pledges = Prevent 20 gallons of water waste, save 1 tree from being cut down!`;
    } else if (totalPledges <= 12) {
      impactMessage = `${totalPledges} pledges = Recycle 10 plastic cups, saving enough energy to power a light bulb for 2 hours.`;
    } else if (totalPledges <= 15) {
      impactMessage = `${totalPledges} pledges = Save enough water to take 3 showers, reduce plastic pollution by recycling 15 bottles.`;
    } else if (totalPledges <= 20) {
      impactMessage = `${totalPledges} pledges = Reduce your carbon footprint by avoiding 10 car trips, save 5 gallons of fuel!`;
    } else if (totalPledges <= 25) {
      impactMessage = `${totalPledges} pledges = Save 3 endangered sea turtles from plastic ingestion, reduce landfill by preventing 20 plastic straws.`;
    } else if (totalPledges <= 30) {
      impactMessage = `${totalPledges} pledges = Avoid using 50 plastic bottles, save enough energy to power your phone for a week.`;
    } else if (totalPledges <= 35) {
      impactMessage = `${totalPledges} pledges = Reduce water consumption by 50 gallons, save 2 trees from being cut down!`;
    } else if (totalPledges <= 40) {
      impactMessage = `${totalPledges} pledges = Recycle enough plastic to create 5 new products, save 100 liters of water.`;
    } else if (totalPledges <= 45) {
      impactMessage = `${totalPledges} pledges = Prevent 10 marine animals from being harmed by plastic waste, conserve enough energy to power a refrigerator for a day.`;
    } else if (totalPledges <= 50) {
      impactMessage = `${totalPledges} pledges = Contribute to a cleaner planet by avoiding 100 plastic cups, help save 5 trees.`;
    }
  }

  // Return both the contributions and the impact message
  res.status(200).send({
    contributions: data,
    impactMessage: impactMessage
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
