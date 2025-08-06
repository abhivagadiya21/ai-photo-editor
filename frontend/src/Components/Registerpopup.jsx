import React, { useState } from 'react';
import './Register.css';

export default function LoginModal({ show, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!show) return null;

  const handleRegister = async () => {
    try {
      const response = await fetch('http://192.168.1.25:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Account created successfully!');
        onClose();
      } else {
        alert(data.error || 'Failed to register');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-content">
          <div className="modal-left">
            <img
              src="https://pastatic.picsart.com/cms-pastatic/56e5f8b2-343c-4b3e-93cd-96be7a21ca9c.svg"
              alt="Preview"
              className="modal-img"
            />
          </div>
          <div className="modal-right">
            <h2>Create Your Account</h2>
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
            <button className="register-btn" onClick={handleRegister}>
              Create Account
            </button>
            <p className="terms-text">
              By continuing, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
