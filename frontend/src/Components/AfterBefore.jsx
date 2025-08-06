import './AfterBefore.css';
import React, { useState, useEffect } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import ImageUploading from 'react-images-uploading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import originalimg from '../o.svg';
import profile from '../profile.svg'
import Register from './Registerpopup';
import Login from './Loginpopup';
import { useNavigate } from 'react-router-dom';
import credit from '../c.svg';

function AfterBefore() {
  const FIRST_IMAGE = {
    imageUrl: 'https://cdn-cms-uploads.picsart.com/cms-uploads/35935a14-929f-4e34-8f1e-3063435ffd2c.webp?type=webp&to=min&r=-1',
  };
  const SECOND_IMAGE = {
    imageUrl: 'https://cdn-cms-uploads.picsart.com/cms-uploads/673d3990-5183-4f7a-95b0-b2ad9b552061.webp?type=webp&to=min&r=-1',
  };

  const [images, setImages] = useState([]);
  const [processedImage, setProcessedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState(null);
  const [outputImage, setOutputImage] = useState(null);
  const [userCredit, setUserCredit] = useState(null);

  const navigate = useNavigate();
  const maxNumber = 1;

  const onChange = (imageList) => {
    setImages(imageList);
    handleRemoveBackground(imageList[0]?.file);
  };

  const onError = (errors) => {
    if (errors.acceptType) {
      toast.error('Only JPG, PNG, and JPEG files are allowed!');
    } else if (errors.maxNumber) {
      toast.error(`You can upload up to ${maxNumber} images only.`);
    } else {
      toast.error('Upload error. Please try again.');
    }
  };

  const handleRemoveBackground = async (imageFile) => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://192.168.1.25:5000/api/removebg', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Processed result:", result);

      if (!response.ok) {
        if (response.status === 403 && result.error === 'Not enough credit') {
          toast.error('You do not have enough credits to remove background.');
        } else if (result.error === 'Invalid or expired token') {
          toast.error('Session expired. Please log in again.');
          localStorage.removeItem('token');
          setUserEmail(null);
          navigate('/login');
        } else {
          toast.error(result.error || 'Failed to process image.');
        }
        return;
      }
      console.log(result)

      setOutputImage(result.processed);
      setProcessedImage(result.processed);
    } catch (error) {
      console.error('Remove background error:', error);
      toast.error('Network or server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const downloadProcessedImage = () => {
    if (processedImage) {
      const a = document.createElement('a');
      a.href = processedImage;
      a.download = 'processed-image.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      toast.error("No processed image to download.");
    }
  };

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserCredit(token);
    }
  }, []);

  return (
    <>

 <nav class="navbar navbar-expand-lg navbar-light bg-light b1">
        <div className='icon-menu'>
  <div className='Picsart-logo-container'>
          <img src="https://pastatic.picsart.com/cms-pastatic/8218299e-3dc4-4d50-8a54-0b78d3f5a683.svg" alt="logo" className="Picsart-logo" />
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
</nav>

<Login
          show={isLoginPopupOpen}
          onClose={() => setIsLoginPopupOpen(false)}
          onLoginSuccess={(token) => {
            fetchUserCredit(token);
          }}

        />
        <Register show={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <div className="app-container margin">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="title-container">
          <p className="title">Remove Background</p>
        </div>
        <div className="title-container2">
          <p className="p1">
            Make photos clearer and sharper in just a click with AI-powered technology. The Picsart photo enhancer boosts image quality, adds detail, and gets your photos ready to share. Plus, you can save lower-resolution images for free!
          </p>
        </div>
        <div className="img-after-before-upload-container">
          <div className="img-container ReactBeforeSliderComponent">
            <ReactBeforeSliderComponent firstImage={FIRST_IMAGE} secondImage={SECOND_IMAGE} />
          </div>
          <div className="img-container img-container-ju">
            <div className="img-upload-container">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                onError={onError}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'jpeg', 'png']}
              >
                {({ imageList, onImageUpload, dragProps, isDragging }) => (
                  <div className="upload__image-wrapper">
                    {imageList.length === 0 ? (
                      <>
                        <div className="dog-img-container">
                          <img className="dog-img" src="https://pastatic.picsart.com/cms-pastatic/e209da17-0e13-4ba0-a2ad-4c246f6f709d.png" alt="upload" />
                        </div>
                        <div className="upload-text-container"><p>AI Enhance</p></div>
                        <div className={`dregandrop ${isDragging ? 'drag-hover' : ''}`} {...dragProps} onClick={onImageUpload}>
                          <button className="upload-button">
                            <img src="https://img.icons8.com/?size=100&id=tN6KMm0SQcPn&format=png&color=FFFFFF" alt="upload" className="uploadimage" />
                            Browse files
                          </button>
                          <p className="p2">or drag and drop it here</p>
                        </div>
                      </>
                    ) : (
                      imageList.map((image, index) => (
                        <div key={index} className="image-full-preview">
                          {loading ? (
                            <div className="loader-container">
                              <div className="loader"></div>
                              <p>Processing your image...</p>
                            </div>
                          ) : (
                            <>
                              <div>
                                <button className="originalimg" onClick={() => setShowOriginal(prev => !prev)} title={showOriginal ? "Show Enhanced" : "Show Original"}>
                                  <img src={originalimg} className="oimg" alt="Toggle" />
                                </button>
                              </div>
                              <div className="processed-image-wrapper">
                                <img src={outputImage} className="progressimg" alt={showOriginal ? "Original" : "Processed"} />
                              </div>
                              <button className="remove-image-button" onClick={() => {
                                setImages([]);
                                setProcessedImage(null);
                                setOutputImage(null);
                              }}>X</button>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AfterBefore;