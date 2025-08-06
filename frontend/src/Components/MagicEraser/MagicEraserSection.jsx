import React, { useState } from 'react';
import './cssMagicEraser/MagicEraserSection.css';
import TestimonialCard from './TestimonialCard';
import Accordionremoveodject from './accordionremoveodject';
import AIToolsSection from './AIToolsSection';
import CallToAction from './CallToAction';
import Footer2 from '../AIImageGenerator/footer2'

const tagVideos = {
    'E-commerce': 'https://video.artguru.ai/showcases/removal_case_ecommerce.mp4',
    'Landscape': 'https://video.artguru.ai/showcases/removal_case_landscape.mp4',
    'Portrait': 'https://video.artguru.ai/showcases/removal_case_portrait.mp4',
    'Real Estate': 'https://video.artguru.ai/showcases/removal_case_indoor.mp4',
};

const MagicEraserSection = () => {
    const [selectedTag, setSelectedTag] = useState('E-commerce');

    return (
        <>
            <div className='magica45'>
                <div className="magic-eraser-section">
                    <div className='jusjkdn'>
                        <div className="text-content">
                            <p className='heding45'>
                                Remove Any Unwanted
                                Objects from Photos with AI
                                Magic Eraser
                            </p>
                            <p className="subheading45">
                                Erase any unwanted objects from your pictures with Artguru's free AI erasing tool. Simply upload your photo, then use our intuitive brush tool to paint over the elements you want gone. In seconds, Artguru's smart AI integrates the backdrop, making items disappear as if they were never there. For best results, slightly extend your brush strokes beyond the object's edges.
                            </p>
                            <button className="clean-up-button">
                                Clean Up Pictures Now
                            </button>

                        </div>

                        <div className="image-content">
                            <div className="tags">
                                {Object.keys(tagVideos).map((tag) => (
                                    <button
                                        key={tag}
                                        className={selectedTag === tag ? 'active' : ''}
                                        onClick={() => setSelectedTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>

                            <div className="image-wrapper45">
                                <video
                                    key={selectedTag}
                                    width="100%"
                                    autoPlay
                                    muted
                                // style={{ borderRadius: '12px' }}
                                >
                                    <source src={tagVideos[selectedTag]} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                <button className="clean-up-button2">
                                Clean Up Pictures Now
                            </button>
                            </div>

                        </div>
                    </div>

                    <div className='jusjkdn jurow'>
                        <div>
                        <div className="text-content">
                            <p className='heding45'>
                              Magically Remove Unwanted People from Photos
                            </p>
                            <p className="subheading45">
                               Have you ever taken a great photo, only to find someone accidentally popping into your background? With Artguru's Magic AI Eraser, you can easily remove the person from your photo, no blurs or weird patches. Unlike traditional tools, Artguru's Magic AI Eraser uses advanced inpainting technology to intelligently fill in the background after the removal. Just use our brush tool to paint over the unwanted person, and in seconds, you’ll have a flawless solo picture without any distractions.
                            </p>
                            <button className="clean-up-button">
                                Clean Up Pictures Now
                            </button>

                        </div>

                        <div className="image-content">
                            

                            <div className="image-wrapper45 juimg45">
                                <img src="https://static.artguru.ai/_next/static/media/showcase-2.e2763fed.webp" alt="" className='juimg45' />
                            </div>
                             <button className="clean-up-button2 jubutton23">
                                Clean Up Pictures Now
                            </button>
                        </div>
                    </div>
                    </div>

                    <div className='jusjkdn'>
                        <div className="text-content">
                            <p className='heding45'>
                                Easily Remove Unwanted Text from Images
                            </p>
                            <p className="subheading45">
                             For photography enthusiasts, designers, or anyone in search of visual purity, unwanted text in images can be a nuisance. Whether it’s marring perfect landscapes, adding unsightly camera date stamps, revealing personal details, or creating copyright issues, Artguru's Magic AI Eraser enables you to effortlessly remove any words, signs, logos, or handwriting. With this magic tool, you can clean up your photos in seconds and maintain focus where it truly belongs.
                            </p>
                            <button className="clean-up-button">
                                Clean Up Pictures Now
                            </button>

                        </div>

                        <div className="image-content">
                            

                            <div className="image-wrapper45 juimg452">
                                <img src="https://static.artguru.ai/_next/static/media/showcase-3.d23c37b6.webp" alt="" className='juimg45' />
                            </div>
                             <button className="clean-up-button2 jubutton2">
                                Clean Up Pictures Now
                            </button>

                        </div>
                    </div>

                      <TestimonialCard />
                      <Accordionremoveodject />
                    


                </div>
                <AIToolsSection/>
                <CallToAction />
                <Footer2 />






            </div>
        </>
    );
};

export default MagicEraserSection;
