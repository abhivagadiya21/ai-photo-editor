import React from 'react';
import './cssMagicEraser/TestimonialCard.css';

const TestimonialCard = () => {
  return (
    <div className='testimonial-container'>
    <div className="testimonial-card">
      <h3 className='testimonial-card-h3'>Save My Instagram Posts!</h3>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p>
        I'm always snapping selfies for my IG, and Artguru's AI Eraser is a lifesaver for cleaning up
        those random heads, bodies, or even...
      </p>
    </div>

     <div className="testimonial-card">
      <h3 className='testimonial-card-h3'>Impressed with the Quality</h3>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p>
       I've tried other tools before, but they always left blurry, unnatural lines. Artguru's AI Eraser is different—it quickly cleaned up my photo...
      </p>
    </div>
    <div className="testimonial-card">
      <h3 className='testimonial-card-h3'>Save My Instagram Posts!</h3>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p>
        I'm always snapping selfies for my IG, and Artguru's AI Eraser is a lifesaver for cleaning up
        those random heads, bodies, or even...
      </p>
    </div>
    </div>
  );
};

export default TestimonialCard;
