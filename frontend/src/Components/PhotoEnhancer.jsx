import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer} from 'react-toastify';
import profile from '../profile.svg';
import Register from './Registerpopup';
import Login from './Loginpopup';
import './PhotoEnhancer.css';
import ImageUploading from 'react-images-uploading';
import credit from '../c.svg'
import lod from '../loding.svg'
import ImageEnhancerFeatures from './ImageEnhancerFeatures';
import Footer from "./footr";
import Accordion from './Accordion';
import SubscribePopup from './SubscribePopup';

function PhotoEnhancer() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [userCredit, setUserCredit] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [clipPercent, setClipPercent] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [enhancedImage, setEnhancedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState([]);
  const [isProcessingDone, setIsProcessingDone] = useState(false);
  const [isSubscribePopupOpen, setIsSubscribePopupOpen] = useState(false);


  const imagePairs = [{
    before: 'https://static.pica-ai.com/_next/static/media/enhance_1-2.466fb7a3.jpg',
    after: 'https://static.pica-ai.com/_next/static/media/enhance_1-1.a0ab3f62.jpg',
    thumb: 'https://static.pica-ai.com/_next/static/media/enhance_1-1.a0ab3f62.jpg',
  },
  {
    before: 'https://static.pica-ai.com/_next/static/media/enhance_2-2.161da212.jpg',
    after: 'https://static.pica-ai.com/_next/static/media/enhance_2-1.2baab08d.jpg',
    thumb: 'https://static.pica-ai.com/_next/static/media/enhance_2-1.2baab08d.jpg',
  },
  {
    before: 'https://static.pica-ai.com/_next/static/media/enhance_3-2.6e99e274.jpg',
    after: 'https://static.pica-ai.com/_next/static/media/enhance_3-1.c29ce005.jpg',
    thumb: 'https://static.pica-ai.com/_next/static/media/enhance_3-1.c29ce005.jpg',
  },
  {
    before: 'https://static.pica-ai.com/_next/static/media/enhance_4-2.ccf4ebe7.jpg',
    after: 'https://static.pica-ai.com/_next/static/media/enhance_4-1.4ee8a47d.jpg',
    thumb: 'https://static.pica-ai.com/_next/static/media/enhance_4-1.4ee8a47d.jpg',
  },];

  const onError = (errors, files) => {
    console.error("Image upload error", errors, files);
    toast.error('Image upload failed. Check file format or size.');
  };

  const before = imagePairs[currentIndex]?.before;
  const after = imagePairs[currentIndex]?.after;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserCredit(token);
    }
  }, []);

  const fetchUserCredit = async (token) => {
    try {
      const response = await fetch('http://192.168.1.25:5000/api/credit', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok || !data || data.credit == null || data.email == null) {
        throw new Error(data?.error || 'Invalid response');
      }
      setUserCredit(data.credit);
      setUserEmail(data.email);
    } catch (err) {
      console.error("Fetch credit error:", err);
      setUserCredit(null);
      setUserEmail(null);
      toast.error('Failed to fetch user credit.');
    }
  };
  const handleImageChange = (index) => {
    setCurrentIndex(index);
  };


  // const handleImageChange = (index) => setCurrentIndex(index);
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    setClipPercent(percent);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSelectedImageFile(file);
      setPreviewUrl(preview);
      setEnhancedImage(null);
      toast.success('Image dropped and selected');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setSelectedImageFile(file);
      setPreviewUrl(preview);
      setEnhancedImage(null);
      toast.success('Image selected');
    }
  };

  const handleUpscale = async () => {
  if (!selectedImageFile) return toast.error("Please select an image");
  const token = localStorage.getItem('token');
  if (!token) return toast.error("Please login to enhance photo");

  const formData = new FormData();
  formData.append('image', selectedImageFile);

  try {
    setLoading(true);
    setIsProcessingDone(false); // reset

    const res = await fetch('http://192.168.1.25:5000/api/upscale', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.status === 402) {
      toast.error('site is under maintenance');
      return;
    }

    const data = await res.json();
    if (!res.ok || !data.processed) {
      throw new Error(data?.error || 'Enhancement failed');
    }

    setEnhancedImage(data.processed);
    toast.success('Image enhanced successfully');
    setIsProcessingDone(true);
  } catch (err) {
    toast.error('Upscale failed');
  } finally {
    setLoading(false);
  }
};

  const fileInputRef = useRef(null);
  const handleSelectButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    if (imageList.length > 0) {
      const file = imageList[0].file;
      const preview = URL.createObjectURL(file);
      setSelectedImageFile(file);
      setPreviewUrl(preview);
      setEnhancedImage(null);
      setTimeout(() => {
        document.querySelector('.preview-container')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
   
    <div className='no-scroll'>
      <nav class="navbar navbar-expand-lg navbar-light bg-light b1">
        <div className='icon-menu'>
          <div className="Picsart-logo-container Picsart-logo-m ml" onClick={() => navigate('/')}>
            <img src="https://static.pica-ai.com/_next/static/media/logo_pica_black.77b77ad3.png" alt="logo" className="AIPhoto-Enhancer-logo" />
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
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

                 <div className="user-credit-container Photo-Enhancer-background-color" onClick={() => setIsSubscribePopupOpen(true)}>
  <span>
    <img src={credit} />
  </span>
  <span className="credit-amount">{userCredit}</span>

  {/* Tooltip or hover card */}
  <div className="credit-card">
    <div className="credit-info">
      <div className="credit-icon"><img src={credit} /><span className="highlight">{userCredit}</span> free credits</div></div>
      <div className="credit-text">
        <div className="credit-count">
        <div className="credit-refresh">Free credits 100</div>
      </div>
    </div>
    <button className="add-credits-button"  onClick={() => setIsSubscribePopupOpen(true)}>Add credits</button>
  </div>
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
       <ToastContainer position="top-right" autoClose={3000} />
      <SubscribePopup show={isSubscribePopupOpen} onClose={() => setIsSubscribePopupOpen(false)} />
      <Login show={isLoginPopupOpen} onClose={() => setIsLoginPopupOpen(false)} onLoginSuccess={fetchUserCredit} />
      <Register show={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      <div className="h1po">
        <div className='hading-background-img'>
          <svg xmlns="http://www.w3.org/2000/svg" width="226" height="72" fill="none" viewBox="0 0 226 72"><path stroke="url(#a)" stroke-linecap="round" stroke-width="34" d="M17 51.245c36-7.74 62.797-34.855 96-33.474 41.504 1.727-52.496 31.451-20.122 35.94C125.25 58.199 162 16.485 199.5 17.005c22 .305-2 26-15.672 36.706"></path><defs><linearGradient id="a" x1="29.5" x2="224" y1="-0.996" y2="65.004" gradientUnits="userSpaceOnUse"><stop stop-color="#EFDD3D" stop-opacity="0.43"></stop><stop offset="1" stop-color="#D51AC3" stop-opacity="0.52"></stop></linearGradient></defs></svg>
        </div>
        <h1 className="font-fumily-medium h1font">
          AI Photo Enhancer
        </h1>
      </div>
      <div className="photo-enhancer">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          onError={onError}
          maxNumber={50}
          dataURLKey="data_url"
          acceptType={['jpg', 'jpeg', 'png']}
        >
          {({ imageList, onImageUpload, dragProps, isDragging }) => (
            <>
              <div className="container">
                <div className="upload-preview">
                  {imageList.length === 0 ? (
                    <>
                      <div
                        className={`upload-box ${isDragging ? 'drag-hover' : ''}`}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <div className='upload-box-item'>
                          <div className='drop-contain-img-text'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="" stroke="" viewBox="0 0 24 24" class="upload-placeholder-icon"><path fill="rgb(181 181 181)" d="M19.675 16.875a.8.8 0 0 1 .796.718l.004.082v1.2h1.2l.082.004a.8.8 0 0 1 0 1.592l-.082.004h-1.2v1.2a.8.8 0 0 1-1.6 0v-1.2h-1.2a.8.8 0 0 1 0-1.6h1.2v-1.2l.004-.082a.8.8 0 0 1 .796-.718"></path><path fill="rgb(181 181 181)" fill-rule="evenodd" d="M15.676 3c1.132 0 2.05.917 2.05 2.049v1.564c0 .195-.07.373-.186.512H19.8c1.132 0 2.05.917 2.05 2.049v6.064a.8.8 0 0 1-1.601 0V9.174c0-.248-.2-.449-.449-.449H9.174c-.248 0-.449.201-.449.449V19.8c0 .248.201.449.449.449h6.064l.081.004a.8.8 0 0 1 0 1.592l-.081.004H9.174a2.05 2.05 0 0 1-2.049-2.049V17.54a.8.8 0 0 1-.43.182l-.082.004H5.049A2.05 2.05 0 0 1 3 15.676V5.05A2.05 2.05 0 0 1 5.049 3zM5.05 4.6c-.248 0-.449.201-.449.449v10.627c0 .248.201.449.449.449h1.564l.081.004a.8.8 0 0 1 .431.182V9.174a2.05 2.05 0 0 1 2.049-2.049h7.137a.8.8 0 0 1-.186-.512V5.049c0-.248-.2-.449-.449-.449z" clip-rule="evenodd"></path><path fill="rgb(181 181 181)" d="M18.438 13.853a.8.8 0 0 1 .126 1.587l-.081.01-.318.028c-3.143.29-5.378 1.135-6.582 3.097l-.117.2-.043.07a.8.8 0 0 1-1.39-.776l.036-.074.077-.135c1.592-2.717 4.533-3.668 7.88-3.976l.33-.028zM11.769 10.55a1.219 1.219 0 1 1 0 2.438 1.219 1.219 0 0 1 0-2.438"></path></svg>
                            <p className='font-fumily-small'>Drag to upload up to 50 photos</p>
                          </div>
                          <div className="select-button-container">
                            <button className="select-button" onClick={onImageUpload}>Select photos</button>
                          </div>
                        </div>

                      </div>
                      {(before && after) && (
                        <div
                          className="preview-box"
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                        >
                          <div
                            className="before-after"
                            ref={containerRef}
                            onMouseDown={handleMouseDown}
                          >
                            <img src={before} alt="Before" className="before-img" />
                            <img
                              src={after}
                              alt="After"
                              className="after-img"
                              style={{ clipPath: `inset(0 ${100 - clipPercent}% 0 0)` }}
                            />
                            <button className="slider-button" style={{ left: `${clipPercent}%` }} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" fill="none" viewBox="0 0 54 54"><circle cx="27" cy="27" r="25.167" fill="#000" fill-opacity="0.2" stroke="#fff" stroke-width="3"></circle><path stroke="#fff" stroke-linecap="round" stroke-width="4.267" d="m19.05 22.383-3.902 3.315a1.333 1.333 0 0 0 0 2.032l3.902 3.315M34.95 22.383l3.902 3.315c.626.532.626 1.5 0 2.032l-3.902 3.315"></path></svg>
                            </button>
                          </div>

                          <div className="thumbnails">
                            {imagePairs.map((pair, index) => (
                              <img
                                key={index}
                                src={pair.thumb}
                                className={`thumb ${currentIndex === index ? 'active' : ''}`}
                                onClick={() => handleImageChange(index)}
                                alt={`Thumbnail ${index + 1}`}
                              />
                            ))}
                          </div>
                          {/* <div className='midyabutton'>
                           <button className="select-button"  onClick={onImageUpload}>Select photos</button>
                      </div> */}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className='edit-photo-p'>
                        <div className="upload-box1">
                          {loading && <><div className='loader-container'><img src={lod} className='loader-container-text-m' /><p className='loader-container-text-m'>Enhancing...</p>
                            <div className='loader-container-text'>
                              <p className='loader-container-text-m'>Subscribe and save 75% of <br />time</p>
                            </div>
                          </div> </>}

                          {(previewUrl || enhancedImage) && (
                            <div className="preview-container">
                              <img
                                src={enhancedImage || previewUrl}
                                alt="Preview"
                                className="img-p"
                              />

                            </div>
                          )}

                        </div>
                        <div className='edit-prosecc-photo-container'>
                          <div className='pro-container-1'>
                            <p className='pro-container-p1 font-fumily-medium'>Enhancing 1 photo...</p>
                            <p>Queue #1,within 1 minutes</p>
                          </div>
                          <div className='Enhance-button-container'>
                            <button onClick={handleUpscale} className="Enhance-button font-fumily-medium">
                              Enhance Photo
                            </button>
                          </div>
                          <div className='pro-container-2 font-fumily-small'>
                            {loading ? (
                              <div>
                                <div className='lodar-contaenar-2'>
                                  <p className='pro-container-2-p1'>Remove blur</p>
                                  <div className="loader2 smar1"></div>
                                </div>
                                <div className='lodar-contaenar-2'>
                                  <p className='pro-container-2-p1'>Increase quality</p>
                                  <div className="loader2 smar2"></div>
                                </div>
                                <div className='lodar-contaenar-2'>
                                  <p className='pro-container-2-p1'>Enhance details</p>
                                  <div className="loader2 smar3"></div>
                                </div>
                              </div>
                            ) : isProcessingDone ? (
                              <>
                                <div>
                                  <div className='lodar-contaenar-2'>
                                    <p className='pro-container-2-p1'>Remove blur</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="right" className='true-svg smar1'>
                                      <path fill="#848484" d="M193.6,435.3c-10.3,0-20.6-3.9-28.5-11.8L11.8,270.2c-15.7-15.7-15.7-41.2,0-56.9c15.7-15.7,41.2-15.7,56.9,0
		l124.9,124.9L443.3,88.4c15.7-15.7,41.2-15.7,56.9,0c15.7,15.7,15.7,41.2,0,56.9L222,423.5C214.2,431.3,203.9,435.3,193.6,435.3z"></path>
                                    </svg>
                                  </div>
                                  <div className='lodar-contaenar-2'>
                                    <p className='pro-container-2-p1'>Increase quality</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="right" className='true-svg smar2'>
                                      <path fill="#848484" d="M193.6,435.3c-10.3,0-20.6-3.9-28.5-11.8L11.8,270.2c-15.7-15.7-15.7-41.2,0-56.9c15.7-15.7,41.2-15.7,56.9,0
		l124.9,124.9L443.3,88.4c15.7-15.7,41.2-15.7,56.9,0c15.7,15.7,15.7,41.2,0,56.9L222,423.5C214.2,431.3,203.9,435.3,193.6,435.3z"></path>
                                    </svg>
                                  </div>
                                  <div className='lodar-contaenar-2'>
                                    <p className='pro-container-2-p1'>Enhance details</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512" viewBox="0 0 512 512" id="right" className='true-svg smar3'>
                                      <path fill="#848484" d="M193.6,435.3c-10.3,0-20.6-3.9-28.5-11.8L11.8,270.2c-15.7-15.7-15.7-41.2,0-56.9c15.7-15.7,41.2-15.7,56.9,0
		l124.9,124.9L443.3,88.4c15.7-15.7,41.2-15.7,56.9,0c15.7,15.7,15.7,41.2,0,56.9L222,423.5C214.2,431.3,203.9,435.3,193.6,435.3z"></path>
                                    </svg>
                                  </div>
                                </div>

                                {enhancedImage && (
                                  <a href={enhancedImage} download="enhanced-image.jpg">
                                    <button className="select-button">Download</button>
                                  </a>
                                )}
                              </>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <ImageEnhancerFeatures />
              </div>
              <Accordion />
              <div class="faq-item expanded">
                <div class="enhancer-container">
                  <div class="enhancer-box">
                    <h1 class="enhancer-title">Enhance Image Quality with Pica AI</h1>
                    <p class="enhancer-subtitle">Automatic, Fast, and Free</p>
                    <button class="upload-button juw" onClick={onImageUpload}>Upload Image</button>
                  </div>
                </div>

              </div>
              <Footer />
            </>
          )}
        </ImageUploading>

      </div>

    </div>
  );
}

export default PhotoEnhancer;