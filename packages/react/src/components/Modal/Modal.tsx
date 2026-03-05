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
import { Flex } from '../Flex/Flex';
import { Spinner } from '../Spinner/Spinner';
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'Modal';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ModalElement = ComponentRef<'div'>;

export const Modal = forwardRef<ModalElement, ModalProps>(
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
      loading,
      loadingText,
      children,
      ...props
    },
    ref
  ) => {
    const portalProps = { forceMount, container };
    const containsImage = Boolean(image);

    return (
      <DialogPrimitive.Portal {...portalProps}>
        <DialogPrimitive.Overlay className={withGlobalPrefix('Overlay')}>
          <div className={`${componentClassName}Scroll`}>
            <div className={`${componentClassName}ScrollPadding`}>
              <DialogPrimitive.Content
                ref={ref}
                className={cn(componentClassName, className)}
                data-contains-image={containsImage ? '' : undefined}
                data-hide-close-button={hideCloseButton ? '' : undefined}
                data-full-screen={fullScreen ? '' : undefined}
                {...props}
              >
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
                <div className={`${componentClassName}OuterContainer`}>
                  {!loading ? (
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
                        {description ? (
                          <DialogPrimitive.Description asChild>
                            <BodyText size="md" as="span">
                              {description}
                            </BodyText>
                          </DialogPrimitive.Description>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {loading ? (
                    <Flex
                      direction="column"
                      gap="300"
                      alignItems="center"
                      paddingY="200"
                      width="100%"
                    >
                      <Spinner size="lg" />
                      {loadingText ? (
                        <DialogPrimitive.Title asChild>
                          <Heading size="lg" textAlign="center" wrap="wrap">
                            {loadingText}
                          </Heading>
                        </DialogPrimitive.Title>
                      ) : null}
                    </Flex>
                  ) : (
                    children
                  )}
                </div>
              </DialogPrimitive.Content>
            </div>
          </div>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    );
  }
);

Modal.displayName = COMPONENT_NAME;
