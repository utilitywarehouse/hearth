'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ModalProps } from './Modal.props';
import { Heading } from '../Heading/Heading';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { ModalClose } from './ModalClose';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'Modal';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Modal = ({
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
}: ModalProps) => {
  const portalProps = { forceMount, container };
  const containsImage = Boolean(image);

  return (
    <DialogPrimitive.Portal {...portalProps}>
      <DialogPrimitive.Overlay className="hearth-Overlay">
        <div className="hearth-ModalScroll">
          <div className="hearth-ModalScrollPadding">
            <DialogPrimitive.Content
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
                      <DialogPrimitive.Title asChild>
                        <Heading size="lg">{heading}</Heading>
                      </DialogPrimitive.Title>
                    </Box>
                    <DialogPrimitive.Description asChild>
                      <BodyText size="md" as="span">
                        {description}
                      </BodyText>
                    </DialogPrimitive.Description>
                  </div>
                </div>

                {children}
              </div>
            </DialogPrimitive.Content>
          </div>
        </div>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
};

Modal.displayName = COMPONENT_NAME;
