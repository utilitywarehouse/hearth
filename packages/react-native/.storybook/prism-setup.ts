import Prism from 'prismjs';
import 'prismjs/components/prism-diff';
import 'prismjs/themes/prism.css';

// Function to escape HTML entities to prevent interpretation
const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// Function to manually highlight diff content
const highlightDiffContent = (element: Element) => {
  const content = element.textContent || '';
  const lines = content.split('\n');
  
  // Process each line and collect the HTML, keeping original structure
  const processedLines = lines.map((line) => {
    // Skip completely empty lines
    if (line.length === 0) {
      return '';
    }
    
    const escapedLine = escapeHtml(line);
    
    if (line.startsWith('-')) {
      return `<span class="token deleted">${escapedLine}</span>`;
    } else if (line.startsWith('+')) {
      return `<span class="token inserted">${escapedLine}</span>`;
    } else {
      return `<span class="token unchanged">${escapedLine}</span>`;
    }
  });
  
  // Join with newlines to preserve structure
  element.innerHTML = processedLines.join('\n');
};

// Function to process all diff blocks
const processDiffBlocks = () => {
  const diffBlocks = document.querySelectorAll('.language-diff:not(.diff-processed), .language-patch:not(.diff-processed)');
  diffBlocks.forEach((block) => {
    highlightDiffContent(block);
    block.classList.add('diff-processed');
  });
};

// Initialize Prism.js for diff highlighting
export const initializePrism = () => {
  // Ensure Prism is available globally for Storybook
  if (typeof window !== 'undefined') {
    (window as any).Prism = Prism;
    
    // Process diff blocks immediately
    setTimeout(processDiffBlocks, 100);
    
    // Set up a mutation observer to highlight new code blocks
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const diffBlocks = element.querySelectorAll('.language-diff:not(.diff-processed), .language-patch:not(.diff-processed)');
              if (diffBlocks.length > 0) {
                shouldProcess = true;
              }
              // Also check if the node itself is a diff block
              if ((element.classList.contains('language-diff') || element.classList.contains('language-patch')) && !element.classList.contains('diff-processed')) {
                shouldProcess = true;
              }
            }
          });
        }
      });
      
      if (shouldProcess) {
        setTimeout(processDiffBlocks, 10);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Also process on page navigation (for Storybook)
    window.addEventListener('popstate', () => {
      setTimeout(processDiffBlocks, 100);
    });
    
    // Process when hash changes (Storybook story navigation)
    window.addEventListener('hashchange', () => {
      setTimeout(processDiffBlocks, 100);
    });
  }
};

export default Prism;
