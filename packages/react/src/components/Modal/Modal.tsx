'use client';

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

const COMPONENT_NAME = 'Modal';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

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
      fullScreen,
      children,
      ...props
    },
    ref
  ) => {
    const portalProps = { forceMount, container };
    const containsImage = Boolean(image);

    return (
      <RadixDialog.Portal {...portalProps}>
        <RadixDialog.Overlay className="hearth-Overlay">
          <div className="hearth-ModalScroll">
            <div className="hearth-ModalScrollPadding">
              <RadixDialog.Content
                ref={ref}
                className={clsx(componentClassName, className)}
                data-contains-image={containsImage ? '' : undefined}
                data-full-screen={fullScreen ? '' : undefined}
                {...props}
              >
                <div className="hearth-ModalOuterContainer">
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

                  <div className="hearth-ModalInnerContainer">
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
                  </div>

                  {children}
                </div>
              </RadixDialog.Content>
            </div>
          </div>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    );
  }
);

Modal.displayName = COMPONENT_NAME;
