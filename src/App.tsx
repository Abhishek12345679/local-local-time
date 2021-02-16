//TODO: add geolocation 
//TODO: option to download background
//TODO: option to choose 24/12 hr format

import React, { useEffect, useState } from 'react';
import './App.css';

import PlacesAutocomplete, {
  geocodeByAddress,

  getLatLng,
} from 'react-places-autocomplete';
import { timezonedata } from './timezonedata';

var moment = require('moment-timezone');

const App: React.FC = () => {

  //unsplash API
  const [downloadLink, setDownloadLink] = useState('')


  const [address, setAddress] = useState('')
  const [destination, setDestination] = useState('')
  const [localLocalTime, setLocalLocalTime] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [photographer, setPhotographer] = useState({ username: "", profile_image: "" })
  const [currentTZ, setCurrentTZ] = useState({
    "value": "",
    "abbr": "",
    "offset": 0,
    "isdst": false,
    "text": "",
    "utc": [""]
  })


  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  //time
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")
  const [seconds, setSeconds] = useState("0")

  //current time

  const [currentHours, setCurrentHours] = useState("0")
  const [currentMinutes, setCurrentMinutes] = useState("0")
  const [currentSeconds, setCurrentSeconds] = useState("0")

  let [timer, setTimer] = useState<any>(null)
  let [currentTimer, setCurrentTimer] = useState<any>(null)


  const UTC_LONGITUDE = 0
  const TIME_PER_LONGITUDE = 4
  const ACCESS_KEY = 'h7eF21T9CT7IP5joCADCvTOxpCL76CDsoDgtBwIkYKg'

  const currentLocationTimer = () => {
    getCurrentTZData()
    let currentDate = new Date();
    // console.log(currentDate)

    const hour = updateTime(currentDate.getHours())
    const minutes = updateTime(currentDate.getMinutes())
    const seconds = updateTime(currentDate.getSeconds())

    setCurrentHours(hour)
    setCurrentMinutes(minutes)
    setCurrentSeconds(seconds)

    // console.log(`${hour}:${minutes}:${seconds}`)

    setCurrentTimer(setTimeout(() => {
      currentLocationTimer()
    }, 1000))
  }

  const getCurrentTZData = () => {
    const area = moment.tz.guess(true)
    timezonedata.map((tz, index) => {
      tz.utc.forEach((utc, index) => {
        if (utc === area) {
          // console.log("succesful", tz)
          setCurrentTZ(tz)
        }
      })
    })
  }

  /**
   * 
   * @param uri: download_location
   * 
   * helps unsplash API to keep count of the downloads of the images of the author 
   */
  const sendDownloadRequest = async (uri: string) => {
    await fetch(uri)
  }



  useEffect(() => {
    /**
     * getRandomBrackgroundImage fetches random images and its metadata from unsplash.com
     */
    const getRandomBackgroundImage = async () => {
      const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&Accept-Version=v1&content_filter=low`)
      const resData = await response.json()
      console.log(resData)
      setBackgroundImage(resData.urls.regular)
      setPhotographer({ username: resData.user.username, profile_image: resData.user.profile_image.small })
      sendDownloadRequest(`${resData.links.download_location}?client_id=${ACCESS_KEY}`)
      setDownloadLink(`${resData.links.download}?force=true`)
    }
    getRandomBackgroundImage()
    currentLocationTimer()
    setIsLoaded(true)
    return () => {
      clearTimeout(currentTimer);
      currentTimer = null
    }
  },
    [])



  const handleChange = (address: string) => {
    setAddress(address)
  };

  const handleSelect = (address: string) => {
    setDestination(address)
    if (timer !== null) {
      // console.log(timer)
      clearTimeout(timer)
      timer = null
    }
    // console.log(timer)
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

    setTimer(setTimeout(() => {
      currentTime(Longitude)
    }, 1000))
  }

  if (!isLoaded) {
    return (
      <div>loading...</div>
    )
  }


  return (
    <div className="App" style={{
      backgroundImage: `url(${backgroundImage})`, backgroundRepeat: 'no-repeat',

    }}>
      {/* <h1 className="text">Local Local Time ⌚️</h1> */}
      <nav className='navbar'>
        <div className='title'>Local Local Time</div>
        <div className='title-short'>LLT</div>
        <ul>
          <li> <a href="#"> About</a></li>
          <li> <a href="#">Support</a></li>
          <li> <a href="#"> Contact us</a></li>
        </ul>
      </nav>
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
                      style
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
        <p className="locallocaltimestring">local local time @ {destination}</p>
        <h2 className="timer">{hours}:{minutes}:{seconds}</h2>
      </div>}
      <div className="datetimecontainer">
        {currentTZ && <h3>current time:{currentTZ['text']}</h3>}
        <h1>{currentHours}:{currentMinutes}:{currentSeconds}</h1>
      </div>
      <div className="footer">
        <img src={photographer.profile_image} style={{ borderRadius: 20, marginRight: 10 }} />
        <div>
          <a
            href={`https://unsplash.com/@${photographer.username}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecorationLine: 'none', color: '#ffffff' }}>
            @{photographer.username}
          </a>
          <br />
          <a
            download=""
            href={downloadLink}
            target="_blank"
            rel="nofollow"
            style={{ textDecorationLine: 'none', color: '#ffffff' }}>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
