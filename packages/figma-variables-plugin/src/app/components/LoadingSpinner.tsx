import { Text } from '@utilitywarehouse/web-ui';
import React from 'react';

const LoadingSpinner = ({ text }) => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
      {!!text && <Text>{text}</Text>}
    </div>
  );
};
export default LoadingSpinner;
