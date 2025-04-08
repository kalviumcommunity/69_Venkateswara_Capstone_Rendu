import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser, isNightMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [role, setRole] = useState('renter');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { email, password, role });
      localStorage.setItem('token', res.data.token);
      setUser({ id: res.data.user?.id, email, role });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data.msg || 'Registration failed');
    }
  };

  return (
    <div className={`w-[70%] md:w-[40%] lg:w-[30%] mx-auto mt-10 p-6 rounded-lg shadow-lg 
      ${isNightMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={`border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black placeholder-white border-white' 
              : 'text-black bg-white placeholder-gray-500 border-gray-300'}`}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={`border p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#00FF26] 
            ${isNightMode 
              ? 'text-white bg-black border-white' 
              : 'text-black bg-white border-gray-300'}`}
        >
          <option value="renter">Renter</option>
          <option value="provider">Provider</option>
        </select>
        <button
          type="submit"
          className="bg-[#00FF26] text-white p-2 w-full rounded hover:bg-black hover:text-[#00FF26] transition-colors mb-4"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Register;