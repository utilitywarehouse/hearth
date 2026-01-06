'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
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
      <DialogPrimitive.Overlay className={withGlobalPrefix('Overlay')}>
        <div className={`${componentClassName}Scroll`}>
          <div className={`${componentClassName}ScrollPadding`}>
            <DialogPrimitive.Content
              className={cn(componentClassName, className)}
              data-contains-image={containsImage ? '' : undefined}
              data-hide-close-button={hideCloseButton ? '' : undefined}
              data-full-screen={fullScreen ? '' : undefined}
              {...props}
            >
              <div className={`${componentClassName}OuterContainer`}>
                <ModalClose>
                  <UnstyledIconButton
                    type="button"
                    label="Close"
                    data-visually-hidden={hideCloseButton ? '' : undefined}
                    className={`${componentClassName}CloseIconButton`}
                  >
                    <CloseMediumIcon />
                  </UnstyledIconButton>
                </ModalClose>

                <div className={`${componentClassName}InnerContainer`}>
                  {containsImage ? (
                    <div className={`${componentClassName}Image`}>{image}</div>
                  ) : null}
                  <div className={`${componentClassName}Header`}>
                    <Box asChild>
                      <DialogPrimitive.Title asChild>
                        <Heading size="lg" wrap="wrap">
                          {heading}
                        </Heading>
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
