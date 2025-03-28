// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
// https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/helpers/input-attributes.ts

type InputAttributes =
  | 'accept'
  | 'alt'
  | 'autocapitalize'
  | 'autocomplete'
  | 'capture'
  | 'checked'
  | 'defaultChecked'
  | 'defaultValue'
  | 'disabled'
  | 'form'
  | 'formaction'
  | 'formenctype'
  | 'formmethod'
  | 'formnovalidate'
  | 'formtarget'
  | 'height'
  | 'list'
  | 'max'
  | 'maxlength'
  | 'min'
  | 'minlength'
  | 'multiple'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'popovertarget'
  | 'popovertargetaction'
  | 'readonly'
  | 'required'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'value'
  | 'width';

// Includes all text-like inputs, e.g. text, email, password, number, date, etc.
type InputTextualAttributes =
  | 'autoCapitalize'
  | 'autoComplete'
  | 'defaultValue'
  | 'disabled'
  | 'form'
  | 'list'
  | 'maxLength'
  | 'minLength'
  | 'min'
  | 'multiple'
  | 'max'
  | 'name'
  | 'pattern'
  | 'placeholder'
  | 'readOnly'
  | 'required'
  | 'size'
  | 'step'
  | 'type'
  | 'value';

type NotInputTextualAttributes = Exclude<InputAttributes, InputTextualAttributes>;

export type { InputAttributes, InputTextualAttributes, NotInputTextualAttributes };
