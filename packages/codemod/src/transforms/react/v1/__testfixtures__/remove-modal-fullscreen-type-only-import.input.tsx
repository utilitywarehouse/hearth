import type { Modal } from '@utilitywarehouse/hearth-react';
import { type Modal as AliasedModal } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
    <Modal open fullScreen>
      Type-only import, not the runtime component
    </Modal>
    <AliasedModal open fullScreen>
      Type-only specifier, not the runtime component
    </AliasedModal>
  </>
);

export default Component;
