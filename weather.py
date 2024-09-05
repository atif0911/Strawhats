import os
import requests
from dotenv import load_dotenv
from geopy.geocoders import ArcGIS
from geopy.geocoders import Nominatim
# getting the lat and lon using geopy 
city = input("Enter the city")
geo=Nominatim(user_agent='city_geocoder')
location=geo.geocode(city)
lat=location.latitude
lon=location.longitude
print(f"Latitude: {lat}, LOngitude: {lon}")

load_dotenv()
api_key=os.getenv('OPENWEATHERMAP_API_KEY')

# Replace with your OpenWeatherMap API key
#Replace with the city for which you want to check the weather
url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}"
response = requests.get(url)
data = response.json()
print("The weather is " ,data['weather'][0]['description'])
print("The temperature is ",data['main']['temp'])
print("The temperature is ",data['main']['feels_like'])
print("The wind speed is ",data['wind']['speed'])
print("The humidity is",data['main']['humidity'])


