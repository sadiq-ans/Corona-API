document.getElementById("covid-btn").addEventListener("click", getCovidData);

const covidResults = document.getElementById("covid-results");
const apiUrl = "https://api.rootnet.in/covid19-in/stats/latest";

let covidStatesData = [];

function resetCovidData() {
  covidResults.innerHTML = `
    <p id="covid-placeholder" class="text-muted">
      Enter a state to see COVID-19 stats.
    </p>
  `;
  document.getElementById("covid-input").value = "";
}

async function fetchCovidData() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.data?.regional) {
      covidStatesData = data.data.regional;
    } else {
      throw new Error("Invalid API response");
    }
  } catch (error) {
    alert("Failed to load COVID data!");
    console.error(error);
  }
}

function renderStateData(state) {
  covidResults.innerHTML = `
    <div class="card covid-card shadow-sm">
      <div class="card-body text-center">
        <h3 class="card-title mb-4">${state.loc}</h3>

        <div class="row g-3">
          <div class="col-12 col-md-4">
            <div class="covid-stat total bg-warning bg-opacity-25">
              <i class="bx bx-virus text-warning"/></i>
              <p class="pb-1">Total</p>
              <strong class="fs-5">${state.totalConfirmed.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="covid-stat recovered bg-success bg-opacity-25">
              <i class="bx bx-heart-plus text-success"/></i>
              <p class="pb-1">Recovered</p>
              <strong class="fs-5">${state.discharged.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <div class="covid-stat deaths bg-danger bg-opacity-25">
              <i class="bx bx-skull text-danger"/></i>
              <p class="pb-1">Deaths</p>
              <strong class="fs-5">${state.deaths.toLocaleString("en-IN")}</strong>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

function getCovidData() {
  const input = document.getElementById("covid-input").value.trim();

  if (!input) {
    alert("Please enter a state name!");
    resetCovidData();
    return;
  }

  const state = covidStatesData.find(
    s => s.loc.toLowerCase() === input.toLowerCase()
  );

  if (!state) {
    alert("State not found!");
    resetCovidData();
    return;
  }

  renderStateData(state);
}

window.addEventListener("DOMContentLoaded", fetchCovidData);