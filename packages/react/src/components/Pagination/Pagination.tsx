import * as React from 'react';
import clsx from 'clsx';
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  SkipFirstSmallIcon,
  SkipLastSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { Button } from '../Button/Button';
import { BodyText } from '../BodyText/BodyText';

import type { PaginationProps } from './Pagination.props';

const COMPONENT_NAME = 'Pagination';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

const ELLIPSIS = '...';
const MAX_VISIBLE_ITEMS = 8;

/**
 * Generates the array of page numbers and ellipsis to display
 * Max visible items is 8 (including ellipses)
 */
const generatePageNumbers = (
  currentPage: number,
  totalPages: number
): Array<number | typeof ELLIPSIS> => {
  // If total pages fit within max visible items, show all
  if (totalPages <= MAX_VISIBLE_ITEMS) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: Array<number | typeof ELLIPSIS> = [];

  // Always show first page
  pages.push(1);

  // Determine if current page is close to start or end
  const isNearStart = currentPage <= 4;
  const isNearEnd = currentPage >= totalPages - 3;

  if (isNearStart) {
    // Near the beginning: Show first and last pages
    pages.push(2, 3, 4);
    pages.push(ELLIPSIS);
    pages.push(totalPages - 2, totalPages - 1);
  } else if (isNearEnd) {
    // Near the end: Show first and last pages
    pages.push(2, 3);
    pages.push(ELLIPSIS);
    pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
  } else {
    // In the middle: Show first page, surrounding pages, and last page
    pages.push(ELLIPSIS);
    pages.push(currentPage - 1, currentPage, currentPage + 1);
    pages.push(ELLIPSIS);
  }

  // Always show last page
  pages.push(totalPages);

  return pages;
};

export const Pagination: React.FC<PaginationProps> = props => {
  const {
    className,
    currentPage,
    totalPages,
    onPageChange,
    condensed = false,
    skip = true,
    as: Component = 'div',
    ...paginationProps
  } = extractProps(props, marginPropDefs);

  const pages = generatePageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleFirst = () => {
    if (currentPage !== 1) {
      onPageChange(1);
    }
  };

  const handleLast = () => {
    if (currentPage !== totalPages) {
      onPageChange(totalPages);
    }
  };

  return (
    <Component
      aria-label="pagination"
      className={clsx(componentClassName, className)}
      {...paginationProps}
    >
      <div className={`${componentClassName}Container`}>
        <div className={`${componentClassName}Controllers`}>
          {skip && (
            <UnstyledIconButton
              label="Go to first page"
              onClick={handleFirst}
              disabled={currentPage === 1}
            >
              <SkipFirstSmallIcon />
            </UnstyledIconButton>
          )}

          <UnstyledIconButton
            label="Go to previous page"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            <ChevronLeftSmallIcon />
          </UnstyledIconButton>
        </div>

        {condensed ? (
          <BodyText size="md" color="primary">
            Page {currentPage} of {totalPages}
          </BodyText>
        ) : (
          <div className={`${componentClassName}Pages`}>
            {pages.map((page, index) => {
              if (page === ELLIPSIS) {
                return (
                  <BodyText
                    key={`ellipsis-${index}`}
                    size="md"
                    color="primary"
                    className={`${componentClassName}Ellipsis`}
                  >
                    {ELLIPSIS}
                  </BodyText>
                );
              }
              const isActive = page === currentPage;
              return (
                <Button
                  key={page}
                  className={`${componentClassName}Page`}
                  variant="ghost"
                  colorScheme="functional"
                  inverted={isActive}
                  data-active={isActive ? 'true' : 'false'}
                  onClick={() => onPageChange(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {page}
                </Button>
              );
            })}
          </div>
        )}

        <div className={`${componentClassName}Controllers`}>
          <UnstyledIconButton
            label="Go to next page"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            <ChevronRightSmallIcon />
          </UnstyledIconButton>

          {skip && (
            <UnstyledIconButton
              label="Go to last page"
              onClick={handleLast}
              disabled={currentPage === totalPages}
            >
              <SkipLastSmallIcon />
            </UnstyledIconButton>
          )}
        </div>
      </div>
    </Component>
  );
};

Pagination.displayName = COMPONENT_NAME;
