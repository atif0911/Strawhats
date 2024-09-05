import os
import requests
from dotenv import load_dotenv
city = input("Enter the city: ")
load_dotenv()
api_key=os.getenv('API_KEY')
url = f"https://api.weatherstack.com/current?access_key={api_key}"
querystring = {"query":city}
response = requests.get(url, params=querystring)
data =response.json()
weather_description = data['current']['weather_descriptions']
temperature = data['current']['temperature']
wind_speed = data['current']['wind_speed']
rain = data['current']['precip']  # Rain in the last 1 hour (if available)
    

if temperature > 35:
    print(f'ALERT: Excessive Heat in {city}. Current temperature: {temperature}°C.')
    
if 'Storm' < 'weather_description' or 'Thunder' < 'weather_description':
    print(f'ALERT: Thunderstorm in {city}. Weather: {weather_description}.')
    
if wind_speed > 20:  # Example threshold for high winds
    print(f'ALERT: High winds in {city}. Current wind speed: {wind_speed} m/s.')
    
if rain > 0.30:  # Example threshold for heavy rain (10 mm in the last hour)
    print(f'ALERT: Heavy rain in {city}! Rainfall in the last hour: {rain} mm.')
