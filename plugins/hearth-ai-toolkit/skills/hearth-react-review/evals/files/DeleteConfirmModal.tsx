import { Box, Flex, Modal, Heading, BodyText, Button } from '@utilitywarehouse/hearth-react';

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ open, onClose, onConfirm }: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)' }}>
      <Box padding={{ tablet: '300' }} backgroundColor="primary">
        <Heading as="h2">Delete this item?</Heading>
        <BodyText>This action cannot be undone.</BodyText>
        <Flex gap="200">
          <button onClick={onClose}>Cancel</button>
          <a href="#" onClick={onConfirm}>
            <Button variant="solid">Delete</Button>
          </a>
        </Flex>
      </Box>
    </div>
  );
}
