import React from 'react';
import './HowToGenerate.css';

const HowToGenerate = () => {
  return (
    <div className="how-to-container">
      <div className="steps">
        {[
          {
            title: 'Upload a Photo',
            description:
              'Upload a photo, which can be a portrait, animal, landscape, or any other subject you desire to transform into AI art.',
          },
          {
            title: 'Choose a Style',
            description:
              'Select any style you like, considering that some styles are more suitable for portraits or animals, while others are better suited for landscapes or scenes.',
          },
          {
            title: 'Enter Prompts (optional)',
            description:
              'If desired, you can also enter prompts or negative prompts to describe the details that you do not want to include in your image.',
          },
          {
            title: 'Generate Your Image',
            description:
              'Click on the "Generate" button to initiate the AI art creation process.',
          },
        ].map((step, index) => (
          <div className="step" key={index}>
            <div>
            <p className='number-text'><span class="step-number">{index + 1}</span> <strong><p className="step-title">{step.title}</p></strong></p>

            {/* <div className="step-number">{index + 1}</div> */}
            
              {/* <div className="step-title">{step.title}</div> */}
              <div className="step-description">{step.description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="demo-box">
        <img src="https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fsteps.ec120e2e.png&w=1080&q=75" alt="Demo" className="demo-image" />
      </div>
    </div>
  );
};

export default HowToGenerate;
