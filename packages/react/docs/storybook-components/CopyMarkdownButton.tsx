import { useState } from 'react';
import { CopySmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Button } from '../../src/components/Button/Button';
import React from 'react';

export const CopyMarkdownButton = ({ to }: { to: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const response = await fetch(`llms/${to}.md`);
    const text = await response.text();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      {copied ? <TickSmallIcon /> : <CopySmallIcon />}
      Copy Markdown
    </Button>
  );
};
