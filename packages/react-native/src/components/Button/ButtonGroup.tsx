import { ComponentProps, useMemo } from 'react';
import { ButtonGroupComponent } from './Button';
import { ButtonGroupContext } from './ButtonGroup.context';

interface ButtonGroupProps
  extends Omit<
    ComponentProps<typeof ButtonGroupComponent>,
    'isDisabled' | 'isAttached' | 'isReversed' | 'ref'
  > {
  disabled?: boolean;
  loading?: boolean;
}

const ButtonGroup = ({ children, disabled, loading, ...props }: ButtonGroupProps) => {
  const value = useMemo(() => ({ disabled, loading }), [disabled, loading]);
  return (
    <ButtonGroupContext.Provider value={value}>
      <ButtonGroupComponent {...props}>{children}</ButtonGroupComponent>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
