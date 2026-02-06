import React from 'react';
import { Modal } from '../components/Modal/Modal';
import figma from '@figma/code-connect';
import { Button } from '../components/Button/Button';
import { ModalRoot } from '../components/Modal/ModalRoot';
import { ModalTrigger } from '../components/Modal/ModalTrigger';
import { ModalClose } from '../components/Modal/ModalClose';
import { ModalFooter } from '../components/Modal/ModalFooter';

figma.connect(
  Modal,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6300-2825&m=dev',
  {
    props: {
      heading: figma.string('Heading'),
      description: figma.string('Description'),
      children: figma.boolean('Custom content?', {
        true: figma.children('Custom content'),
        false: undefined,
      }),
      hideCloseButton: figma.boolean('Close?', {
        true: false,
        false: true,
      }),
      image: figma.boolean('Image?', {
        true: figma.children('Modal illustration'),
        false: undefined,
      }),
    },
    example: ({ children, ...props }) => (
      <ModalRoot>
        <ModalTrigger>
          <Button>Open modal</Button>
        </ModalTrigger>
        <Modal {...props}>
          {children}
          <ModalFooter>
            <ModalClose>
              <Button variant="ghost" colorScheme="functional">
                Cancel
              </Button>
            </ModalClose>
            <ModalClose>
              <Button variant="solid" colorScheme="highlight">
                Primary
              </Button>
            </ModalClose>
          </ModalFooter>
        </Modal>
      </ModalRoot>
    ),
  }
);
