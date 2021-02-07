//TODO: add geolocation
//TODO: make site more responsible to 

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TextField } from './components/TextField';

import PlacesAutocomplete, {
  geocodeByAddress,
  // geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';


const App: React.FC = () => {

  const [address, setAddress] = useState('')
  const [localLocalTime, setLocalLocalTime] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [photographer, setPhotographer] = useState({ username: "", profile_image: "" })


  //time
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")
  const [seconds, setSeconds] = useState("0")

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
      setPhotographer({ username: resData.user.username, profile_image: resData.user.profile_image.small })
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
        //start clock
        currentTime(latLng.lng)
      })
      .catch(error => console.error('Error', error));
  };

  const updateTime = (k: number) => {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k.toString();
    }
  }

  const currentTime = (Longitude: number) => {

    let currentDate = new Date();

    let local_tz = ((UTC_LONGITUDE - Longitude) * TIME_PER_LONGITUDE)

    const current_intl_tz = currentDate.getTimezoneOffset()
    const diff_in_offset = current_intl_tz - local_tz;          // diff = current_tz_offset - (time zone of the selected place)

    let local_time = new Date(currentDate.getTime() + (diff_in_offset * 60 * 1000))

    setLocalLocalTime(local_time.toString().split(" ").slice(0, 4).join(" "))


    const hour = updateTime(local_time.getHours())
    const minutes = updateTime(local_time.getMinutes())
    const seconds = updateTime(local_time.getSeconds())

    setHours(hour)
    setMinutes(minutes)
    setSeconds(seconds)

    // console.log(`${hour}:${minutes}:${seconds}`)

    setTimeout(() => {
      currentTime(Longitude)
    }, 1000)
  }

  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat',

    }}>
      <h1 className="text">Local Local Time ⌚️</h1>
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
      {hours !== "0" && minutes !== "0" && seconds !== "0" && localLocalTime.length !== 0 && <div className='datetimecontainer'>
        <h2 className="locallocaltimestring">{localLocalTime}</h2>
        <h2 className="timer">{hours}:{minutes}:{seconds}</h2>
      </div>}
      <div className="footer">
        <img src={photographer.profile_image} style={{ borderRadius: 20, marginRight: 10 }} />
        <a href={`https://unsplash.com/@${photographer.username}`} target="_blank" rel="noreferrer">{photographer.username}</a>
      </div>
    </div>
  );
}

export default App;
