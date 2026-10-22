import { Button, Modal as M } from '@utilitywarehouse/hearth-react';

const Component = () => (
  <M open loading loadingHeading="Fetching your details...">
    <Button>Close</Button>
  </M>
);

export default Component;
