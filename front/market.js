document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector('.search-bar button');
    searchButton.addEventListener('click', async function() {
        const city = document.querySelector('#city').value.trim();
        const product = document.querySelector('#product').value.trim();

        if (city && product) {
            try {
                // Geocode city to get coordinates
                const geocodeResponse = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json&addressdetails=1`);
                if (!geocodeResponse.ok) throw new Error('Failed to fetch city coordinates.');

                const geocodeData = await geocodeResponse.json();
                console.log('Geocode Data:', geocodeData); // Log geocode data for debugging

                if (geocodeData.length === 0) {
                    alert('City not found. Please try again.');
                    return;
                }

                // Check if the data contains valid latitude and longitude
                const cityCoordinates = {
                    latitude: parseFloat(geocodeData[0].lat),
                    longitude: parseFloat(geocodeData[0].lon)
                };

                if (isNaN(cityCoordinates.latitude) || isNaN(cityCoordinates.longitude)) {
                    alert('Invalid latitude or longitude. Please try a different city.');
                    return;
                }

                console.log('City Coordinates:', cityCoordinates); // Log coordinates for debugging

                // Fetch local stores from Overpass API
                const storeResponse = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];node[shop~"${product}"](around:10000,${cityCoordinates.latitude},${cityCoordinates.longitude});out qt;`);
                if (!storeResponse.ok) throw new Error('Failed to fetch local stores.');

                const storeData = await storeResponse.json();
                console.log('Store Data:', storeData); // Log store data for debugging

                // Clear existing stores
                const storeList = document.querySelector('#store-list');
                storeList.innerHTML = '';

                if (storeData.elements.length === 0) {
                    storeList.innerHTML = '<li>No local stores found for this product.</li>';
                } else {
                    // Add new stores to the list
                    storeData.elements.forEach(store => {
                        const storeName = store.tags.name || 'Unnamed store';
                        const storeAddress = store.tags.addr_street || store.tags.addr_housenumber || store.tags.addr_city || 'No address available';

                        const listItem = document.createElement('li');
                        listItem.textContent = `${storeName} - ${storeAddress}`;
                        storeList.appendChild(listItem);
                    });
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                alert(`There was an error fetching the data: ${error.message}`);
            }
        } else {
            alert('Please enter both city and product.');
        }
    });
});
