import { Button, ButtonIcon, ButtonText } from '../../src';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { ChevronUpSmallIcon } from './icons';

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
      <Button
        onPress={scrollToTop}
        variant="ghost"
        colorScheme="grey"
        size="sm"
        // @ts-expect-error - This is a playground
        style={{
          display: visible ? 'flex' : 'none',
          maxWidth: 160,
          ...(Platform.OS === 'web'
            ? {
                position: 'fixed',
                width: '100%',
                right: 16,
                bottom: 40,
                height: 20,
                zIndex: 99,
                cursor: 'pointer',
              }
            : {}),
        }}
      >
        <ButtonIcon as={ChevronUpSmallIcon} />
        <ButtonText>Back to top</ButtonText>
      </Button>
    </div>
  );
};

export default ScrollButton;
