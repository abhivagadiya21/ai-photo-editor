import React, { useState } from 'react';
import './ArtStylesSection.css';

const styles = [
  { name: 'Oil Painting', key: 'oil', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-1.b0b9f527.png&w=1920&q=75',] },
  { name: 'Watercolor', key: 'watercolor', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-2.f621d436.png&w=1920&q=75',] },
  { name: 'Sketch', key: 'sketch', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-3.dc7deaa9.png&w=1920&q=75',] },
  { name: 'Cartoon', key: 'cartoon', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-4.76b8e0bf.png&w=1920&q=75',] },
  { name: 'Concept Art', key: 'concept', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-5.d93ea1d5.png&w=1920&q=75',] },
  { name: 'Cyberpunk', key: 'cyberpunk', images: ['https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Fstyle-6.fe01165c.png&w=1920&q=75, '] },
];

const descriptions = {
  oil: {
    title: 'Transform Photo into Oil Painting',
    text: `Transform your photos into stunning oil paintings effortlessly with Artguru AI's painting generator. Whether you desire the elegance of Renaissance or the charm of Impressionist art, this powerful AI tool replicates the texture and brushwork of classic oil paintings, enabling you to achieve the desired oil painting effect on your portraits or vintage landscapes.
`,
  },
  watercolor: {
    title: 'Turn Photo into Watercolor',
    text: 'Elevate your photos with the fresh and vibrant beauty of watercolor paintings using Artguru AI. Experience the brilliance of colors and unique brushstrokes as AI meticulously enhances your images to match the skills of a professional master painter. With just a few clicks, Artguru AI enables you to add stunning watercolor effects to your pictures.',
  },
  sketch: {
    title: 'Turn Photo into Sketch',
    text: 'Turn your photos into captivating line drawings with Artguru AI s advanced technology. The AI art generator captures the essence of your images and creates intricate sketches that emphasize outlines and distinctive features. Whether you want to transform portraits, landscapes, or any other picture into striking line art, this remarkable AI image generating tool delivers precise and detailed results.',
  },
  cartoon: {
    title: 'Transform Photo into Cartoon',
    text: 'Transform your photos into adorable cartoons effortlessly with Artguru AI. Our AI-driven process guarantees precise rendering and high-quality results in caricaturing your photos. Try the Artguru AI anime generator now to create cute and fun caricatures or simply make a cartoon avatar of yourself.',
  },
  concept: {
    title: 'Create Concept Art from Photo',
    text: 'Unleash your imagination and transform your ideas into visual masterpieces with Artguru AI. Whether you re designing characters, environments, or entire worlds, our AI empowers you to create stunning concept art. With its user-friendly interface and powerful algorithms, Artguru AI makes the process of art creation intuitive and enjoyable.',
  },
  cyberpunk: {
    title: 'Transform Photo into Cyberpunk Style',
    text: 'Immerse yourself in a cyberpunk futuristic world with Artguru AI. Our advanced algorithms analyze your photos and add cyberpunk elements such as holographic displays, futuristic architecture, and vibrant lighting effects. Experience the neon cityscapes, dystopian environments, and futuristic elements that define the cyberpunk genre with Artguru AI-generated images.',
  },
};

const ArtStylesSection = () => {
  const [selected, setSelected] = useState('oil');
  const current = styles.find((s) => s.key === selected);
  const desc = descriptions[selected];

  return (
    <section className="art-section">
      <h2 className="art-title">A Variety of Artistic Styles Powered By AI</h2>
      <p className="art-subtitle">
        Artguru's photo to AI art generator offers a diverse collection of styles inspired by various artistic genres and renowned artists.
        It constantly expands its repertoire to provide new and exciting creative possibilities.
      </p>

      <div className="style-buttons">
        {styles.map((style) => (
          <button
            key={style.key}
            className={`style-button ${selected === style.key ? 'active' : ''}`}
            onClick={() => setSelected(style.key)}
          >
            {style.name}
          </button>
        ))}
      </div>

      <div className="art-content">
        <div className="art-gallery">
          <img src={current.images[0]} alt="" className="large-img" />
        </div>

        <div className="art-text">
          <p className="art-text-title">{desc.title}</p>
          <p className="art-description">{desc.text}</p>
          <button className="generate-button">Generate Now</button>
        </div>
      </div>
    </section>
  );
};

export default ArtStylesSection;
