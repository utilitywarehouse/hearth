export type PropDef<T = string> = {
  tokens?: ReadonlyArray<T>;
  className: string;
  default?: string | number;
  responsive: boolean;
  // For when we have a set of options that are too big to create CSS classes for every option.
  //
  // ie Colours: we can't reasonably create classes for every colour and every colour property, especially when we know many won't be used.
  // In this case, we will have a single colour class, and set the colour using a custom property in the style attribute.
  singleClassNameTokens?: boolean;
  // Currently only used when singleClassNameTokens is true
  transformValue?: (value: string) => string;
};
