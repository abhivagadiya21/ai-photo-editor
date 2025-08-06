// Accordion.jsx
import React, { useState } from 'react';
import './cssMagicEraser/accordionremoveodject.css';
import open from '../../open.svg';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mju'>
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header85" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-question">{question}</span>
       <span className="accordion-arrow">
  <img
    src={open}
    className={`accordion-icon ${isOpen ? 'rotate-up' : 'rotate-down'}`}
    alt="arrow"
  />
</span>

      </div>
      {isOpen && <div className="accordion-answer">{answer}</div>}
    </div>
    </div>
  );
};

const Accordion = () => {
  const faqs = [
    {
      question: '1. What is the AI Magic Eraser and how does it work?',
      answer:
        "The AI Magic Eraser uses advanced inpainting technology along with AI to seamlessly remove any unwanted objects from your photos. It intelligently fills in the background where things were removed to make it look natural, like those objects were never there.",
    },
    {
      question: '2. What can I use this tool to clean up in my photos?',
      answer: 'You can remove people, objects, text, logos, blemishes, and other distractions from your images.',
    },
     {
      question: '3. How can I get the best cleanup results?',
      answer: 'For the smoothest removal, slightly paint beyond the edges of the object you want remove.',
    },
    {
      question: '4. What are some reasons to remove objects from photos?',
      answer: 'There are a few main reasons to remove things from your photos: First, to make the picture look better by removing background distractions. People or objects can take away from the main subject. Second, for editing photos of people. You can remove pimples, wrinkles or stray hairs to make them look their best. Third, to make one thing stand out. By removing the background, you highlight the main object. Great for product shots or graphics.',
    },

  ];

  return (
    <>
    <div className="accordion-container85">
      <h1 className="accordion-title">AI Magic Object Eraser FAQs</h1>
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} {...faq} />
      ))}
    </div>

    <div>
  

    </div>

    

    </>
  );
};

export default Accordion;
