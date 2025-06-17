import { Box } from '../Box';
import BoxProps from '../Box/Box.props';

const Center = ({ children, ...props }: BoxProps) => (
  <Box alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
);

Center.displayName = 'Center';

export default Center;
