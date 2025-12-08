'use client';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import { DatePickerHeaderProps } from './DatePickerHeader.props';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import {
  ChevronDownSmallIcon,
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import type { View } from './DatePicker.props';

const COMPONENT_NAME = 'DatePickerHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DatePickerHeader = (props: DatePickerHeaderProps) => {
  const {
    date,
    decreaseYear,
    increaseYear,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    prevYearButtonDisabled,
    nextYearButtonDisabled,
    view,
    onClick,
    visibleYearsRange,
  } = props;

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ] as const;

  const buttonText: { [key in View]: string | undefined } = {
    days: [MONTHS[date.getMonth()], date.getFullYear()].join(' '),
    months: date.getFullYear().toString(),
    years: visibleYearsRange
      ? [visibleYearsRange.startYear, '-', visibleYearsRange.endYear].join(' ')
      : undefined,
  };

  const handlePrevClick =
    view === 'days' ? decreaseMonth : view === 'years' ? decreaseYear : undefined;
  const handleNextClick =
    view === 'days' ? increaseMonth : view === 'years' ? increaseYear : undefined;

  const isPrevDisabled =
    (view === 'days' && prevMonthButtonDisabled) || (view === 'years' && prevYearButtonDisabled);
  const isNextDisabled =
    (view === 'days' && nextMonthButtonDisabled) || (view === 'years' && nextYearButtonDisabled);

  const prevLabel = `previous ${view === 'days' ? 'month' : 'year'}`;
  const nextLabel = `next ${view === 'days' ? 'month' : 'year'}`;

  return (
    <div className={componentClassName} data-monthyear-state={view === 'days' ? 'closed' : 'open'}>
      <BodyText asChild size="md" weight="semibold">
        <button className={`${componentClassName}MonthButton`} onClick={onClick}>
          {buttonText[view]}
          {view === 'days' ? (
            <ChevronDownSmallIcon aria-hidden />
          ) : (
            <ChevronUpSmallIcon aria-hidden />
          )}
        </button>
      </BodyText>

      {view !== 'months' ? (
        <div className={`${componentClassName}Control`}>
          <UnstyledIconButton onClick={handlePrevClick} disabled={isPrevDisabled} label={prevLabel}>
            <ChevronLeftSmallIcon />
          </UnstyledIconButton>
          <UnstyledIconButton onClick={handleNextClick} disabled={isNextDisabled} label={nextLabel}>
            <ChevronRightSmallIcon />
          </UnstyledIconButton>
        </div>
      ) : null}
    </div>
  );
};

DatePickerHeader.displayName = COMPONENT_NAME;
