import { Button, Modal as M } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <M open loading loadingText="Fetching your details...">
    <Button>Close</Button>
  </M>
);

export default Component;
