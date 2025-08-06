import React from 'react';
import './AIMagicTools.css';

const tools = [
  {
    title: "AI Image Generator from Text",
    desc: "Create AI images from a text description.",
    image: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fdisc-4.65afb680.png&w=1920&q=75",
  },
  {
    title: "AI Avatar & Portrait Generator",
    desc: "Create perfect AI avatars from your own selfies.",
    image: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fdisc-2.1ffb8964.png&w=1920&q=75",
  },
  {
    title: "AI Face Swapper",
    desc: "Effortlessly swap faces in your photos with AI.",
    image: "https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fdisc-3.c541ff9e.png&w=1920&q=75",
  },
];

const AIMagicTools = () => {
  return (
    <section className="ai-tools-section">
      <h2 className="ai-tools-title">Discover More AI Magic Tools</h2>
      <div className="ai-tools-container">
        {tools.map((tool, index) => (
          <div className="ai-tool-card" key={index}>
            <img src={tool.image} alt={tool.title} className="ai-tool-image" />
            <h3 className="ai-tool-heading">{tool.title}</h3>
            <p className="ai-tool-description">{tool.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIMagicTools;
