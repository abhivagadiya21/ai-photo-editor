import React, { useState, useEffect } from 'react';
import { UploadIcon, ImageIcon } from '@radix-ui/react-icons';
import './cssAIImageGenerator/AIImageGenerator.css';
import uploadimg from './uploadimg.svg';
import AIImageGenerator from './AIImageGeneratorslaider';
import InspirationGallery from './InspirationGallery';
import FeatureSection from './FeatureSection';
import HowToGenerateSection from './HowToGenerateSection';
import TipsSection from './TipsSection';
import AIImageaccordion from './AIImageaccordion';
import FinalCTASection from './FinalCTASection';
import Footer2 from './footer2';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import credit from '../../c.svg';
import profile from '../../profile.svg';
import Register from '../Registerpopup';
import Login from '../Loginpopup';
import ImagePromptPopup from './ImagePromptPopup';
import { useGlobalState, useGlobalDispatch } from '../../Components/GlobalStateContext';

const ImagePromptBox = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [userCredit, setUserCredit] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const { promptText } = useGlobalState();
  const dispatch = useGlobalDispatch();
  const [prompt, setPrompt] = useState('');
  const [popupImage, setPopupImage] = useState(null);
  const [popupPrompt, setPopupPrompt] = useState('');
  const [isPromptPopupOpen, setIsPromptPopupOpen] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchUserCredit = async (token) => {
    try {
      const response = await fetch('http://192.168.1.25:5000/api/credit', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch credit');
      setUserCredit(data.credit);
      setUserEmail(data.email);
    } catch (err) {
      console.error('Failed to fetch credit:', err);
      setUserCredit(null);
      toast.error('Failed to fetch user credit.');
    }
  };
  useEffect(() => {
    dispatch({ type: 'SET_PROMPT', payload: prompt });
  }, [prompt]);


 
const handleGenerateImage = async () => {
  const token = localStorage.getItem('token');

  if (!promptText || promptText.trim() === '') {
    toast.error('Please enter a prompt!');
    return;
  }

  setIsLoading(true); 
  try {
    const res = await fetch('http://localhost:5000/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        width: 1024,
        height: 1024,
        count: 1,
        prompt: promptText,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Failed to generate image');
    }

    if (!data.result?.data?.length) {
      throw new Error('No image(s) returned from backend.');
    }

    toast.success(data.message);
    setGeneratedImages(data.result.data);
  } catch (err) {
    console.error('Error generating image:', err.message);
    toast.error(err.message || 'Failed to generate image');
  } finally {
    setIsLoading(false); 
  }
};


  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light b1 bi">
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

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="hero-section2">
        <p className="hero-title">AI Image Generator</p>
        <p className="hero-subtitle">Turn your text into AI-generated images.</p>
      </div>

      <div className="image-prompt-container">
        <div className='image-prompt-box'>
          {isPromptPopupOpen && popupImage && (
            <ImagePromptPopup
              image={popupImage}
              image2={popupImage}
              prompt={popupPrompt}
              onClose={() => setIsPromptPopupOpen(false)}
              onPromptClick={(text) => {
                console.log(text)
                dispatch({ type: 'SET_PROMPT', payload: text });
                setIsPromptPopupOpen(false);
              }}
            />

          )}
        
          <textarea
            placeholder="Enter your imagination..."
            className="prompt-input"
            rows="3"
            cols="50"
            value={promptText}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

          <div className="image-buttons-container">
            <div className='uacc-buttons'>
              <button className="upload-button5">
                <span><img src={uploadimg} className='uploadimg' alt="" /></span> Upload
              </button>


              <button className="upload-button5-media">
                <span><img src={uploadimg} className='uploadimg' alt="" /></span>
              </button>
              <div className="image-icon-buttons">
                <button className="aspect-button">1:1</button>
                <button className="count-button"><ImageIcon /> 1</button>
                <button
  className="create-button create-button2"
  onClick={handleGenerateImage}
  disabled={isLoading}
>
  {isLoading ? 'Generating...' : 'Create'}
</button>
              </div>
            </div>
          </div>
        </div>


      </div>

      <AIImageGenerator />
      <button className="create-button-media ">
        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M14.285 5.013a.8.8 0 0 0 .8.8h1.082v1.082a.8.8 0 0 0 1.6 0V5.813h1.081a.8.8 0 1 0 0-1.6h-1.081V3.132a.8.8 0 0 0-1.6 0v1.081h-1.082a.8.8 0 0 0-.8.8m-8.558.947L7.14 4.546a.4.4 0 0 1 .565 0L9.97 6.808l-1.98 1.98-2.262-2.263a.4.4 0 0 1 0-.565m14.707 11.314L11.101 7.94 9.12 9.92l9.333 9.333a.4.4 0 0 0 .566 0l1.414-1.414a.4.4 0 0 0 0-.566M6.01 3.413a2 2 0 0 1 2.829 0l12.728 12.728a2 2 0 0 1 0 2.829l-1.415 1.414a2 2 0 0 1-2.828 0L4.595 7.657a2 2 0 0 1 0-2.829zM1.305 13.892a.8.8 0 0 0 .8.8h.987v.986a.8.8 0 0 0 1.6 0v-.986h.987a.8.8 0 0 0 0-1.6h-.987v-.987a.8.8 0 0 0-1.6 0v.987h-.987a.8.8 0 0 0-.8.8m5.91 5.356a.8.8 0 0 1 0-1.6h.517v-.517a.8.8 0 0 1 1.6 0v.517h.516a.8.8 0 1 1 0 1.6h-.516v.516a.8.8 0 1 1-1.6 0v-.516z" clip-rule="evenodd"></path></svg></span>
        Create</button>
         {generatedImages.length > 0 && (
            <div className="generated-images-container">
              <h3 className="generated-heading">Generated Images</h3>
              <div className="generated-images-grid">
                {generatedImages.map((url, index) => (
                  <img key={index} src={url} alt={`Generated ${index + 1}`} className="generated-image" />
                ))}
              </div>
            </div>
          )}
      <InspirationGallery />
      <FeatureSection />
      <HowToGenerateSection />
      <TipsSection />
      <AIImageaccordion />
      <FinalCTASection />
      <Footer2 />
    </>
  );
};

export default ImagePromptBox;
