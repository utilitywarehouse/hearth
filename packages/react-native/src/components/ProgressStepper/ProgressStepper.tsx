import React, { useMemo, Children, cloneElement, isValidElement } from 'react';
import ProgressStepperProps from './ProgressStepper.props';
import ProgressStepperRoot from './ProgressStepperRoot';

/**
 * Displays a series of steps connected by lines, showing progress through a
 * multi-step process. Use it to show which steps in a flow are complete,
 * active, or still to come.
 */
const ProgressStepper = ({ children, ...rest }: ProgressStepperProps) => {
  // Process children to add index and isLast props
  const processedChildren = useMemo(() => {
    const childrenArray = Children.toArray(children);
    return childrenArray.map((child, index) => {
      if (isValidElement(child)) {
        return cloneElement(child, {
          ...(child.props as any),
          index,
          isLast: index === childrenArray.length - 1,
        });
      }
      return child;
    });
  }, [children]);

  return <ProgressStepperRoot {...rest}>{processedChildren}</ProgressStepperRoot>;
};

ProgressStepper.displayName = 'ProgressStepper';

export default ProgressStepper;
