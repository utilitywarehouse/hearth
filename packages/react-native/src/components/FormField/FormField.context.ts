import { createContext, useContext } from 'react';
import { FormFieldBaseProps } from './FormField.props';

export const FormFieldContext = createContext<
  FormFieldBaseProps & {
    setShouldHandleAccessibility?: (value: boolean) => void;
    shouldHandleAccessibility?: boolean;
  }
>({});

export const useFormFieldContext = () => useContext(FormFieldContext);
