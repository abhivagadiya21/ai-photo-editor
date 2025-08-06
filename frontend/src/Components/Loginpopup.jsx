import React, { useState } from 'react';
import './Loginpopup.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Loginpopup({ show, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!show) return null;

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.1.25:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Login failed');
        return;
      }

      // ✅ Save token in localStorage
      localStorage.setItem('token', data.token);

      // ✅ Pass the token back to parent to decode and set user info
      onLoginSuccess(data.token);

      toast.success('Logged in successfully');
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="lmodal-overlay">
      <div className="lmodal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="lmodal-inner">
          <div className="lmodal-left">
            <h2>Log in</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter your email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="register-btn" onClick={handleLogin}>Log in</button>
            <p className="terms-text">
              By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
          <div className="lmodal-right">
            <img
              src="https://pastatic.picsart.com/cms-pastatic/ef725277-96b5-4308-acf3-1c6f14426447.jpg?type=webp&to=min&r=600"
              alt="Preview"
              className="modal-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
