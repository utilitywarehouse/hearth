import { useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData } from 'react-native';

interface UseVerificationInputProps {
  value: string;
  onChangeText?: (text: string) => void;
}

export const useVerificationInput = ({ value, onChangeText }: UseVerificationInputProps) => {
  const length = 6;
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };

  const handleChangeText = (text: string, index: number) => {
    // Break down the text into an array of characters
    const chars = Array(length).fill('');
    for (let i = 0; i < value.length && i < length; i++) {
      chars[i] = value[i];
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

    onChangeText?.(chars.join(''));
  };

  const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!value[index] && index > 0) {
        e.preventDefault();
        inputRefs.current[index - 1]?.focus();

        const chars = Array(length).fill('');
        for (let i = 0; i < value.length && i < length; i++) {
          chars[i] = value[i];
        }
        chars[index - 1] = '';
        onChangeText?.(chars.join(''));
      }
    }
  };

  return {
    inputRefs,
    focusedIndex,
    handleFocus,
    handleBlur,
    handleChangeText,
    handleKeyPress,
  };
};
