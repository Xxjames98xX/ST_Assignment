import { useState, useEffect } from 'react';
import SelectBox from '../Components/SelectBox';

//Can be further improve by adding an actual map to show and select locations
function Weather() {
  const [locations, setLocations] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [forecast, setForecast] = useState(null);

  const API_URL = 'https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast';
  
  //Use effect usually used to fetch data from API
  // It runs after the component mounts
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        const loc_data = data.data.area_metadata;
        const locs = loc_data.map((area, index) => ({
          value: index,
          label: area.name
        }));
        setLocations(locs);
        setWeatherData(data.data.items[0]);
      })
      .catch(error => {
        alert(`Error fetching location data: ${error}`);
      });
  }, []);

  function changeForecastDisplay(value) {
    setSelectedLocation(value);
    getWeatherData(value); // Pass the new value directly
  }

  function getWeatherData(location) {
    const loc = location || selectedLocation;
    if (loc && weatherData.forecasts) {
      const foundForecast = weatherData.forecasts.find(
        item => item.area === loc.label
      );
      setForecast(foundForecast);
      if (foundForecast) {
        console.log(`Loc: ${loc.label} ${foundForecast.forecast}`);
      } else {
        console.log(`No forecast found for ${loc.label}`);
      }
    }
  }

  return (
    <div className="Form">
      <h1>Weather Forecast</h1>
      {/* Only render after api loaded */}
      {weatherData?.valid_period?.text && (
        <p>Forecast from {weatherData.valid_period.text}</p>
      )}

      <SelectBox
        label="Select Location"
        options={locations}
        value={selectedLocation}
        onChange={changeForecastDisplay}
      />

      {/* Show forecast if available */}
      {forecast && (
        <p>
          <small><em>{forecast.area}</em></small>
          <br />
          {forecast.forecast}
        </p>
      )}
    </div>
  );
}

export default Weather;