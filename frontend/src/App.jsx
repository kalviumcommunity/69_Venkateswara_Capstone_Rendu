import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import BikeList from './pages/BikeList';

const Navbar = ({ isNightMode, toggleMode }) => {
  return (
    <nav className={`p-4 flex justify-between items-center ${
      isNightMode ? 'bg-black text-white' : 'bg-white text-black'
    }`}>
      <Link to="/" className="ml-2 text-xl text-[#00FF26] font-bold">RENDU</Link>
      <div className='mr-3 flex items-center'>
        <button
          onClick={toggleMode}
          className={`mr-4 px-3 py-1 rounded ${
            isNightMode 
              ? 'bg-[#00FF26] text-white hover:bg-white hover:text-black' 
              : 'bg-gray-800 text-white hover:bg-black hover:text-[#00FF26]'
          }`}
        >
          {isNightMode ? 'Day' : 'Night'}
        </button>
        <Link to="/register" className="hover:underline">SignUp</Link>
      </div>
    </nav>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [isNightMode, setIsNightMode] = useState(true);

  const toggleMode = () => {
    setIsNightMode(!isNightMode);
  };

  return (
    <Router>
      <div className={`w-screen min-h-screen ${
        isNightMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}>
        <Navbar 
          isNightMode={isNightMode} 
          toggleMode={toggleMode} 
        />
        <Routes>
          <Route path="/register" element={<Register setUser={setUser} isNightMode={isNightMode} />} />
        </Routes>
        <Routes>
          <Route path= "/bike-list" element={<BikeList setUser={setUser} isNightMode={isNightMode}/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
