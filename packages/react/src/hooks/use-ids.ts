import { useId } from 'react';
import { GLOBAL_PREFIX } from '../helpers/with-global-prefix';

interface UseIdsProps {
  providedId?: string;
  providedLabelId?: string;
  providedHelperTextId?: string;
  providedValidationTextId?: string;
  prefix?: string;
}

/**
 * Generate stable, prefixed IDs for ARIA labelling and descriptions.
 *
 * Accepts optional, fully-controlled IDs. When not provided, IDs are generated using
 * React's `useId()` and prefixed with the global prefix and optional `prefix` value.
 * Returns a bundle of IDs commonly used by form controls and other labelled components.
 *
 * Example
 * ```ts
 * const { id, labelId, helperTextId, validationTextId } = useIds({ prefix: 'text-input' });
 * // id → e.g. 'h-text-input-:r1:'
 * // labelId → 'h-text-input-:r1:-label'
 * // helperTextId → 'h-text-input-:r1:-helper-text'
 * // validationTextId → 'h-text-input-:r1:-validation-text'
 * ```
 *
 * @param props - Optional explicit IDs and an optional `prefix` used when generating IDs.
 * @returns An object containing `id`, `labelId`, `helperTextId`, and `validationTextId`.
 */
export const useIds = ({
  providedId,
  providedLabelId,
  providedHelperTextId,
  providedValidationTextId,
  prefix: providedPrefix,
}: UseIdsProps) => {
  const prefix = providedId || providedPrefix;
  const generatedId = useId();
  const defaultId = [GLOBAL_PREFIX, prefix, generatedId].filter(el => !!el).join('-');
  const id = providedId || defaultId;
  const labelId = providedLabelId || `${id}-label`;
  const helperTextId = providedHelperTextId || `${id}-helper-text`;
  const validationTextId = providedValidationTextId || `${id}-validation-text`;
  return { id, labelId, helperTextId, validationTextId };
};
