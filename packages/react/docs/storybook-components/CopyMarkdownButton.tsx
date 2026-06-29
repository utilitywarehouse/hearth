import { useEffect, useRef, useState } from 'react';
import { CopySmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Button } from '../../src/components/Button/Button';

export const CopyMarkdownButton = ({ to }: { to: string }) => {
  const [copied, setCopied] = useState(false);
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      const response = await fetch(`llms/${to}.md`);
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timeoutId.current) window.clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Swallow errors to avoid unhandled rejections (e.g. clipboard permissions)
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleCopy}>
      {copied ? <TickSmallIcon /> : <CopySmallIcon />}
      {copied ? 'Copied' : 'Copy Markdown'}
    </Button>
  );
};
