import React, { useState } from 'react';
import './cssMagicEraser/MagicEraser.css';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 


const MagicEraser = () => {
  const [brushSize, setBrushSize] = useState(20);
  const [image, setImage] = useState(true); 



  return (
    <div className="eraser-container jugad">
      <div className="eraser-steps">
        {/* Step 1 */}
        <div className="step4">
          <div>
            <span className="step-number4">STEP 1:</span> Upload your photo for a quick cleanup
          </div>
          <div className="upload-box">
            <p>Click or drag an image to upload</p>
            <label className="upload-btn">
              <input type="file" accept="image/*"hidden />
              <span className='img-svg45'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 3.83358H5C4.35567 3.83358 3.83333 4.35591 3.83333 5.00024V11.0263L6.56562 8.29399L6.57477 8.28502C7.01857 7.85796 7.56127 7.60262 8.14814 7.60262C8.735 7.60262 9.2777 7.85796 9.7215 8.28502C9.72675 8.29007 9.73191 8.2952 9.73698 8.30041L12.5611 11.2019C12.8179 11.4658 12.8122 11.8878 12.5483 12.1446C12.2845 12.4015 11.8624 12.3957 11.6056 12.1319L8.78975 9.23886C8.54894 9.00987 8.32689 8.93595 8.14814 8.93595C7.96864 8.93595 7.7455 9.01049 7.50352 9.24171L3.83333 12.9119V15.0002C3.83333 15.6446 4.35567 16.1669 5 16.1669H12.5V17.5002H5C3.61929 17.5002 2.5 16.381 2.5 15.0002V5.00024C2.5 3.61953 3.61929 2.50024 5 2.50024H15C16.3807 2.50024 17.5 3.61953 17.5 5.00024V10.0002H16.1667V5.00024C16.1667 4.35591 15.6443 3.83358 15 3.83358Z" fill="white"></path><path d="M12.9167 8.33358C13.607 8.33358 14.1667 7.77393 14.1667 7.08358C14.1667 6.39322 13.607 5.83358 12.9167 5.83358C12.2263 5.83358 11.6667 6.39322 11.6667 7.08358C11.6667 7.77393 12.2263 8.33358 12.9167 8.33358Z" fill="white"></path><path d="M16.6666 11.895C17.0348 11.895 17.3333 12.1935 17.3333 12.5617V14.1171H18.8889C19.257 14.1171 19.5555 14.4156 19.5555 14.7838C19.5555 15.152 19.257 15.4504 18.8889 15.4504H17.3333V17.0061C17.3333 17.3743 17.0348 17.6728 16.6666 17.6728C16.2984 17.6728 16 17.3743 16 17.0061V15.4504H14.4444C14.0762 15.4504 13.7778 15.152 13.7778 14.7838C13.7778 14.4156 14.0762 14.1171 14.4444 14.1171H16V12.5617C16 12.1935 16.2984 11.895 16.6666 11.895Z" fill="white"></path></svg></span>
              Upload Image
            </label>
          </div>
        </div>

        <div className="step4 ">
          <div>
            <span className="step-number4">STEP 2:</span> Use the brush tool to paint over the unwanted objects in your photo
          </div>
          <div className="slider-box">
            <span>🖌️</span>
            <span>1px</span>
            <input
            className='input-sleder45'
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value)}
            />
            <span>100px</span>
          </div>
        </div>

        <div className="step4 margin45" >
          <div>
            <span className="step-number4">STEP 3:</span> Click 'Clean Up' to remove the objects instantly
          </div>
          <button className="cleanup-btn" disabled>Clean Up</button>
        </div>
      </div>

      <div className="eraser-preview">
      {image && (
        <div className="image-wrapper45">
          <video
            width="100%"
            autoPlay
            loop
            muted
            style={{ borderRadius: '12px' }}
          >
            <source src="https://video.artguru.ai/showcases/removal_case_sharp_corner.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  
    </div>
  );
};

export default MagicEraser;
