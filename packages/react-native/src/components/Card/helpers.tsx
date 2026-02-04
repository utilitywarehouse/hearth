import React from 'react';
import { GestureResponderEvent } from 'react-native';

const isExplicitActionWrapper = (child: React.ReactNode): boolean => {
  if (!React.isValidElement(child)) {
    return false;
  }

  const type = child.type as { isCardActionWrapper?: boolean };
  return type?.isCardActionWrapper === true;
};

const getInheritableHandler = (
  child: React.ReactNode,
  handlerToInherit: string
): ((e: GestureResponderEvent) => void) | null => {
  if (!React.isValidElement(child)) {
    return null;
  }

  const childProps = child.props as any;
  const isDisabled = !!childProps.disabled || !!childProps.loading;
  if (isDisabled || typeof childProps[handlerToInherit] !== 'function') {
    return null;
  }

  return childProps[handlerToInherit];
};

// Helper to check if children contain specific component types
export const checkForComponentType = (
  children: React.ReactNode,
  componentType: React.ComponentType<any>
): boolean => {
  return React.Children.toArray(children).some(child => {
    if (React.isValidElement(child)) {
      if (child.type === componentType) {
        return true;
      }
      const childProps = child.props as any;
      if (childProps.children) {
        return checkForComponentType(childProps.children, componentType);
      }
    }
    return false;
  });
};

// Check if a component has "content" in its children (not just actions)
export const hasContentInChildren = (
  child: React.ReactNode,
  actionType: React.ComponentType<any>
): boolean => {
  if (!React.isValidElement(child)) {
    return false;
  }

  const childProps = child.props as any;
  if (!childProps?.children) {
    return false;
  }

  // Check if children contain anything other than the action type
  const childrenArray = React.Children.toArray(childProps.children);
  return childrenArray.some(c => {
    if (!React.isValidElement(c)) {
      // Text, numbers, etc - this is content
      return c != null;
    }
    return c.type !== actionType;
  });
};

// Check if all children are actions or potential action wrappers
export const hasOnlyPotentialActions = (
  children: React.ReactNode,
  actionType: React.ComponentType<any>
): boolean => {
  const childArray = React.Children.toArray(children);
  if (childArray.length === 0) {
    return false;
  }

  let hasActionCandidate = false;

  for (const child of childArray) {
    if (!React.isValidElement(child)) {
      if (child != null) {
        return false;
      }
      continue;
    }

    if (child.type === actionType) {
      hasActionCandidate = true;
      continue;
    }

    if (checkForComponentType(child, actionType)) {
      hasActionCandidate = true;
      continue;
    }

    if (typeof child.type === 'string') {
      return false;
    }

    if (hasContentInChildren(child, actionType)) {
      return false;
    }

    if (isExplicitActionWrapper(child)) {
      hasActionCandidate = true;
      continue;
    }
  }

  return hasActionCandidate || checkForComponentType(children, actionType);
};

// Helper to filter out specific component types from children
export const filterChildren = (
  children: React.ReactNode,
  excludeComponentType: React.ComponentType<any>
): React.ReactNode => {
  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      if (child.type === excludeComponentType) {
        return null;
      }

      // Check if this child contains the excludeComponentType
      if (checkForComponentType(child, excludeComponentType)) {
        return null; // This child or its descendants contain the action
      }

      const childProps = child.props as any;
      if (childProps.children) {
        const filteredChildren = filterChildren(childProps.children, excludeComponentType);
        // Only preserve wrapper if it has non-null children
        const hasContent = React.Children.toArray(filteredChildren).some(c => c != null);
        if (!hasContent) {
          return null;
        }
        return React.cloneElement(child, {
          ...childProps,
          children: filteredChildren,
        });
      }

      // Explicit action wrapper (CustomAction)
      if (isExplicitActionWrapper(child)) {
        // No content in children, likely an action wrapper
        return null;
      }
    }
    return child;
  });
};

// Helper to extract only CardActions (preserving wrapper components)
export const extractCardActions = (
  children: React.ReactNode,
  actionType: React.ComponentType<any>
): React.ReactNode => {
  const recursiveExtract = (children: React.ReactNode): React.ReactNode => {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) return null;

      // Direct action
      if (child.type === actionType) {
        return child;
      }

      // If this child contains a CardAction in its tree, keep it
      if (checkForComponentType(child, actionType)) {
        return child;
      }

      // Explicit action wrapper like CustomAction
      if (isExplicitActionWrapper(child)) {
        return child;
      }

      return null;
    });
  };

  return recursiveExtract(children);
};

// Helper that recursively collects onPress or other defined handlers from descendants
export const collectChildActionHandlers = (
  children: React.ReactNode
): Array<(e: GestureResponderEvent) => void> =>
  React.Children.toArray(children).reduce(
    (handlers, child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as any;
        // Check using displayName as CardPressHandler might not be directly importable
        // @ts-expect-error - type
        if (child.type?.displayName === 'CardPressHandler') {
          const actionChildren = React.Children.toArray(childProps.children);
          const handlerToInherit = childProps['handlerToInherit'] || 'onPress';
          const firstChild = actionChildren[0];
          const handler = getInheritableHandler(firstChild, handlerToInherit);
          if (handler) {
            handlers.push(handler);
          }
        }
        if (childProps.children) {
          handlers.push(...collectChildActionHandlers(childProps.children));
        }
      }
      return handlers;
    },
    [] as Array<(e: GestureResponderEvent) => void>
  );
