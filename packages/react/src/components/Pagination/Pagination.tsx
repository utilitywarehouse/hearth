'use client';

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
import { Slot } from 'radix-ui';

const COMPONENT_NAME = 'Pagination';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

const ELLIPSIS = '...';
const MAX_VISIBLE_ITEMS = 7;

/**
 * Generates the array of page numbers and ellipsis to display
 * Max visible items is 7 (including ellipses)
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

  // Determine if current page is close to start or end
  const isNearStart = currentPage <= 4;
  const isNearEnd = currentPage > totalPages - 4;

  if (isNearStart) {
    // Page 1-4 selected: 1, 2, 3, 4, 5, ..., last
    pages.push(1, 2, 3, 4, 5);
    pages.push(ELLIPSIS);
    pages.push(totalPages);
  } else if (isNearEnd) {
    // Page (totalPages-4) to totalPages selected: 1, ..., last-4, last-3, last-2, last-1, last
    pages.push(1);
    pages.push(ELLIPSIS);
    pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    // Middle pages: 1, ..., current-1, current, current+1, ..., last
    pages.push(1);
    pages.push(ELLIPSIS);
    pages.push(currentPage - 1, currentPage, currentPage + 1);
    pages.push(ELLIPSIS);
    pages.push(totalPages);
  }

  return pages;
};

export const Pagination = (props: PaginationProps) => {
  const {
    className,
    currentPage,
    totalPages,
    onPageChange,
    condensed = false,
    hideSkipButtons = false,
    as: Tag = 'div',
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
    <Slot.Root
      aria-label="pagination"
      className={clsx(componentClassName, className)}
      {...paginationProps}
    >
      <Tag>
        <div className={`${componentClassName}Container`}>
          <div className={`${componentClassName}Controllers`}>
            {!hideSkipButtons && (
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
            <div>
              <ol className={`${componentClassName}Pages`}>
                {pages.map((page, index) => {
                  if (page === ELLIPSIS) {
                    return (
                      <li key={`ellipsis-${index}`}>
                        <BodyText
                          size="md"
                          color="primary"
                          className={`${componentClassName}Ellipsis`}
                        >
                          {ELLIPSIS}
                        </BodyText>
                      </li>
                    );
                  }
                  const isActive = page === currentPage;
                  return (
                    <li key={page}>
                      <Button
                        className={`${componentClassName}Page`}
                        variant="ghost"
                        colorScheme="functional"
                        onClick={() => onPageChange(page)}
                        data-active={isActive ? '' : undefined}
                        aria-label={`Go to page ${page}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {page}
                      </Button>
                    </li>
                  );
                })}
              </ol>
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

            {!hideSkipButtons && (
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
      </Tag>
    </Slot.Root>
  );
};

Pagination.displayName = COMPONENT_NAME;
