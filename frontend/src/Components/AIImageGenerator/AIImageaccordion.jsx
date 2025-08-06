import React, { useState } from 'react';
import './cssAIImageGenerator/AIImageaccordion.css'
import open from '../../open.svg';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mju'>
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
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
      question: 'What is an AI image generator?',
      answer:
        "An AI image generator is a tool that creates images based on your text descriptions. It uses artificial intelligence to understand your words and transform them into visual content, letting you create images without traditional design tools.",
    },
    {
      question: 'Are images created by an AI image generator unique?',
      answer: 'Each image is created based on your specific prompt, style choices, and reference images. While similar prompts might create similar results, you can always customize your inputs or use the editing tools to create something unique to you.',
    },
     {
      question: 'Can I use AI-generated images commercially?',
      answer: 'For non-subscribed users, generated images are for personal use only; subscribers can enjoy commercial usage rights, please refer to our terms of service for details.',
    },

  ];

  return (
    <>
    <div className="accordion-container">
      <h1 className="accordion-font2">Frequently Asked Questions</h1>
      <p className="accordion-subtitle">
       Have more questions? Contact support@artguru.ai.
      </p>
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
