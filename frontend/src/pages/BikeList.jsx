import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const BikeList = ({ isNightMode }) => {
  const [bikes, setBikes] = useState([]);
  const [location, setLocation] = useState('');
  const [newBike, setNewBike] = useState({ model: '', price: '', location: '', lat: '', lng: '' });

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/api/bike/search?location=${location}`);
    setBikes(res.data);
  };

  const handleListBike = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/bike/list', newBike, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewBike({ model: '', price: '', location: '', lat: '', lng: '' });
    handleSearch();
  };

  const handleBook = async (bikeId) => {
    const token = localStorage.getItem('token');
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);
    const amount = bikes.find(b => b._id === bikeId).price;
    await axios.post('http://localhost:5000/api/booking/book', { bikeId, startDate, endDate, amount }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Booking requested');
    handleSearch();
  };

  return (
    <div className={`max-w-6xl mx-auto mt-10 p-6 rounded-lg shadow-lg 
      ${isNightMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-bold mb-4">Available Bikes</h2>
      
      {/* Search Bar */}
      <div className="flex mb-6">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Search by location"
          className={`border p-2 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <button
          onClick={handleSearch}
          className="bg-[#00FF26] text-white p-2 rounded-r hover:bg-black hover:text-[#00FF26] transition-colors"
        >
          Search
        </button>
      </div>

      

      {/* Google Map */}

 <LoadScript googleMapsApiKey="<your-google-maps-api-key>"> {/* Replace with your key */}
        <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          zoom={10}
          center={bikes[0] ? { lat: bikes[0].lat, lng: bikes[0].lng } : { lat: 37.7749, lng: -122.4194 }}
        >
          {bikes.map(bike => (
            <Marker key={bike._id} position={{ lat: bike.lat, lng: bike.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>


      

      {/* Bike Listings */}
      

      {/* List Bike Section */}
      <h3 className="text-lg font-semibold mt-6 mb-2">List a Bike</h3>
      <form onSubmit={handleListBike} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={newBike.model}
          onChange={(e) => setNewBike({ ...newBike, model: e.target.value })}
          placeholder="Model"
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="number"
          value={newBike.price}
          onChange={(e) => setNewBike({ ...newBike, price: e.target.value })}
          placeholder="Price per day"
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="text"
          value={newBike.location}
          onChange={(e) => setNewBike({ ...newBike, location: e.target.value })}
          placeholder="Location"
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="number"
          value={newBike.lat}
          onChange={(e) => setNewBike({ ...newBike, lat: e.target.value })}
          placeholder="Latitude"
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="number"
          value={newBike.lng}
          onChange={(e) => setNewBike({ ...newBike, lng: e.target.value })}
          placeholder="Longitude"
          className={`border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <button
          type="submit"
          className="bg-[#00FF26] text-white p-2 rounded hover:bg-black hover:text-[#00FF26] transition-colors col-span-full"
        >
          List Bike
        </button>
      </form>
    </div>
  );
};

export default BikeList;