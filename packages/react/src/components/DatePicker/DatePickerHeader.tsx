import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import React from 'react';
import { DatePickerHeaderProps } from './DatePickerHeader.props';
import { Flex } from '../Flex/Flex';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { ChevronLeftSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { ButtonBase } from '../ButtonBase/ButtonBase';
import { Button } from '../Button/Button';

const COMPONENT_NAME = 'DatePickerHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DatePickerHeader = (props: DatePickerHeaderProps) => {
  const {
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
    showMonths,
    setShowMonths,
    setShouldCloseOnSelect,
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
  return (
    <Flex className={componentClassName} justifyContent="between">
      <BodyText asChild size="md" weight="semibold">
        <button
          className={`${componentClassName}MonthButton`}
          onClick={() => {
            setShowMonths(show => !show);
            setShouldCloseOnSelect(false);
          }}
        >
          {MONTHS[date.getMonth()]}
        </button>
      </BodyText>

      <div className={`${componentClassName}Control`}>
        <UnstyledIconButton
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled || showMonths}
          label="previous month"
        >
          <ChevronLeftSmallIcon />
        </UnstyledIconButton>
        <UnstyledIconButton
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled || showMonths}
          label="next month"
        >
          <ChevronRightSmallIcon />
        </UnstyledIconButton>
      </div>
    </Flex>
  );
};

DatePickerHeader.displayName = COMPONENT_NAME;
