import './Photo-to-AI-Art.css';
import ImageStyleGenerator from './ImageStyleGenerator';
import ArtStylesSection from './ArtStylesSection';
import HowToGenerate from './HowToGenerate';
import WhyArtguru from './WhyArtguru';
import Accordion23 from './Accordion23';
import AIMagicTools from './AIMagicTools';
import Footer2 from '../AIImageGenerator/footer2';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import credit from '../../c.svg';
import profile from '../../profile.svg'
import Register from '../Registerpopup';
import Login from '../Loginpopup';


export default function PhotoToAIArt() {
  const [userCredit, setUserCredit] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);

  const fetchUserCredit = async (token) => {
    try {
      const response = await fetch('http://192.168.1.25:5000/api/credit', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch credit');
      }

      setUserCredit(data.credit);
      setUserEmail(data.email)
    } catch (err) {
      console.error("Failed to fetch credit:", err);
      setUserCredit(null);
      toast.error('Failed to fetch user credit.');
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light b1">
        <div className='icon-menu'>
          <div className='Picsart-logo-container'>
            <img src="https://static.artguru.ai/_next/static/media/logo_artguru_color.4cbab2c6.png" alt="logo" className="Picsart-logo artguru-logo" />
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon  "></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <div className="Remove-Background-router toggler-icon2" onClick={() => navigate('/')}>
                <p>Remove Background</p>
              </div>
            </li>
            <li class="nav-item">
              <div className="AI-Photo-Enhancer-router toggler-icon2" onClick={() => navigate('/PhotoEnhancer')}>
                <p>AI Photo Enhancer</p>
              </div>
            </li>
            <li class="nav-item">
              <div className="AI-Photo-Enhancer-router toggler-icon2" onClick={() => navigate('/AIImageGenerator')}>
                <p>AI Image Generator</p>
              </div>
            </li>
            <li class="nav-item">
              <div className="AI-Photo-Enhancer-router toggler-icon2" onClick={() => navigate('/PhototoAIArt')}>
                <p>PhototoAIArt</p>
              </div>
            </li>

          </ul>
          <div className='bn'>
            <div className="buttons">
              {userEmail ? (
                <div className="user-info">
                  <div className="user-credit-container Photo-Enhancer-background-color">
                    <span>
                      <img src={credit} />
                    </span>
                    <span className="credit-amount">{userCredit}</span>
                  </div>
                  <button
                    className="user-profile-button Photo-Enhancer-background-color"
                    onClick={() => navigate('/profile')}
                  >
                    <img src={profile} alt="user profile" className="user-profile-icon" />
                  </button>

                </div>
              ) : (
                <>
                  <button className="register-button" onClick={() => setIsLoginPopupOpen(true)}>Login</button>
                  <button className="register-button" onClick={() => setIsPopupOpen(true)}>Register</button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='nc'>
          <div className="buttons">
            {userEmail ? (
              <div className="user-info">
                <div className="user-credit-container Photo-Enhancer-background-color">
                  <span>
                    <img src={credit} />
                  </span>
                  <span className="credit-amount">{userCredit}</span>
                </div>
                <button
                  className="user-profile-button Photo-Enhancer-background-color"
                  onClick={() => navigate('/profile')}
                >
                  <img src={profile} alt="user profile" className="user-profile-icon" />
                </button>
              </div>
            ) : (
              <>
                <button className="register-button" onClick={() => setIsLoginPopupOpen(true)}>Login</button>
                <button className="register-button" onClick={() => setIsPopupOpen(true)}>Register</button>
              </>
            )}
          </div>
        </div>
        <Login
          show={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={(token) => {
            fetchUserCredit(token);
          }}

        />
        <Register show={isPopupOpen} onClose={() => setIsPopupOpen(false)} />


      </nav>


      <div className="Generator-heding">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className='aiartheding'>AI Art Generator from Photo</h1>
        <p className='aiarthedingp'>
          Transform any photos into AI artworks effortlessly. Upload your photo, choose a style, and let Artguru handle the rest.
        </p>
      </div>

      <div className="Generator-tads-contenar">
        <div className="Generator-tads">
          <div className="tablist">
            <p className="teb-titel title-active">Photo to AI Art</p>
            <p className="teb-titel" onClick={() => navigate('/RemoveObjectsPhoto')}>Magic Eraser</p>
            <p className="teb-titel" onClick={() => navigate('/')}>Background Remover</p>
          </div>
        </div>

        <div>
          <ImageStyleGenerator />
          <ArtStylesSection />
          <HowToGenerate />
          <WhyArtguru />
          <Accordion23 />
          <AIMagicTools />
          <Footer2 />
        </div>
      </div>
    </>
  );
}
