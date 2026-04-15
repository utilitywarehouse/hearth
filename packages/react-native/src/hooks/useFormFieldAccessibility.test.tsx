import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import useFormFieldAccessibility from './useFormFieldAccessibility';

type HookArgs = Parameters<typeof useFormFieldAccessibility>[0];

const renderHook = (args: HookArgs) => {
  let result: ReturnType<typeof useFormFieldAccessibility> | undefined;

  const TestComponent = () => {
    result = useFormFieldAccessibility(args);
    return null;
  };

  renderToStaticMarkup(<TestComponent />);

  if (!result) {
    throw new Error('Hook did not return a result');
  }

  return result;
};

describe('useFormFieldAccessibility', () => {
  it('builds a label from the field label and required state', () => {
    expect(
      renderHook({
        label: 'Email',
        required: true,
      })
    ).toEqual({
      accessibilityHint: undefined,
      accessibilityLabel: 'Email, required',
    });
  });

  it('builds a hint from helper text and validation feedback', () => {
    expect(
      renderHook({
        helperText: 'Enter the code we sent you',
        validationStatus: 'invalid',
        invalidText: 'Code is invalid',
      })
    ).toEqual({
      accessibilityHint: 'Enter the code we sent you, Code is invalid',
      accessibilityLabel: undefined,
    });
  });

  it('falls back to provided accessibility props when no composed value exists', () => {
    expect(
      renderHook({
        fallbackLabel: 'Custom label',
        fallbackHint: 'Custom hint',
      })
    ).toEqual({
      accessibilityHint: 'Custom hint',
      accessibilityLabel: 'Custom label',
    });
  });

  it('supports omitting the required suffix from the label', () => {
    expect(
      renderHook({
        label: 'Verification code',
        required: true,
        includeRequiredInLabel: false,
      })
    ).toEqual({
      accessibilityHint: undefined,
      accessibilityLabel: 'Verification code',
    });
  });
});