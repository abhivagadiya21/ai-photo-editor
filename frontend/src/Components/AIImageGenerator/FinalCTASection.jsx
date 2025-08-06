import React from 'react';
import './cssAIImageGenerator/FinalCTASection.css'; // Optional: your CSS file

const FinalCTASection = () => {
  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        <img src="https://static.artguru.ai/_next/static/media/func_footer.0512bc4f.jpg" alt="Art eyes" className="final-cta-image" />
        <h2 className="final-cta-heading">
          Start Creating with Artguru's AI Image Generator
        </h2>
        <p className="final-cta-subtext">
          Simple to use • Instant results • Endless possibilities
        </p>
        <button className="final-cta-button">Try Free Now</button>
      </div>
    </section>
  );
};

export default FinalCTASection;
