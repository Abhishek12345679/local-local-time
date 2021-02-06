import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField } from './components/TextField';

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


const App: React.FC = () => {

  const [address, setAddress] = useState('')
  const [localLocalTime, setLocalLocaTtime] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')


  //time
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  // const IST_LATITUDE = 
  const UTC_LONGITUDE = 0
  const TIME_PER_LONGITUDE = 4
  const ACCESS_KEY = 'h7eF21T9CT7IP5joCADCvTOxpCL76CDsoDgtBwIkYKg'

  useEffect(() => {

    const getRandomBackgroundImage = async () => {
      const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&Accept-Version=v1&content_filter=low`)
      const resData = await response.json()
      console.log(resData)
      setBackgroundImage(resData.urls.full)
    }
    getRandomBackgroundImage()
  },
    [])

  const handleChange = (address: string) => {
    setAddress(address)
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        // console.log('Success', latLng)
        let currentDate = new Date();

        let local_tz = ((UTC_LONGITUDE - latLng.lng) * TIME_PER_LONGITUDE)

        const current_intl_tz = currentDate.getTimezoneOffset()
        const diff_in_offset = current_intl_tz - local_tz;          // diff = current_tz_offset - (time zone of the selected place)

        let local_time = new Date(currentDate.getTime() + (diff_in_offset * 60 * 1000))

        //start clock
        currentTime(local_time)


        let localtime_arr = local_time.toString().split(" ").splice(0, 5).join(" ")
        setLocalLocaTtime(localtime_arr)
      })
      .catch(error => console.error('Error', error));
  };

  const currentTime = (time: Date) => {
    const hour = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    setHours(hour)
    setMinutes(minutes)
    setSeconds(seconds)

    console.log(`${hour}:${minutes}:${seconds}`)

    setTimeout(() => {
      currentTime(time +)
    }, 1000)
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat',

    }}>
      <div className="screen">
        <h1>Local Local Time ⏰</h1>
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
            <div className="container">
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#ccc', cursor: 'pointer', padding: 10 }
                    : { backgroundColor: '#fff', cursor: 'pointer', padding: 10 };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description.slice()}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            // console.log(suggestions)
          }
        </PlacesAutocomplete>
        <h2 className="locallocaltimestring">{localLocalTime}</h2>
        <h2 className="locallocaltimestring">{hours}:{minutes}:{seconds}</h2>
      </div>
    </div>
  );
}

export default App;
