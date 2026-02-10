import { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';

interface UseVerificationInputProps {
  value: string;
  onChangeText?: (text: string) => void;
}

export const useVerificationInput = ({ value, onChangeText }: UseVerificationInputProps) => {
  const length = 6;
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const latestValueRef = useRef(value);
  const [displayValue, setDisplayValue] = useState(value);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (value !== latestValueRef.current) {
      latestValueRef.current = value;
      setDisplayValue(value);
    }
  }, [value]);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const updateValue = (nextValue: string) => {
    latestValueRef.current = nextValue;
    setDisplayValue(nextValue);
    onChangeText?.(nextValue);
  };

  const handleChangeText = (text: string, index: number) => {
    const currentValue = latestValueRef.current;
    const chars = Array(length).fill('');
    for (let i = 0; i < currentValue.length && i < length; i++) {
      chars[i] = currentValue[i];
    }

    if (text.length > 1) {
      // Handle paste
      const pastedChars = text.slice(0, length - index).split('');
      for (let i = 0; i < pastedChars.length; i++) {
        chars[index + i] = pastedChars[i];
      }
      const nextIndex = Math.min(index + pastedChars.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Handle single char input
      chars[index] = text;
      if (text.length === 1 && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    updateValue(chars.join(''));
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      const currentValue = latestValueRef.current;
      if (!currentValue[index] && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();

        const chars = Array(length).fill('');
        for (let i = 0; i < currentValue.length && i < length; i++) {
          chars[i] = currentValue[i];
        }
        chars[index - 1] = '';
        updateValue(chars.join(''));
      }
    }
  };

  return {
    inputRefs,
    displayValue,
    focusedIndex,
    handleFocus,
    handleBlur,
    handleChangeText,
    handleKeyPress,
  };
};
