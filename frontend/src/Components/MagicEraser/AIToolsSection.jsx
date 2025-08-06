import React from 'react';
import './cssMagicEraser/AIToolsSection.css';

const tools = [
  {
    title: 'Text-to-Image AI Generator',
    description: 'Create stunning AI-generated images from any text prompt instantly.',
    image: 'https://static.artguru.ai/_next/static/media/cover-1.10d234e6.png',
  },
  {
    title: 'AI Avatar Generator',
    description: 'Turn your selfies into trendy AI avatars in various styles, perfect for social media profiles.',
    image: 'https://static.artguru.ai/_next/static/media/cover-2.e66a62d6.png',
  },
  {
    title: 'AI Face Swapper',
    description: 'Instantly create funny or realistic face swaps in photos and videos.',
    image: 'https://static.artguru.ai/_next/static/media/cover-3.c83418ec.png',
  },
  {
    title: 'AI Headshot Generator',
    description: 'Creates polished, natural portraits ideal for LinkedIn, resumes and business profiles.',
    image: 'https://static.artguru.ai/_next/static/media/cover-4.17dc86ee.png',
  },
];

const AIToolsSection = () => {
  return (
    <div className="ai-tools-section">
      <h2>Discover More AI Tools</h2>
      <div className="ai-tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="ai-tool-card-magic">
            <img className='img-magic' src={tool.image} alt={tool.title} />
            <p className='title-name-magic'>{tool.title}</p>
            <p className='description-magic'>{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIToolsSection;
