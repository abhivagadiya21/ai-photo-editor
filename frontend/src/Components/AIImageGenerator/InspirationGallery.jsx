import React, { useState } from 'react';
import './cssAIImageGenerator/InspirationGallery.css';
import ImagePromptPopup from './ImagePromptPopup';
import { useGlobalState, useGlobalDispatch } from '../../Components/GlobalStateContext';


const styles = [
    {
        prompt: 'Logo, minimalist style shape, brand logo for a luxury skincare company with the name "Nura" written in a large and elegant font. The background is a muted grey or olive green to create an inviting yet sophisticated atmosphere. The design is a solid background color, simple, modern, and professional - no realistic photo details.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%267714573dc4a41d5be7582ae9454c2e77_1024_1024.webp'
    },
    {
        prompt: 'A bottle of powdered skin care product stands on a separate background, surrounded by moss, creating an atmosphere of freshness. The soft light illuminates its elegant shape, highlighting such details. This scene creates a minimalistic and at the same time modern aesthetic that emphasizes the quality and manufacturability of each skin care product. the background is made in muted yellow tones, on the one hand there are lemons, patchouli and musk, on the other - freesia and vanilla, jasmine flowers are adjacent to each other ar 3:4',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26c95ea0c24129a2356ea801d774df2094_1024_1024.webp'
    },
    {
        prompt: 'Beautifiul blonde with lower back tattoo,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%264a6774a23beb845497c3b0a2cd395ac0_896_1152.webp'
    },
    {
        prompt: 'The shadow of a hand is projected on paper, creating an abstract art piece. The light shines through the window onto it, casting delicate shadows and highlighting its form. The style is dark beige and gray, with muted tones of light and shadow. The image shows a close-up shot of a perfume, set against a minimalist background.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26e3f877ba6fe69fa90cbde175585d3fce_1024_1024.webp'
    },
    {
        prompt: 'A beautiful woman wearing an elegant qipao, leaning over the edge of a table with one leg resting on it, her hair cascading down in loose waves, her eyes sparkling and captivating as she gazes at the viewer, in the style of Artgerm, Yoji Shinkawa, and Akihiko Yoshida, in a fantasy art style.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26eaf6e9106a888109dbd2924e788c5daa_896_1152.webp'
    },
    {
        prompt: 'Create a movie cover for Grandma Terminator, featuring a classic sweet-looking grandmother holding a bazooka. Grandma stands tall. pink studio background. studio light.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26019c707d500fb9ae2f4cfb721b345a9b_896_1152.webp'
    },
    {
        prompt: 'Aesthetically simple one bold tribal-styled line tattoo of simple tiny small little tribal-styled jellyfish, on female wrist, the person is in a tattoo studio,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%263ff3a7fc263ae2c71e358e318792947c_896_1152.webp'
    },
    {
        prompt: 'A beautiful blonde with long wavy hair, wearing red lipstick, in a high-resolution picture with beautiful lighting, as if for a hairdressers advertisement. The background is pure white, angelic vibes, professional studio photography, charming cinematic beauty,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26a712fea780c11cc2f471836ffdc9d646_1024_1024.webp'
    },
    {
        prompt: 'Minimalist living room with a blank white frame on a light gray wall, surrounded by potted plants and a cozy sofa, 8K,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%2665376b8e4040cfa0b131ba55072fd330_896_1152.webp'
    },
    {
        prompt: 'A piece of fresh mango is cut into small pieces, two workers push the cart near, the color is mainly yellow, mainly solid color, small fruit slices and workers close-up. Close up, high definition detail showing the texture of fruit slices, miniature food photography,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%260b107de8a3f8e06aac621e5b7151b6e3_896_1152.webp'
    },
    {
        prompt: '"Design a sleek and professional logo for MINGO DESIGNS, an epoxy flooring company. Use sophisticated, modern typography for the text MINGO DESIGNS, with a minimalistic and stylized flamingo subtly incorporated into the design. The flamingo should feel refined, not playful, to evoke a tropical yet professional atmosphere. Avoid bright or childlike elements, focusing on a clean, mature, and eye-catching design with a hint of tropical elegance.",',
        img: 'https://img.artguru.ai/image/aigc/console%26p%267164e42c55cbc0292984db1dcdcbcf30_1024_1024.webp'
    },
    {
        prompt: 'A beautiful Korean woman in her 30s with long, wavy hair and soft bangs, sitting by a window and holding a coffee cup. She has a calm and contemplative expression as she gazes thoughtfully outside. The warm, natural light streaming through the window highlights her delicate features and creates a cozy, intimate atmosphere. She is dressed in a light, comfortable outfit, including a soft cardigan layered over a blouse, adding a sense of relaxation and elegance to the scene. The background is blurred, keeping the focus on her serene presence in this quiet, peaceful moment. The natural lighting adds a soft glow to her face, emphasizing the tranquil and reflective mood. Shot in the style of a Canon EOS R6 Mark II Mirrorless, capturing fine details and a soft, natural light for a warm and inviting atmosphere.cinematic',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26666482539915f87c757d1b0b263a435b_896_1152.webp'
    },
    {
        prompt: 'Young male/female couple in their own very stylish room, Male-female couple with wide-eyed amazement, emo, Emo color Manga style, Simple Manga, Japanese Manga, flat colors,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26dfd0ae2da53fb1b26d6df5eb192ec4d3_896_1152.webp'
    },
    {
        prompt: 'A girl 16 years old, light brown curly hair, silver eyes, tall, a little fat, wearing a uniform blue jacket with naruto pins and a black skirt, red converse all stars, a little scar on her chin, light skin, smile with dimples, hight details, a glamping in background',
        img: 'https://img.artguru.ai/image/aigc/console%26p%26d3c0de9567e71d954d1ffe2886e5d5fd_1024_1024.webp'
    },
    {
        prompt: 'Modernist-style Dynamic Dimensions trend collages combining different visual elements; a fashionable bald strong man 40 year old with little beard among wildly diverse types of content come to create playful, high-energy, big-impact visuals in a virtual beautiful world; illustration concept, open eyes in camera',
        img: 'https://img.artguru.ai/image/aigc/console%26p%262d1dea8e6c1102fbfbadbd277998bf44_896_1152.webp'
    },
    {
        prompt: 'Ein Logo für ein Projekt mit dem Namen Domizil, welches die Evaluation und Implementierung einer zukunftsfähigen IT-Lösung für die Digitalisierung der Kernprozesse der Fachstelle Gemeinnütziger Wohnungsbau der Stadt Zürich zum Ziel hat.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%264144f4af4896c01f8c7d95b5d8e5188f_1024_1024.webp'
    },
    {
        prompt: 'Realistic photoshoot in the style of vogue. epic wide symmetrical centered shot of female devil statue in latex bodysuit, red backlight, minimal aesthetic, dark aesthetic, insane detail texture, hyper realistic, movie poster aesthetic, ARRIFLEX 35 BL Camera, Canon K35 Prime Lenses,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%267cc3a9fa08bb2defb4eee910f22efe1f_896_1152.webp'
    },
    {
        prompt: 'A fashionable European and American model, dressed in blue and yellow fashion outfits, holding a deep blue dog leash in her left hand, dragged by a dog on the road, front view, solid color background,',
        img: 'https://img.artguru.ai/image/aigc/console%26p%2698dd7a5c3e57281274600e5944f8c038_896_1152.webp'
    },
    {
        prompt: 'A minimalistic logo for a rug company called "rugcrisp", in a futuristic style, flat colors, no shadows, no gradients, the background is white.',
        img: 'https://img.artguru.ai/image/aigc/console%26p%269efcc8d2508371ca95b3eb8ab068e006_1024_1024.webp'
    },
    {
        prompt: 'A man character with shirt and pants in fight pose facing an enormous octopus like creature emerging from the water, by Craig Mullins, digital painting, high resolution, high quality, 4k',
        img: 'https://img.artguru.ai/image/aigc/console%26p%260466aeabee2f17f5e046143eb0ad0f57_896_1152.webp'
    },

];

const GalleryCard = ({ image, prompt, onClick }) => {
    return (
        <div className="gallery-card" onClick={onClick}>
            <img src={image} alt="AI Inspiration" className="gallery-image" />
            <div className="prompt-overlay">
                <p className="prompt-text">{prompt}</p>
            </div>
        </div>
    );
};


const InspirationGallery = () => {
    const { promptText } = useGlobalState();
    const dispatch = useGlobalDispatch();

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPrompt, setSelectedPrompt] = useState('');
     const [isPromptPopupOpen, setIsPromptPopupOpen] = useState(false);



    const handleCardClick = (image, prompt) => {
        setSelectedImage(image);
        setSelectedPrompt(prompt);
    };
    return (
        <>
            <div className="gallery-wrapper">
                <h2 className="gallery-title">Inspiration Gallery</h2>
                <p className="gallery-subtitle">See what's possible with our AI</p>

                <div className="masonry">
                    {styles.map((style, index) => (
                        <GalleryCard
                            key={index}
                            image={style.img}
                            prompt={style.prompt}
                            onClick={() => handleCardClick(style.img, style.prompt)}
                        />
                    ))}
                </div>

            </div>


            <ImagePromptPopup
                image={selectedImage}
                prompt={selectedPrompt}
                onClose={() => setSelectedImage(null)}
                onPromptClick={(text) => {
                    console.log(text)
                    dispatch({ type: 'SET_PROMPT', payload: text });
                    setIsPromptPopupOpen(false);
                }}
            />
        </>
    );
};

export default InspirationGallery;