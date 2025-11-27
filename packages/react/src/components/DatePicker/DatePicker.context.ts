import { createContext, useContext } from 'react';

export type DatePickerContextValue = {
  setShowMonths: React.Dispatch<React.SetStateAction<boolean>>;
  setShouldCloseOnSelect: React.Dispatch<React.SetStateAction<boolean>>;
};
export const DatePickerContext = createContext<DatePickerContextValue | undefined>(undefined);
export const DatePickerProvider = DatePickerContext.Provider;
export const useDatePicker = () => useContext(DatePickerContext);
