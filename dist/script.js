document.addEventListener("DOMContentLoaded", function () {
    // Labels for graphs
    const labels = Array.from({ length: 12 }, (_, i) => `Hour ${i + 1}`);
    
    // Data for different crops
    const cropData = {
        rice: {
            nitrogen: Array(12).fill().map(() => Math.random() * 100),
            phosphorus: Array(12).fill().map(() => Math.random() * 50),
            potassium: Array(12).fill().map(() => Math.random() * 60),
            water: Array(12).fill().map(() => Math.random() * 200),
            temperature: Array(12).fill().map(() => Math.random() * 10 + 20),
            humidity: Array(12).fill().map(() => Math.random() * 20 + 60),
        },
        wheat: {
            nitrogen: Array(12).fill().map(() => Math.random() * 90),
            phosphorus: Array(12).fill().map(() => Math.random() * 40),
            potassium: Array(12).fill().map(() => Math.random() * 50),
            water: Array(12).fill().map(() => Math.random() * 180),
            temperature: Array(12).fill().map(() => Math.random() * 10 + 15),
            humidity: Array(12).fill().map(() => Math.random() * 20 + 50),
        },
        maize: {
            nitrogen: Array(12).fill().map(() => Math.random() * 120),
            phosphorus: Array(12).fill().map(() => Math.random() * 60),
            potassium: Array(12).fill().map(() => Math.random() * 70),
            water: Array(12).fill().map(() => Math.random() * 220),
            temperature: Array(12).fill().map(() => Math.random() * 10 + 25),
            humidity: Array(12).fill().map(() => Math.random() * 20 + 65),
        },
    };

    // Chart.js contexts
    const ctxNPK = document.getElementById("npkGraph").getContext("2d");
    const ctxWater = document.getElementById("waterGraph").getContext("2d");
    const ctxTemp = document.getElementById("temperatureGraph").getContext("2d");
    const ctxHumidity = document.getElementById("humidityGraph").getContext("2d");

    // Initial Charts
    const npkChart = new Chart(ctxNPK, {
        type: "line",
        data: {
            labels,
            datasets: [
                { label: "Nitrogen", data: cropData.rice.nitrogen, borderColor: "rgba(75, 192, 192, 1)", fill: false },
                { label: "Phosphorus", data: cropData.rice.phosphorus, borderColor: "rgba(153, 102, 255, 1)", fill: false },
                { label: "Potassium", data: cropData.rice.potassium, borderColor: "rgba(255, 159, 64, 1)", fill: false },
            ],
        },
    });

    const waterChart = new Chart(ctxWater, {
        type: "line",
        data: {
            labels,
            datasets: [{ label: "Water Requirement (mm)", data: cropData.rice.water, borderColor: "rgba(54, 162, 235, 1)", fill: false }],
        },
    });

    const tempChart = new Chart(ctxTemp, {
        type: "line",
        data: {
            labels,
            datasets: [{ label: "Temperature (°C)", data: cropData.rice.temperature, borderColor: "rgba(255, 99, 132, 1)", fill: false }],
        },
    });

    const humidityChart = new Chart(ctxHumidity, {
        type: "line",
        data: {
            labels,
            datasets: [{ label: "Humidity (%)", data: cropData.rice.humidity, borderColor: "rgba(75, 192, 192, 1)", fill: false }],
        },
    });

    // Crop Suggestions
    const suggestions = {
        rice: ["Increase nitrogen levels by 10%", "Ensure moisture is above 80%"],
        wheat: ["Reduce phosphorus by 5%", "Maintain pH at 6.5"],
        maize: ["Increase potassium by 8%", "Irrigation needed for optimal growth"],
    };

    function updateSuggestions(crop) {
        const suggestionList = document.getElementById("suggestionList");
        suggestionList.innerHTML = "";
        suggestions[crop].forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            suggestionList.appendChild(li);
        });
    }

    function updateGraph(crop) {
        // Update NPK chart
        npkChart.data.datasets[0].data = cropData[crop].nitrogen;
        npkChart.data.datasets[1].data = cropData[crop].phosphorus;
        npkChart.data.datasets[2].data = cropData[crop].potassium;
        npkChart.update();

        // Update Water Requirement chart
        waterChart.data.datasets[0].data = cropData[crop].water;
        waterChart.update();

        // Update Temperature chart
        tempChart.data.datasets[0].data = cropData[crop].temperature;
        tempChart.update();

        // Update Humidity chart
        humidityChart.data.datasets[0].data = cropData[crop].humidity;
        humidityChart.update();
    }

    // Dropdown logic for crop selection
    const cropSelect = document.getElementById("cropSelect");
    cropSelect.addEventListener("change", function () {
        const selectedCrop = this.value;
        updateGraph(selectedCrop);
        updateSuggestions(selectedCrop);
    });

    // Initial Load
    updateGraph("rice");
    updateSuggestions("rice");

    // Tab Switching Logic
    const tabs = document.querySelectorAll(".tab");
    const sections = document.querySelectorAll(".section");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
            document.getElementById(this.dataset.target).classList.add("active");
        });
    });
});
