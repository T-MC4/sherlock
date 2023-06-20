export function analyzeBusinessMetrics(kpiJsonData: Record<string, number>) {
  // Initialize the constraints array
  let constraints = [];

  // Category-wise Constraint Evaluation

  // Organic Output
  if (kpiJsonData["Contacted Leads"] != 0) {
    if (
      kpiJsonData["Responses"] > 0.1 * kpiJsonData["Contacted Leads"] &&
      kpiJsonData["Appts Set"] > 0.3 * kpiJsonData["Responses"] &&
      kpiJsonData["Contacted Leads"] < 250
    ) {
      constraints.push({ rank: 2, description: "Organic Output Is Too Low" });
    }
  }

  // Organic Response Rate
  if (kpiJsonData["Responses"] < 0.1 * kpiJsonData["Contacted Leads"]) {
    constraints.push({ rank: 7, description: "Organic Response Rate Is Too Low" });
  }

  // Organic Set Rate
  if (kpiJsonData["Appts Set"] < 0.3 * kpiJsonData["Responses"]) {
    constraints.push({ rank: 8, description: "Organic Set Rate Is Too Low" });
  }

  // CPM's
  if (kpiJsonData["CPM"] > 100) {
    constraints.push({ rank: 10, description: "CPM's Are Too High" });
  }

  // CTR
  if (kpiJsonData["CTR"] < 1.5) {
    constraints.push({ rank: 11, description: "CTR Is Too Low" });
  }

  // Opt-In Rate
  if (kpiJsonData["Opt-in Rate"] < 10) {
    constraints.push({ rank: 12, description: "Opt-In Rate Is Too Low" });
  }

  // Setter Output
  if (kpiJsonData["Dials"] < 2 * kpiJsonData["Leads"]) {
    constraints.push({ rank: 1, description: "Setter Output Is Too Low" });
  }

  // Pickup-To-Set Rate
  if (kpiJsonData["Sets"] < 0.1 * kpiJsonData["Pickups"]) {
    constraints.push({ rank: 3, description: "Pickup-To-Set Rate Is Too Low" });
  }

  // DQ Rate
  if (kpiJsonData["DQ's"] > 0.3 * kpiJsonData["Pickups"]) {
    constraints.push({ rank: 6, description: "DQ Rate Is Too High" });
  }

  // Show Rate
  if (kpiJsonData["Shows"] < 0.7 * kpiJsonData["Sets"]) {
    constraints.push({ rank: 4, description: "Show Rate Is Too Low" });
  }

  // Close Rate
  if (kpiJsonData["Closes"] < 0.25 * kpiJsonData["Shows"]) {
    constraints.push({ rank: 5, description: "Close Rate Is Too Low" });
  }

  // PiF Rate
  if (kpiJsonData["PIF's"] < 0.3 * kpiJsonData["Closes"]) {
    constraints.push({ rank: 13, description: "PiF Rate Is Too Low" });
  }

  // Collection Rate
  if (kpiJsonData["PIF's"] + kpiJsonData["Pay Plans"] < 0.75 * kpiJsonData["Closes"]) {
    constraints.push({ rank: 14, description: "Collection Rate Is Too Low" });
  }

  // Return On Ad Spend
  if (kpiJsonData["Cash"] < kpiJsonData["Ad Spend"]) {
    constraints.push({ rank: 15, description: "Return On Ad Spend Is Too Low" });
  }

  // Cost Per Lead
  if (kpiJsonData["Ad Spend"] / kpiJsonData["Leads"] > 30) {
    constraints.push({ rank: 9, description: "Cost Per Lead Is Too High" });
  }

  // Sort the constraints array by rank
  constraints.sort((a, b) => a.rank - b.rank);

  // Prepare the output
  let output = {
    high_constraint: constraints[0].description,
    other_constraints: constraints.slice(1).map((constraint) => constraint.description),
  };

  return output;
}
