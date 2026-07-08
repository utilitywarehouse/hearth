import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Hearth design system: token CSS variables, base component styles, and fonts.
import '@utilitywarehouse/hearth-tokens/css';
import '@utilitywarehouse/hearth-react/styles.css';
import '@utilitywarehouse/hearth-fonts/index.css';
import './styles.css';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
