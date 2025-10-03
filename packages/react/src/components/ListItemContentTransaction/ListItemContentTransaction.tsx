import * as React from 'react';
import { Flex } from '../Flex/Flex';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ListItemContentTransactionProps } from './ListItemContentTransaction.props';
import clsx from 'clsx';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListItemContentTransaction';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListItemContentTransaction: React.FC<ListItemContentTransactionProps> = ({
  debit,
  credit,
  className,
}) => {
  const formattedDebit = `-£${debit}`;
  const formattedCredit = `+£${credit}`;
  return (
    <Flex
      height="100%"
      direction="column"
      alignItems="end"
      className={clsx(componentClassName, className)}
    >
      <BodyText size="md" as="span">
        {formattedDebit}
      </BodyText>
      <BodyText size="md" as="span" data-value="credit">
        {formattedCredit}
      </BodyText>
    </Flex>
  );
};

ListItemContentTransaction.displayName = COMPONENT_NAME;
