import * as React from 'react';
import type { ElementRef } from 'react';
import { Dialog as RadixDialog } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ModalProps } from './Modal.props';
import { Heading } from '../Heading/Heading';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { ModalClose } from './ModalClose';
import { Box } from '../Box/Box';

const componentName = 'Modal';
const componentClassName = withGlobalPrefix(componentName);

type ModalElement = ElementRef<'div'>;

export const Modal = React.forwardRef<ModalElement, ModalProps>(
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
        <RadixDialog.Overlay className="hearth-Overlay" />

        <RadixDialog.Content
          ref={ref}
          className={clsx(componentClassName, className)}
          data-contains-image={containsImage ? '' : undefined}
          {...props}
        >
          <ModalClose>
            <UnstyledIconButton
              type="button"
              label="Close"
              data-visually-hidden={hideCloseButton ? '' : undefined}
              className="hearth-ModalCloseIconButton"
            >
              <CloseMediumIcon />
            </UnstyledIconButton>
          </ModalClose>

          {containsImage ? <div className="hearth-ModalImage">{image}</div> : null}

          <div className="hearth-ModalHeader">
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

Modal.displayName = componentName;
