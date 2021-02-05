import React, { useState } from 'react';
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
  // const IST_LATITUDE = 
  const UTC_LONGITUDE = 0
  const TIME_PER_LONGITUDE = 4

  const handleChange = (address: string) => {
    setAddress(address)
  };

  const handleSelect = (address: string) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng)
        let currentDate = new Date();
        let local_tz = ((UTC_LONGITUDE - latLng.lng) * TIME_PER_LONGITUDE)

        const current_intl_tz = currentDate.getTimezoneOffset()
        // diff = current_tz_offset - (time zone of the selected place)
        const diff_in_offset = current_intl_tz - local_tz;
        let local_time = new Date(currentDate.getTime() + (diff_in_offset * 60 * 1000))
        console.log(local_time)
        setLocalLocaTtime(local_time.toString())
        console.log(diff_in_offset)
      })
      .catch(error => console.error('Error', error));
  };

  return (
    <div className="App">
      <div className="screen">
        {/* <input /> */}
        <PlacesAutocomplete
          value={address}
          onChange={handleChange}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) =>
            <div>
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
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            // console.log(suggestions)
          }
        </PlacesAutocomplete>
        <p>{localLocalTime}</p>
      </div>
    </div>
  );
}

export default App;
