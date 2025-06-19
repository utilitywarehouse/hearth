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
import { DialogProvider } from './Dialog.context';
import { Flex } from '../Flex/Flex';

const componentName = 'Dialog';
const componentClassName = withGlobalPrefix(componentName);

type DialogElement = ElementRef<'div'>;

export const Dialog = React.forwardRef<DialogElement, DialogProps>(
  (
    {
      className,
      image,
      forceMount,
      container,
      heading,
      description,
      hideCloseButton,
      children,
      ...props
    },
    ref
  ) => {
    const portalProps = { forceMount, container };
    const containsImage = Boolean(image);

    return (
      <RadixDialog.Portal {...portalProps}>
        <RadixDialog.Overlay className="hearth-DialogOverlay" />

        <RadixDialog.Content
          ref={ref}
          className={clsx(componentClassName, className)}
          data-contains-image={containsImage ? '' : undefined}
          {...props}
        >
          <DialogClose>
            <UnstyledIconButton
              type="button"
              label="Close"
              data-visually-hidden={hideCloseButton ? '' : undefined}
              className="hearth-DialogCloseIconButton"
            >
              <CloseMediumIcon />
            </UnstyledIconButton>
          </DialogClose>

          {containsImage ? <div className="hearth-DialogImage">{image}</div> : null}

          <div className="hearth-DialogHeader">
            <Box asChild>
              <RadixDialog.Title asChild>
                <Heading size="lg">{heading}</Heading>
              </RadixDialog.Title>
            </Box>
            <RadixDialog.Description asChild>
              <BodyText size="md" as="span">
                {description}
              </BodyText>
            </RadixDialog.Description>
          </div>

          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    );
  }
);

Dialog.displayName = componentName;
