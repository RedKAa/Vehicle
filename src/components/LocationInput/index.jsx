import { AutoComplete, Input } from 'antd';
import React from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import './style.css';

const LocationInput = ({ onSelect = () => null, panTo, locationClassName }) => {
  const {
    ready,
    value: address,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (value) => {
    setValue(value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      onSelect(results[0]);
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log('😱 Error: ', error);
    }
  };

  return (
    <div className={locationClassName ?? 'search'}>
      <AutoComplete
        options={
          status === 'OK' &&
          data.map(({ id, description }) => ({
            value: description,
          }))
        }
        onSelect={handleSelect}
        onChange={handleInput}
        disabled={!ready}
      >
        <Input.Search style={{ width: 300 }} allowClear placeholder="Enter address" />
      </AutoComplete>
    </div>
  );
};

export default LocationInput;
