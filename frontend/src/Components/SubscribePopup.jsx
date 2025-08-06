import React from 'react';
import './SubscribePopup.css';
import credit from '../c.svg';

const SubscribePopup = ({ onClose,show }) => {
       if (!show) return null;
  return (
 
    <div className="subscribe-popup-overlay">
      <div className="subscribe-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <h2 className=" popup-title">Subscribe to get more credits</h2>

        <div className="plan-container">
          {/* Weekly Plan */}
          <div className="plan-card weekyhight">
            <h3 className='weeky-text-title'>Weekly</h3>
            <p className="price">$5.99</p>
            <img src="https://www.pica-ai.com/_next/image/?url=https%3A%2F%2Fstatic.staticspic.com%2F_next%2Fstatic%2Fmedia%2Fsearch_pica.a26f5e90.png&w=1200&q=75  " alt="App Icon" className="plan-image" />
            <p className="instruction">Search in App Store or scan the QR Code</p>
            <button className="plan-button"><span className='button-text'>App Store</span></button>
            <div className='note-contaenar'>
              <p className="note">Access to both App and website </p>
              <div>
              <span><svg  className='note-svg'xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#0A0A0A" fill-opacity="0.5" fill-rule="evenodd" d="M7.5 11.9a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8m0 .933a5.833 5.833 0 1 0 0-11.666 5.833 5.833 0 0 0 0 11.666M6.168 6.367a.467.467 0 0 0 .6-.268l.002-.003a1 1 0 0 1 .047-.1c.038-.071.094-.164.169-.255.153-.187.342-.316.578-.316.284 0 .442.093.524.184a.5.5 0 0 1 .105.411c-.02.14-.111.226-.417.477-.258.212-.68.562-.68 1.2v.167a.467.467 0 1 0 .934 0v-.167c0-.163.075-.263.338-.479l.057-.046c.229-.183.618-.495.692-1.02a1.43 1.43 0 0 0-.334-1.165c-.29-.324-.72-.495-1.22-.495-.625 0-1.052.356-1.298.656a2.5 2.5 0 0 0-.36.595l-.005.014-.002.005v.002l.435.167-.436-.166c-.091.24.03.51.27.602m.601-.27V6.1zM7.5 9.858a.525.525 0 1 0 0-1.05.525.525 0 0 0 0 1.05" clip-rule="evenodd"></path></svg></span>
            </div>
            </div>
          </div>

          <div className=" Monthly-hight juw">
            <h3 className='weeky-text-title '>Monthly</h3>
            <p className="price">$9.99</p>
            {/* <p>credit</p> */}
            <div className="credit-info-2">
              <p className='credit-t'>Credits</p>
              <div className="credit-pa">
              <img className='cim' src={credit} /> 
              <p className='byc'>1,000</p></div>
            </div>
            <div className="features">
              
                  <p className='feature-text'>Fast Processing</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

            <div className="features ju">
              
                  <p className='feature-text'>Watermark-free</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

             <div className="features ju">
              
                  <p className='feature-text tju'>HD to 4K photos</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg HDju'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

             <div className="features ju">
              
                  <p className='feature-text tju'>Access to iPhone app</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg iPhoneju'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>
            
            <button className="plan-button-2">Subscribe</button>
             <div className='note-contaenar'>
              <p className="note">Auto renew, cancel anytime</p>
              <div>
              <span><svg  className='note-svg'xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#0A0A0A" fill-opacity="0.5" fill-rule="evenodd" d="M7.5 11.9a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8m0 .933a5.833 5.833 0 1 0 0-11.666 5.833 5.833 0 0 0 0 11.666M6.168 6.367a.467.467 0 0 0 .6-.268l.002-.003a1 1 0 0 1 .047-.1c.038-.071.094-.164.169-.255.153-.187.342-.316.578-.316.284 0 .442.093.524.184a.5.5 0 0 1 .105.411c-.02.14-.111.226-.417.477-.258.212-.68.562-.68 1.2v.167a.467.467 0 1 0 .934 0v-.167c0-.163.075-.263.338-.479l.057-.046c.229-.183.618-.495.692-1.02a1.43 1.43 0 0 0-.334-1.165c-.29-.324-.72-.495-1.22-.495-.625 0-1.052.356-1.298.656a2.5 2.5 0 0 0-.36.595l-.005.014-.002.005v.002l.435.167-.436-.166c-.091.24.03.51.27.602m.601-.27V6.1zM7.5 9.858a.525.525 0 1 0 0-1.05.525.525 0 0 0 0 1.05" clip-rule="evenodd"></path></svg></span>
            </div>
            </div>
          </div>

          <div className=" Monthly-hight rju">
             <div className="badge">25% OFF</div>
            <h3 className='weeky-text-title '>Annual</h3>
            <p className="price">$59.99</p>
            {/* <p>credit</p> */}
            <div className="credit-info-2">
              <p className='credit-t'>Credits</p>
              <div className="credit-pa">
              <img className='cim' src={credit} /> 
              <p className='byc'>8,000</p></div>
            </div>
            <div className="features">
              
                  <p className='feature-text'>Fast Processing</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

            <div className="features ju">
              
                  <p className='feature-text'>Watermark-free</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

             <div className="features ju">
              
                  <p className='feature-text tju'>HD to 4K photos</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg HDju'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>

             <div className="features ju">
              
                  <p className='feature-text tju'>Access to iPhone app</p>
                  <div className="feature-icon">
                  <span><svg className='icon-svg iPhoneju'xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#0A0A0A" fill-rule="evenodd" d="M19.566 6.434a.8.8 0 0 1 0 1.132l-9 9a.8.8 0 0 1-1.132 0l-5-5a.8.8 0 1 1 1.132-1.132L10 14.87l8.434-8.435a.8.8 0 0 1 1.132 0" clip-rule="evenodd"></path></svg></span>
              </div>
            </div>
            
            <button className="plan-button-2">Subscribe</button>
             <div className='note-contaenar'>
              <p className="note">Auto renew, cancel anytime</p>
              <div>
              <span><svg  className='note-svg'xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none" viewBox="0 0 15 14"><path fill="#0A0A0A" fill-opacity="0.5" fill-rule="evenodd" d="M7.5 11.9a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8m0 .933a5.833 5.833 0 1 0 0-11.666 5.833 5.833 0 0 0 0 11.666M6.168 6.367a.467.467 0 0 0 .6-.268l.002-.003a1 1 0 0 1 .047-.1c.038-.071.094-.164.169-.255.153-.187.342-.316.578-.316.284 0 .442.093.524.184a.5.5 0 0 1 .105.411c-.02.14-.111.226-.417.477-.258.212-.68.562-.68 1.2v.167a.467.467 0 1 0 .934 0v-.167c0-.163.075-.263.338-.479l.057-.046c.229-.183.618-.495.692-1.02a1.43 1.43 0 0 0-.334-1.165c-.29-.324-.72-.495-1.22-.495-.625 0-1.052.356-1.298.656a2.5 2.5 0 0 0-.36.595l-.005.014-.002.005v.002l.435.167-.436-.166c-.091.24.03.51.27.602m.601-.27V6.1zM7.5 9.858a.525.525 0 1 0 0-1.05.525.525 0 0 0 0 1.05" clip-rule="evenodd"></path></svg></span>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
