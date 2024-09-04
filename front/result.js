// Function to fetch and display result data
async function fetchResults() {
    try {
        const response = await fetch('http://localhost:5000/results'); // Replace with your backend endpoint
        const data = await response.json();

        document.getElementById('disease-name').textContent = data.result;
        document.getElementById('health-status').textContent = data.status;
        document.getElementById('confidence-score').textContent = data.confidenceScore;

        // Populate disease details
        document.getElementById('disease-name-detail').textContent = data.diseaseName;
        document.getElementById('symptoms').textContent = data.symptoms.join(', ');
        const stepsList = document.getElementById('treatment-steps');
        data.treatmentSteps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
        });

        // Populate weather impact
        document.getElementById('current-weather').textContent = data.weather.current;
        const forecastList = document.getElementById('forecast');
        data.weather.forecast.forEach(day => {
            const li = document.createElement('li');
            li.textContent = day;
            forecastList.appendChild(li);
        });
        document.getElementById('weather-advice').textContent = data.weather.advice;

        // Populate preventive tips and crop rotation
        const tipsList = document.getElementById('preventive-tips-list');
        data.preventiveTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
        document.getElementById('crop-rotation').textContent = data.cropRotation;

        // Populate related products
        const productsList = document.getElementById('products-list');
        data.products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `${product.name} <a href="${product.link}">Buy Now</a>`;
            productsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching results:', error);
    }
}

// Run the fetchResults function when the page loads
document.addEventListener('DOMContentLoaded', fetchResults);
