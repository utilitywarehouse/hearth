import { Modal } from '@utilitywarehouse/hearth-react';

const Component = ({ cond, props }) => (
  <>
    <Modal open loadingText="Fetching..." loadingHeading={cond ? 'Please wait' : undefined}>
      Content
    </Modal>
    <Modal open {...props}>
      Content
    </Modal>
  </>
);

export default Component;
