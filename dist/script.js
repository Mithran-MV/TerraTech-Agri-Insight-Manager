document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("nav button");
  const sections = document.querySelectorAll(".tab-section");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      sections.forEach(section => section.classList.remove("active"));
      sections[index].classList.add("active");
    });
  });

  // Real-Time Data Graph
  const ctx = document.getElementById('realTimeGraph').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['0s', '5s', '10s', '15s', '20s'],
      datasets: [{
        label: 'Moisture (%)',
        data: [20, 22, 21, 23, 22],
        borderColor: '#0f766e',
        borderWidth: 2,
        fill: false
      }]
    }
  });

  // Save Settings
  document.getElementById("save-settings").addEventListener("click", () => {
    const moisture = document.getElementById("threshold-moisture").value;
    const alertPreference = document.getElementById("alert-preference").value;

    if (moisture && alertPreference) {
      vt.success("Settings saved successfully!");
    } else {
      vt.error("Please fill all the fields!");
    }
  });
});
