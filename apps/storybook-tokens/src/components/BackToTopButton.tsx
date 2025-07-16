import { Button } from '@utilitywarehouse/hearth-react';
import { ChevronUpSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
  }, []);

  return (
    <div className="sb-unstyled">
      <Button
        onClick={scrollToTop}
        variant="ghost"
        colorScheme="grey"
        size="sm"
        style={{
          display: visible ? 'flex' : 'none',
          maxWidth: 160,
          position: 'fixed',
          width: '100%',
          right: 16,
          bottom: 40,
          height: 20,
          zIndex: 99,
          cursor: 'pointer',
        }}
      >
        <ChevronUpSmallIcon />
        Back to top
      </Button>
    </div>
  );
};

export default ScrollButton;
