import React from 'react';

const hasChildrenByDisplayName = (
  children: React.ReactNode,
  displayName: string | string[],
  recursive: boolean = false
): boolean => {
  if (!children) {
    return false;
  }

  const checkDisplayName = (element: React.ReactElement): boolean => {
    // @ts-expect-error - element.type is not typed
    const elementDisplayName = element.type.displayName;

    // Check if current element matches the display name
    const isMatch = Array.isArray(displayName)
      ? displayName.includes(elementDisplayName)
      : elementDisplayName === displayName;

    // If we found a match or we're not checking recursively, return the result
    if (isMatch || !recursive) {
      return isMatch;
    }

    // Check children recursively
    return hasChildrenByDisplayName(element.props.children, displayName, true);
  };

  if (Array.isArray(children)) {
    return children.some(child => {
      return React.isValidElement(child) && checkDisplayName(child);
    });
  }

  if (React.isValidElement(children)) {
    return checkDisplayName(children);
  }

  return false;
};

export default hasChildrenByDisplayName;
