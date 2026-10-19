// this is a comment at the beginning of the file
import * as React from 'react';
import { Modal } from '@utilitywarehouse/hearth-react';

const Component = (props: React.ComponentProps<typeof Modal>) => (
  <div>
    <Modal open fullScreen>
      Shorthand
    </Modal>
    <Modal open fullScreen={true}>
      True
    </Modal>
    <Modal open fullScreen={false}>
      False
    </Modal>
    <Modal open fullScreen={props.open}>
      Expression
    </Modal>
    <Modal open heading="No fullScreen">
      Untouched
    </Modal>
    <Modal {...props}>Spread is flagged, not rewritten</Modal>
  </div>
);

export default Component;
