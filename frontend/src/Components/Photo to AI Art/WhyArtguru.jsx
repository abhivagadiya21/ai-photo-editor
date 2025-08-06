import React from 'react';
import './WhyArtguru.css';

const features = [
  {
    icon: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Ficon-1.dd1bb1c6.png&w=128&q=75', 
    title: 'Easy and Fast',
    description:
      'Experience the swift conversion of your photo into captivating AI art with just one click using our user-friendly image-to-AI art generator.',
  },
  {
    icon: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Ficon-2.caf1f4ad.png&w=128&q=75',
    title: 'Variety of Styles',
    description:
      'Artguru diverse styles inspired by various artistic genres and artists, constantly expanding its collection for fresh and exciting creative options.',
  },
  {
    icon: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Ficon-3.e21ad84c.png&w=128&q=75',
    title: 'Cloud-Based',
    description:
      'Accessible on any device, Artguru operates in the cloud. All your generated images are securely saved in your personal creation section.',
  },
  {
    icon: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Ficon-4.b91552a9.png&w=128&q=75',
    title: 'Updated AI Model',
    description:
      'The Artguru team continuously trains and updates our AI model to ensure the best possible results for our users.',
  },
];

const WhyArtguru = () => {
  return (
    <section className="why-section">
      <h2 className="why-heading">Why Artguru Image to AI Art Generator</h2>
      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <img src={item.icon} alt={item.title} className="why-icon" />
            <h3 className="why-title">{item.title}</h3>
            <p className="why-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyArtguru;
