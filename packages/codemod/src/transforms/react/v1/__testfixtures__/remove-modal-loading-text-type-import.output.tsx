import type { Modal } from '@utilitywarehouse/hearth-react';
import { type Modal as InlineModal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
    <Modal loadingText="Type-only import">Content</Modal>
    <InlineModal loadingText="Inline type-only import">Content</InlineModal>
  </>
);

export default Component;
