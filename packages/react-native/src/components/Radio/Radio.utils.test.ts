import { describe, expect, it } from 'vitest';
import { resolveRadioType, resolveValidationStatus } from './Radio.utils';

describe('resolveValidationStatus', () => {
  it('prefers the enclosing FormField validation status over everything else', () => {
    expect(
      resolveValidationStatus({
        fieldValidationStatus: 'invalid',
        groupValidationStatus: 'valid',
        validation: 'valid',
      })
    ).toBe('invalid');
  });

  it('falls back to the RadioGroup validation status when there is no FormField', () => {
    expect(
      resolveValidationStatus({
        fieldValidationStatus: undefined,
        groupValidationStatus: 'valid',
        validation: 'invalid',
      })
    ).toBe('valid');
  });

  it("falls back to the radio's own validationStatus prop when there is no field or group status", () => {
    expect(
      resolveValidationStatus({
        fieldValidationStatus: undefined,
        groupValidationStatus: undefined,
        validation: 'invalid',
      })
    ).toBe('invalid');
  });

  it("defaults to 'initial' when no validation status is set anywhere", () => {
    expect(
      resolveValidationStatus({
        fieldValidationStatus: undefined,
        groupValidationStatus: undefined,
        validation: undefined,
      })
    ).toBe('initial');
  });
});

describe('resolveRadioType', () => {
  it("prefers the enclosing RadioGroup's type over the radio's own type", () => {
    expect(resolveRadioType({ groupType: 'tile', type: 'default' })).toBe('tile');
  });

  it("falls back to the radio's own type when there is no group type", () => {
    expect(resolveRadioType({ groupType: undefined, type: 'tile' })).toBe('tile');
  });

  it("defaults to 'default' when neither a group type nor a type is set", () => {
    expect(resolveRadioType({ groupType: undefined, type: undefined })).toBe('default');
  });
});
