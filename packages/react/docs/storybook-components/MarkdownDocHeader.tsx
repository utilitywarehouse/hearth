import React from 'react';
import { Flex } from '../../src/components/Flex/Flex';
import { CopyMarkdownButton } from './CopyMarkdownButton';
import { ViewMarkdownLink } from './ViewMarkdownLink';

interface MarkdownDocHeaderProps {
  title: string;
  to: string;
}

export const MarkdownDocHeader = ({ title, to }: MarkdownDocHeaderProps) => (
  <Flex justifyContent="between" alignItems="baseline">
    <h1>{title}</h1>
    <Flex gap="100">
      <CopyMarkdownButton to={to} />
      <ViewMarkdownLink to={to} />
    </Flex>
  </Flex>
);
