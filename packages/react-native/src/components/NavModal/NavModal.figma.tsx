import figma from '@figma/code-connect';
import { NavModal } from '..';

figma.connect(
  NavModal,
  'https://www.figma.com/design/dLI9bmyMr42LV7dtFeW27J/Hearth-Patterns---Guides?node-id=6314-9103&t=oq3NaPLaAu3di6Db-4',
  {
    props: {},
    example: props => {
      return <NavModal>{/* Your content here */}</NavModal>;
    },
  }
);
