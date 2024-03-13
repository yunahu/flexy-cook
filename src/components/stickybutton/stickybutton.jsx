import React, { useState, useEffect } from 'react';
import { RiArrowUpSLine } from 'react-icons/ri';

const StickyButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div style={{ position: 'fixed', bottom: '20px', right: '0px', zIndex: '1000' }}>
          <button onClick={scrollToTop} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',backgroundColor:'var(--light-primary)',width:'60px',borderRadius:'5px 5px 5px 5px' }}>
            <RiArrowUpSLine size={28} /> 
            Back to Top
          </button>
        </div>
      )}
    </>
  );
};

export default StickyButton;
