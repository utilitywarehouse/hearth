import { Children, ComponentProps, useMemo } from 'react';
import ButtonGroupRoot from './ButtonGroupRoot';
import { ButtonGroupContext } from './ButtonGroup.context';

interface ButtonGroupProps extends ComponentProps<typeof ButtonGroupRoot> {
  disabled?: boolean;
  loading?: boolean;
}

const ButtonGroup = ({ children, disabled, loading, reversed, ...props }: ButtonGroupProps) => {
  const value = useMemo(() => ({ disabled, loading }), [disabled, loading]);
  const orderedChildren = reversed ? [...Children.toArray(children)].reverse() : children;
  return (
    <ButtonGroupContext.Provider value={value}>
      <ButtonGroupRoot {...props}>{orderedChildren}</ButtonGroupRoot>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
