import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { DialogProps } from './Dialog.props';
import { Grid } from '../Grid/Grid';
import { Heading } from '../Heading/Heading';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { DialogClose } from './DialogClose';
import { Box } from '../Box/Box';

const componentName = 'Dialog';
const componentClassName = withGlobalPrefix(componentName);

type DialogElement = ElementRef<'div'>;

export const Dialog = React.forwardRef<DialogElement, DialogProps>(
  (
    { className, forceMount, container, heading, description, hideCloseButton, children, ...props },
    ref
  ) => {
    const portalProps = { forceMount, container };
    return (
      <RadixDialog.Portal {...portalProps}>
        <RadixDialog.Overlay className="hearth-DialogOverlay" />

        <RadixDialog.Content ref={ref} className={clsx(componentClassName, className)} {...props}>
          <Grid className="hearth-DialogHeader" templateColumns="1fr 24px">
            <Box asChild gridColumn="1 / 2" gridRow="1 / 2">
              <Heading size="lg">{heading}</Heading>
            </Box>
            <DialogClose>
              <UnstyledIconButton
                label="Close dialog"
                data-visually-hidden={hideCloseButton ? '' : undefined}
              >
                <CloseMediumIcon />
              </UnstyledIconButton>
            </DialogClose>
            <Box asChild gridColumn="1 / 3" gridRow="2 / 3">
              <BodyText size="md">{description}</BodyText>
            </Box>
          </Grid>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);

Dialog.displayName = componentName;
