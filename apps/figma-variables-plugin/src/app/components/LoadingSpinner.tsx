import { Text } from '@utilitywarehouse/web-ui';
import React from 'react';

const LoadingSpinner = ({ text, overlay = false }) => {
  return (
    <div className={`spinner-container ${overlay ? 'overlay' : ''}`}>
      <div className="loading-spinner"></div>
      {!!text && <Text>{text}</Text>}
    </div>
  );
};
export default LoadingSpinner;
