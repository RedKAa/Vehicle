import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import logo from '@/assets/logo.png';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import mapStyles from './mapStyle';
import LocationInput from '../LocationInput';

const libraries = ['places'];
const mapContainerStyle = {
  height: '300px',
  width: '60vh',
};
const options = {
  // styles: mapStyles,
  styles: [
    {
      featureType: 'poi.business',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.medical',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi.park',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit.station.bus',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
  ],
  disableDefaultUI: true,
  zoomControl: true,
  fullscreenControl: true,
};
const DEFAULT_CENTER = {
  lat: 10.8455241,
  lng: 106.7938257,
};

const MyMap = ({
  onSelectAddress = () => null,
  onMapClick = () => null,
  showSearch = true,
  onChange: onFormChange,
  value: formValues,
  children,
  center = DEFAULT_CENTER,
  ...others
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCme39Qpilr_NIsHPzxthtOulUSMx-54_Q',
    libraries,
  });

  const mapClickHandler = React.useCallback(
    async (geoCode) => {
      onMapClick({ lat: geoCode.latLng.lat(), lng: geoCode.latLng.lng() });
    },
    [onMapClick],
  );

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const handleSelectAddress = React.useCallback(
    async (address) => {
      const { lat, lng } = await getLatLng(address);
      onSelectAddress({ lat, lng, address: address.formatted_address });
      if (onFormChange) {
        onFormChange(address);
      }
    },
    [onFormChange],
  );

  if (loadError) return 'Error';
  if (!isLoaded) return 'Loading...';

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={16}
      center={center && center.lat && center.lng ? center : DEFAULT_CENTER}
      options={options}
      onClick={mapClickHandler}
      onLoad={onMapLoad}
      {...others}
    >
      {showSearch && <LocationInput onSelect={handleSelectAddress} panTo={panTo} />}
      {children}
    </GoogleMap>
  );
};

const MyMarker = ({ marker = {}, ...props }) => {
  return (
    <Marker
      key={`${marker.lat}-${marker.lng}`}
      position={{ lat: marker.lat, lng: marker.lng }}
      icon={{
        url: logo,
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
        scaledSize: new window.google.maps.Size(30, 30),
      }}
      {...props}
    />
  );
};

MyMap.MyMarker = MyMarker;
export { MyMarker };

export default MyMap;
