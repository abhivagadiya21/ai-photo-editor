import React, { useState } from 'react';
import './ImageStyleGenerator.css';

const portraitStyles = [
    { name: 'Anime', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%2526121e1cac0c88e9c39b5bc0a40d359230_512_512.webp&w=1080&q=100' },
    { name: 'Ghibli', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%252606e372730e6524bd3169a7325b47cafe_512_512.webp&w=1080&q=100' },
    { name: 'Cyberpunk', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%2526b22ba37c21af5b21a39da8ab33ef24b1_512_512.webp&w=1080&q=100' },
    { name: 'ID Photo', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%252605d2a56009faa0cf361b00e573b0afff_512_512.webp&w=1080&q=100' },
    { name: 'Photo Enhancer', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru-cdn.com%2Fimage%2Faigc%2F322e9a2b5b889c7fb9e17b7e1a991569_1800_1800.webp&w=1080&q=100' },
    { name: 'Portrait Of Art', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru-cdn.com%2Fimage%2Faigc%2Fe2b6e062a0d62c7f1e4c5ad6769c8b3b_1024_1024.webp&w=1080&q=100' },
    { name: 'Cartoon', img: 'https://img-sign.ai-resource-cdn.com/console/p/ea74de599c6042711c5ba95b0b02ac8d_512_512.webp?Expires=4865485765&Signature=f42aboQKKkIFNQ5MI56BGwnweD~kDnRSYYCGPM2FMlAxvNaBk3nLA7uUkDCdb-fFX17HxoZ5cESzm0s7~RC7xHoxX6mfTesJHUXOAd13E2IlUcpXSx2nl~qbky8hiKOlYtvKoNVcDGfUjtH5BSbNCM5xLyLa-Q1zd~E5W32q~lIqHTpOkofJ5FyqA3np0CqVBVnxqIu0r1qJuI7QzL1YcC05dfudhKh4t9HNYWts6uAmH-FNf0hef-UUe31Vvqi00LlZO-Sqe9Ohx8RLegk~jjBny-GE9wz5kL4cf3Hd822cfq1qp9txj0YdtVdXbyT1Hm-1cRHjj1VM2Zk6L7PrbQ__&Key-Pair-Id=K25UTX3UY9PG89' },
    { name: 'Barbie', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru-cdn.com%2Fimage%2Faigc%2F6b5af07149020f74915fe2de370384c1_1024_1024.webp&w=1080&q=100' },
    { name: 'Fantasty 3D', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%2526caf93ca0e55499e6b2a366eee69a0583_512_512.webp&w=1080&q=100' },
    { name: 'Van Gogh', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%2526f9486be69e3bf132ef565a6ce0a9e339_512_512.webp&w=1080&q=100' },
    { name: 'Oil Painting', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fconsole%2526p%2526bb048fbb82aae94a4141fbc64bc87558_512_512.webp&w=1080&q=100' },
];

const sceneryStyles = [
    { name: 'Van Gogh', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru-cdn.com%2Fimage%2Faigc%2Fa14efd43e715ff67ff622c19273f8927_1024_1024.jpeg&w=1080&q=100' },
    { name: 'Landscape', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru.ai%2Fimage%2Faigc%2Fapp%2526p%2526ff6d0846f6ab22f64fd2d4ee97f17c36.webp%3Fexpires%3D4863737553&w=1080&q=100' },
    { name: 'Oil Painting', img: 'https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fimg.artguru-cdn.com%2Fimage%2Faigc%2Fa7e3833d8fe97194f7779598ec762f27_2048_2048.webp&w=1080&q=100' },
];

const ImageStyleGenerator = () => {
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [previewImage, setPreviewImage] = useState('/preview/user-id.jpg');

    const handleStyleSelect = (styleName) => {
        const foundStyle =
            portraitStyles.find(style => style.name === styleName) ||
            sceneryStyles.find(style => style.name === styleName);

        if (foundStyle) {
            setSelectedStyle(foundStyle);
            setPreviewImage(foundStyle.img);
        }
    };

    return (
        <div className="generator-container">
            <div className="generator-left">
                <div className="upload-box12">
                    <p className='text-color12'><span><img src="https://www.artguru.ai/_next/image/?url=https%3A%2F%2Fstatic.artguru.ai%2F_next%2Fstatic%2Fmedia%2Ficon-upload.56b4f747.png&w=64&q=75" alt="" /></span> Upload Image Here </p>
                </div>

                <p className='font12'>Choose Style</p>

                <div className="style-section">
                    <h5>Portrait Style</h5>
                    <div className="style-slider">
                        {portraitStyles.map(style => (
                            <div
                                key={style.name}
                                className={`style-item ${selectedStyle?.name === style.name ? 'selected' : ''}`}
                                onClick={() => handleStyleSelect(style.name)}
                            >
                                <img src={style.img} alt={style.name} />
                                <span>{style.name}</span>
                            </div>
                        ))}
                    </div>

                    <h5>Scenery Style</h5>
                    <div className="style-grid">
                        {sceneryStyles.map(style => (
                            <div
                                key={style.name}
                                className={`style-item ${selectedStyle?.name === style.name ? 'selected' : ''}`}
                                onClick={() => handleStyleSelect(style.name)}
                            >
                                <img src={style.img} alt={style.name} />
                                <span className='img-name'>{style.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <input type="text" className="custom-prompt" placeholder="Custom Prompt" />
                <button className="generate-button13" disabled>Generate</button>
            </div>

            <div className="generator-right">
                <img src={previewImage} alt="Preview" className="preview-image" />
            </div>
        </div>
    );
};

export default ImageStyleGenerator;
