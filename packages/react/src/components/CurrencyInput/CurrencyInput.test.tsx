import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CurrencyInput } from './CurrencyInput';

describe('CurrencyInput', () => {
  it('should call onChange with the correct value (without commas)', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(<CurrencyInput label="Test label" onChange={handleChange} />);
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '1,234.56' } });

    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '1234.56' }),
      })
    );
  });

  it('should work with object refs', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { getByRole } = render(<CurrencyInput label="Test label" ref={ref} />);
    const input = getByRole('textbox');

    expect(ref.current).toBe(input);
  });

  it('should work with callback refs', () => {
    let refNode: HTMLInputElement | null = null;
    const setRef = (node: HTMLInputElement | null) => {
      refNode = node;
    };
    const { getByRole } = render(<CurrencyInput label="Test label" ref={setRef} />);
    const input = getByRole('textbox');

    expect(refNode).toBe(input);
  });

  it('should restore cursor position after formatting', () => {
    const { getByRole } = render(<CurrencyInput label="Test label" />);
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: '1234' } });
    fireEvent.change(input, { target: { value: '1,234' } });

    expect(input.selectionStart).toBe(5); // Cursor position after formatting
  });
});
