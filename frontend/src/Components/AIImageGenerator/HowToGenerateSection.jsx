import React from "react";
import './cssAIImageGenerator/HowToGenerateSection.css'; // Import the CSS file

const steps = [
  {
    img: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstep_1.d9d8590b.jpeg&w=1920&q=75",
    title: "1. Write Your Text Prompt",
    description:
      "Describe your image in detail – what you want to see, the style, and the environment or setting.",
  },
  {
    img: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstep_2.8ef23402.jpeg&w=1920&q=75",
    title: "2. Customize Your Creation",
    description:
      "Select image size (square, portrait, or landscape), choose a style, or add a reference image – all optional.",
  },
  {
    img: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstep_3.3fcfb0a5.jpeg&w=1920&q=75",
    title: "3. Generate and Download",
    description:
      "Click generate and get your image in seconds. Download in standard or HD quality.",
  },
];

const HowToGenerateSection = () => {
  return (
    <section className="howto-section">
      <div className="howto-container">
        <h2 className="howto-title">How to Generate AI Images</h2>
        <p className="howto-subtitle">
          Turn your text descriptions into images in seconds.
        </p>

        <div className="howto-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="howto-card">
              <img
                src={step.img}
                alt={step.title}
                className="howto-image"
              />
              <div className="howto-content">
                <h3 className="howto-step-title">{step.title}</h3>
                <p className="howto-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="howto-button">Try Now</button>
      </div>
    </section>
  );
};

export default HowToGenerateSection;
