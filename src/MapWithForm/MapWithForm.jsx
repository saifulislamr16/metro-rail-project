import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapWithForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [directions, setDirections] = useState(null);
  const apiKey = 'AIzaSyCWMPjB14EMyIGLnt5JgXJEO6B7phaDTfc'; // Replace with your Google Maps API key

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform necessary logic to get the directions
    calculateDirections();
  };

  const calculateDirections = () => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          setDirections(response);
        } else {
          console.error('Directions request failed:', status);
        }
      }
    );
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="origin">Origin:</label>
          <input
            type="text"
            id="origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Enter origin"
          />
        </div>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination"
          />
        </div>
        <button type="submit">Get Directions</button>
      </form>

      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={{ height: '800px', width: '100%' }}
          center={{ lat: 23.827960749304314, lng:  90.36445188667143 }} // Default map center
          zoom={15} // Default zoom level
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapWithForm;