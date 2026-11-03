import * as H from '@utilitywarehouse/hearth-react';

const Outer = () => <H.MenuItem onClick={() => {}}>Hearth</H.MenuItem>;

const Inner = ({ H }) => (
  <H.MenuContent forceMount>
    <H.MenuItem onSelect={() => {}}>Local</H.MenuItem>
  </H.MenuContent>
);

export { Inner, Outer };
