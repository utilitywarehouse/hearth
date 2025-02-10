import { BodyText, Pressable } from '../../src';
import React, { useState } from 'react';
import { Platform } from 'react-native';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <div className="sb-unstyled">
      <Pressable
        onPress={scrollToTop}
        style={{
          display: visible ? 'flex' : 'none',
          maxWidth: 220,
          ...(Platform.OS === 'web'
            ? {
                position: 'fixed',
                width: '100%',
                right: 10,
                bottom: 40,
                height: 20,
                zIndex: 1,
                cursor: 'pointer',
              }
            : {}),
        }}
      >
        {/* <ButtonIcon as={ChevronUpSmallIcon} /> */}
        <BodyText>Back to top</BodyText>
      </Pressable>
    </div>
  );
};

export default ScrollButton;
