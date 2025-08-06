// Accordion.jsx
import React, { useState } from 'react';
import './Accordion.css';
import open from '../open.svg'

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
      question: 'How can I improve image quality?',
      answer:
        "Enhancing your image quality is easy with Pica AI. You have 2 options: use Pica AI's online photo enhancer or download the app. Whether online or on the app, just upload your photo and click once. Pica AI's technology will enhance your photo automatically.",
    },
    {
      question: 'Is there a free photo enhancer?',
      answer: 'Yes! Pica AI s online photo enhancer offers free uses daily.',
    },
     {
      question: 'How do I fix low-resolution photos?',
      answer: 'Pica AIs image enhancer is effective for improving low-resolution photos. Upload your image, and our AI will work to enhance its quality and details. While results may vary for extremely low-quality images, Pica AI typically makes noticeable improvements, helping your photos look better than before.',
    },
    {
      question: 'Can I enhance photos to 4K resolution?',
      answer: 'Yes, our image enhancer supports up to 4K resolution enhancement. Your final image resolution will be 4 times larger than the original - for example, a 720p photo can be enhanced to close to 4K quality.',
    },
    {
      question: 'Can I enhance multiple pictures at once?',
      answer: 'Yes, our tool supports batch processing of up to 50 images simultaneously. Simply upload your photos and our system will automatically enhance them all. When the processing is complete, you can download all your enhanced images with a single click - no need to handle them one by one.',
    },

  ];

  return (
    <>
    <div className="accordion-container">
      <h1 className="accordion-title">FAQs</h1>
      <p className="accordion-subtitle">
        Have more questions? Email us at support@pica-ai.com.
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
