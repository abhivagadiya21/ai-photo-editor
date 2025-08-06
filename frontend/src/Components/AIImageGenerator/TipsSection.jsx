import React from "react";
import "./cssAIImageGenerator/TipsSection.css";

const tips = [
  {
    title: "Start Simple or Add Details",
    description:
      'For simple images, short prompts work fine (like "a cute dog"). Want something specific? Add more details like "a golden retriever playing in a garden with autumn leaves".',
    image: "https://static.artguru.ai/_next/static/media/tips_1.a7b27fc8.jpg",
  },
  {
    title: "Try Using Reference Image",
    description:
      "Upload similar images to help AI image generator understand the style or look you're looking for. This is especially helpful when words are hard to describe what you want.",
    image: "https://static.artguru.ai/_next/static/media/tips_2.4e57b661.jpg",
  },
  {
    title: "Learn from Your Results",
    description:
      "If you like parts of the generated image but want to change others, keep the working parts of your prompt and only modify what needs improvement. This simple approach helps you create better prompts over time.",
    image: "https://static.artguru.ai/_next/static/media/tips_3.facdbd00.jpg",
  },
];

const TipsSection = () => {
  return (
      <section className="tips-section">
      <div className="tips-container">
        <h2 className="tips-title">3 Simple Tips for Generating Better AI Images</h2>

        <div className="tips-list">
          {tips.map((tip, index) => (
            <div className="tip-card" key={index}>
              <div className="tip-text">
                <h3 className="tip-heading">{tip.title}</h3>
                <p className="tip-description">{tip.description}</p>
              </div>
              <div className="tip-image-container">
                <img src={tip.image} alt={tip.title} className="tip-image" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsSection;
