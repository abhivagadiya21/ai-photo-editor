import React, { useRef } from 'react';
import './cssAIImageGenerator/AIImageGenerator.css';
import scrollLeft from './left.svg'
import scrollRight from './right.svg'

const styles = [
  { label: 'Default', img: 'https://img.artguru.ai/image/aigc/console%26p%2672f29cbc790d080794771d5407093194_240_240.webp' },
  { label: 'Realism', img: 'https://img.artguru.ai/image/aigc/app%26p%2601a744e64bbddd628587dbce8c3186db.webp?expires=4864953168' },
  { label: 'Anime', img: 'https://img.artguru.ai/image/aigc/console%26p%26343f03847d1059cf94d03b0769ce591e_240_240.webp' },
  { label: 'Ghibli', img: 'https://img.artguru.ai/image/aigc/console%26p%26a678eb82807ed2edd00315a642c0b0a2_240_240.webp' },
  { label: 'Cartoon', img: 'https://img.artguru.ai/image/aigc/console%26p%26069de5f71e63ac8515890e98ad8615bd_240_240.webp' },
  { label: 'ID Photo', img: 'https://img.artguru.ai/image/aigc/console%26p%266499b969df1c1483493cb8e60e195161_240_240.webp' },
  { label: 'Tattoo', img: 'https://img.artguru.ai/image/aigc/console%26p%268b689fc326b4fbb214a0a0d2c180dc15_240_240.webp' },
  { label: 'Sketch', img: 'https://img.artguru.ai/image/aigc/console%26p%263a11e010f33443bebd0a8e1d397bbca3_240_240.webp' },
  { label: 'Fantasy 3D', img: 'https://img.artguru.ai/image/aigc/console%26p%2665588cf3d1d5fcb2e9fc8480d7e72fbd_240_240.webp' },
  { label: 'Cyberpunk', img: 'https://img.artguru.ai/image/aigc/console%26p%26cef36934cbdb13e34878c2dd7b076952_240_240.webp' },
  { label: 'Oil Painting', img: 'https://img.artguru.ai/image/aigc/console%26p%26e51408b54684e38c7847245d6044c47a_240_240.webp' },
  { label: 'Landscape', img: 'https://img.artguru.ai/image/aigc/console%26p%26cf0755c7d5ee5b6ee21788e1e6abe368_240_240.webp' },
  { label: 'Van Gogh', img: 'https://img.artguru.ai/image/aigc/console%26p%26f0f0e816f74252467efa4a05184b4c5d_240_240.webp' },
];

const AIImageGenerator = () => {
  const sliderRef = useRef(null);

  const handleScroll = (dir) => {
    if (!sliderRef.current) return;
    const scrollAmount = dir === 'left'
      ? -sliderRef.current.clientWidth / 2
      : sliderRef.current.clientWidth / 2;

    sliderRef.current.scrollTo({
      left: sliderRef.current.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="slider-container">
      <button className="nav-button" onClick={() => handleScroll('left')}><img  className=' right-svg' src={scrollLeft}/></button>

      <div className="style-slider2" ref={sliderRef}>
        {styles.map((style, index) => (
          <div className={`style-tab ${index === 0 ? 'active' : ''}`} key={style.label}>
            <img src={style.img} alt={style.label} className="style-img" />
            <span>{style.label}</span>
          </div>
        ))}
      </div>

      <button className="nav-button " onClick={() => handleScroll('right')}><img  className=' right-svg rsvg' src={scrollLeft}/></button>
    </div>
  );
};

export default AIImageGenerator;
