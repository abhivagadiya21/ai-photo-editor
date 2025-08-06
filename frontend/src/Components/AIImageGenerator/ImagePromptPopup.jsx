import React, { useState } from 'react';
import './cssAIImageGenerator/ImagePromptPopup.css';
import VerticalSlider from './VerticalSlider';

const ImagePromptPopup = ({ image, prompt, onClose, onPromptClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState('');

  const handleCardClick = (img, p) => {
    setSelectedImage(img);
    setSelectedPrompt(p);
  };

  const handleSetPrompt = () => {
  if (onPromptClick) {
    console.log("Hello");
    onPromptClick(selectedPrompt || prompt);
  }
  onClose();
};

  if (!image) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>

        <div className="popup-main">
          <VerticalSlider onImageClick={handleCardClick} />
          <img
            src={selectedImage || image}
            alt="Prompt Preview"
            className="popup-image"
          />
          <div className="popup-details">
            <div className="popup-button-media">
              <button className="use-btn" onClick={handleSetPrompt}>
                <svg className="ju-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="fff" viewBox="0 0 24 24">
                  <path fill="#3b2fd1" fillRule="evenodd" d="M19 4.6H9a.4.4 0 0 0-.4.4v2H15a2 2 0 0 1 2 2v6.4h2a.4.4 0 0 0 .4-.4V5a.4.4 0 0 0-.4-.4M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2zM5 8.6h10c.22 0 .4.18.4.4v10a.4.4 0 0 1-.4.4H5a.4.4 0 0 1-.4-.4V9c0-.22.18-.4.4-.4" clipRule="evenodd" />
                </svg>
                <p>Use prompt</p>
              </button>

              <a className="download-btn" href={image} download>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="#3b2fd1" fillRule="evenodd" d="M11.987 3.05a.8.8 0 0 1 .8.8v10.057l3.244-2.885a.8.8 0 0 1 1.063 1.196l-4.576 4.068a.8.8 0 0 1-1.063 0l-4.576-4.068a.8.8 0 0 1 1.063-1.196l3.245 2.885V3.85a.8.8 0 0 1 .8-.8m8.935 12.6a.8.8 0 0 0-1.6 0v3.106c0 .682-.552 1.234-1.234 1.234H5.885a1.234 1.234 0 0 1-1.234-1.234v-3.105a.8.8 0 1 0-1.6 0v3.105a2.834 2.834 0 0 0 2.834 2.834h12.203a2.834 2.834 0 0 0 2.834-2.834z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="popup-title12 ">Prompt</p>
            <p className="popup-text">{selectedPrompt || prompt}</p>

            <div className="popup-buttons">
              <button className="use-btn" onClick={handleSetPrompt}>
                <svg className="ju-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="fff" viewBox="0 0 24 24">
                  <path fill="" fillRule="evenodd" d="M19 4.6H9a.4.4 0 0 0-.4.4v2H15a2 2 0 0 1 2 2v6.4h2a.4.4 0 0 0 .4-.4V5a.4.4 0 0 0-.4-.4M17 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2zM5 8.6h10c.22 0 .4.18.4.4v10a.4.4 0 0 1-.4.4H5a.4.4 0 0 1-.4-.4V9c0-.22.18-.4.4-.4" clipRule="evenodd" />
                </svg>
                <p>Use prompt</p>
              </button>

              <a className="download-btn" href={image} download>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path fill="#0A0A0A" fillRule="evenodd" d="M11.987 3.05a.8.8 0 0 1 .8.8v10.057l3.244-2.885a.8.8 0 0 1 1.063 1.196l-4.576 4.068a.8.8 0 0 1-1.063 0l-4.576-4.068a.8.8 0 0 1 1.063-1.196l3.245 2.885V3.85a.8.8 0 0 1 .8-.8m8.935 12.6a.8.8 0 0 0-1.6 0v3.106c0 .682-.552 1.234-1.234 1.234H5.885a1.234 1.234 0 0 1-1.234-1.234v-3.105a.8.8 0 1 0-1.6 0v3.105a2.834 2.834 0 0 0 2.834 2.834h12.203a2.834 2.834 0 0 0 2.834-2.834z" clipRule="evenodd" />
                </svg>
                Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePromptPopup;
