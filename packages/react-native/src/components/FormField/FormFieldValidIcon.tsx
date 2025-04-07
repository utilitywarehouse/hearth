import React, { forwardRef } from 'react';
import { HelperIcon } from '../Helper';
import IconProps from '../Icon/Icon.props';
import { SvgRef } from '../../types';
import { TickCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const FormFieldValidIcon = forwardRef<SvgRef, Omit<IconProps, 'as'>>((props, ref) => {
  return <HelperIcon ref={ref} as={TickCircleSmallIcon} {...props} />;
});

FormFieldValidIcon.displayName = 'FormFieldValidIcon';

export default FormFieldValidIcon;
