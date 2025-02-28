import BoxPerfTest from './BoxPerfTest';

const StarterComponent = () => {
  return <BoxPerfTest />;
};

const meta = {
  title: 'Welcome',
  component: StarterComponent,
};

export default meta;

export const GettingStarted = {
  args: {},
  parameters: {
    noBackground: true,
  },
};
