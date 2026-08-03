export type RadioValidationStatus = 'valid' | 'invalid' | 'initial';
export type RadioType = 'default' | 'tile';

export interface ResolveValidationStatusOptions {
  fieldValidationStatus?: RadioValidationStatus;
  groupValidationStatus?: RadioValidationStatus;
  validation?: RadioValidationStatus;
}

/**
 * Resolves the validation status a single `Radio` should render with: the
 * enclosing `FormField`'s status wins, then the `RadioGroup`'s status, then
 * the radio's own `validationStatus` prop, falling back to `'initial'`.
 * Mirrors the precedence previously inlined in `Radio`.
 */
export const resolveValidationStatus = ({
  fieldValidationStatus,
  groupValidationStatus,
  validation,
}: ResolveValidationStatusOptions): RadioValidationStatus =>
  fieldValidationStatus ?? groupValidationStatus ?? validation ?? 'initial';

export interface ResolveRadioTypeOptions {
  groupType?: RadioType;
  type?: RadioType;
}

/**
 * Resolves the `type` ('default' | 'tile') a single `Radio` should render
 * as: the enclosing `RadioGroup`'s `type` wins over the radio's own `type`
 * prop. Mirrors the precedence previously inlined in `Radio`.
 */
export const resolveRadioType = ({ groupType, type }: ResolveRadioTypeOptions): RadioType =>
  groupType ?? type ?? 'default';
