// Function to fetch and display result data
async function fetchResults() {
    try {
        const response = await fetch('http://localhost:5000/results'); // Replace with your backend endpoint
        const data = await response.json()
        //Modified
        const diseaseData = {
            "Corn_Common_Rust": {
                "symptoms": "Small reddish-brown pustules on leaves, reduced photosynthesis.",
                "treatmentSteps": ["Apply fungicides such as strobilurins or triazoles.", "Use resistant Corn_varieties.", "Rotate crops to avoid disease buildup."]
            },
            "Corn_Gray_Leaf_Spot": {
                "symptoms": "Gray to tan lesions on leaves, restricted leaf growth, premature death.",
                "treatmentSteps": ["Use fungicides, especially during tasseling.", "Rotate crops with non-host crops like soybeans.", "Plant resistant hybrids."]
            },
            "Corn_Northern_Leaf_Blight": {
                "symptoms": "Cigar-shaped grayish-green lesions on leaves, blighting of leaves, reduced yield.",
                "treatmentSteps": ["Apply fungicides if the disease is detected early.", "Plant resistant hybrids.", "Use crop rotation."]
            },
            "Cotton_Aphids": {
                "symptoms": "Sticky honeydew on leaves, yellowing of leaves, stunted growth.",
                "treatmentSteps": ["Introduce natural predators like ladybugs.", "Use insecticidal soaps or neem oil.", "Avoid excessive use of nitrogen fertilizers."]
            },
            "Cotton_Army_Worm": {
                "symptoms": "Chewed leaves, ragged holes, defoliation.",
                "treatmentSteps": ["Use Bacillus thuringiensis (Bt) products.", "Hand-pick worms off plants.", "Apply insecticides if infestation is severe."]
            },
            "Cotton_Bacterial_Blight": {
                "symptoms": "Water-soaked spots on leaves, darkening and withering of leaves, stunted growth.",
                "treatmentSteps": ["Use resistant cotton varieties.", "Rotate crops to avoid soil-borne bacteria.", "Apply copper-based bactericides."]
            },
            "Cotton_Powdery_Mildew": {
                "symptoms": "White powdery spots on leaves, reduced growth, premature leaf drop.",
                "treatmentSteps": ["Apply sulfur-based fungicides.", "Remove infected plant parts.", "Ensure good air circulation between plants."]
            },
            "Rice_Brown_Spot": {
                "symptoms": "Small brown lesions on leaves and grains, reduced yield, poor grain quality.",
                "treatmentSteps": ["Apply fungicides such as tricyclazole.", "Use resistant rice varieties.", "Improve soil fertility and reduce stress."]
            },
            "Rice_Leaf_Blast": {
                "symptoms": "Spindle-shaped lesions on leaves, collar rot, wilting, reduced yield.",
                "treatmentSteps": ["Use blast-resistant rice varieties.", "Apply systemic fungicides like tricyclazole.", "Keep fields properly irrigated."]
            },
            "Rice_Neck_Blast": {
                "symptoms": "Lesions on necks of panicles, premature panicle death, grain shriveling.",
                "treatmentSteps": ["Apply fungicides at panicle initiation.", "Use resistant rice varieties.", "Maintain good field hygiene and crop rotation."]
            },
            "Sugarcane_Bacterial_Blight": {
                "symptoms": "Water-soaked streaks on leaves, yellowing and wilting of leaves, stunted growth.",
                "treatmentSteps": ["Use resistant Sugarcane_varieties.", "Remove and destroy infected plants.", "Apply copper-based bactericides."]
            },
            "Sugarcane_Red_Rot": {
                "symptoms": "Red discoloration in stalks, wilting of leaves, death of stalks.",
                "treatmentSteps": ["Use disease-free seed material.", "Remove and burn affected plants.", "Ensure good drainage and avoid waterlogging."]
            },
            "Wheat_Brown_Rust": {
                "symptoms": "Brown pustules on leaves and stems, reduced photosynthesis, stunted growth.",
                "treatmentSteps": ["Apply fungicides like azoxystrobin.", "Use resistant Wheat_varieties.", "Rotate crops and avoid excessive irrigation."]
            },
            "Wheat_Yellow_Rust": {
                "symptoms": "Yellow streaks on leaves, reduced leaf growth, wilting, decreased yield.",
                "treatmentSteps": ["Apply fungicides containing triazoles or strobilurins.", "Plant resistant Wheat_varieties.", "Improve soil drainage and avoid overcrowding."]
            },
            "Corn_Healthy": {
            "symptoms": "No visible signs of disease or infection. Green and thriving.",
            "treatmentSteps": ["Maintain regular watering and fertilization.", "Monitor for pests or diseases."]
            },
            "Cotton_Healthy": {
                "symptoms": "No discoloration or damage to leaves or stems. Strong growth.",
                "treatmentSteps": ["Regular monitoring and proper irrigation.", "Ensure balanced nutrient supply."]
            },
            "Rice_Healthy": {
                "symptoms": "Green, lush growth with no signs of disease or pest infestation.",
                "treatmentSteps": ["Keep water levels consistent.", "Monitor for any pest activity or early signs of disease."]
            },
            "Sugarcane_Healthy": {
                "symptoms": "Vibrant green leaves with no signs of rot or blight.",
                "treatmentSteps": ["Ensure regular irrigation.", "Keep fields free of weeds and monitor for pests."]
            },
            "Wheat_Healthy": {
                "symptoms": "Uniform green growth with no signs of rust or blight.",
                "treatmentSteps": ["Provide adequate water and nutrients.", "Monitor for any unusual symptoms or pest activity."]
            }
        };

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

        //Modified 
        const cropRotationTips = {
            "Corn": {
                "rotation_tip": "Rotate with legumes like soybeans or peas to improve soil nitrogen content and reduce soil-borne diseases."
            },
            "Cotton": {
                "rotation_tip": "Rotate with cereals like wheat or corn to help break pest cycles and improve soil structure."
            },
            "Rice": {
                "rotation_tip": "Alternate with legumes like mung beans or soybeans to replenish soil nutrients and reduce disease pressure."
            },
            "Sugarcane": {
                "rotation_tip": "Consider rotating with legumes or cereals like maize to break pest and disease cycles and restore soil fertility."
            },
            "Wheat": {
                "rotation_tip": "Rotate with broadleaf crops such as canola or legumes to reduce the buildup of soil-borne pathogens and weeds."
            }
        };
        
        const diseaseName = "Corn_Common_Rust";
        const cropName = diseaseName.split('_')[0];
        
        // Accessing crop rotation tip based on the crop name
        if (cropRotationTips[cropName]) {
            console.log(cropRotationTips[cropName].rotation_tip);
        } else {
            console.log("No rotation tip available for this crop.");
        }        
        //Modified
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
