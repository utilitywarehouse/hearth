// Vite exposes VITE_-prefixed env vars to the Storybook preview bundle.
interface ImportMetaEnv {
  /** Set to 'true' by the weekly a11y workflow to make a11y violations fail stories. */
  readonly VITE_A11Y_STRICT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
