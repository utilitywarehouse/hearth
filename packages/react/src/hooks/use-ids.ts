import { useId } from 'react';

import { withGlobalPrefix } from '../helpers/with-global-prefix';

interface UseIdsProps {
  providedId?: string;
  providedLabelId?: string;
  providedHelperTextId?: string;
  providedValidationTextId?: string;
  prefix?: string;
}

export const useIds = ({
  providedId,
  providedLabelId,
  providedHelperTextId,
  providedValidationTextId,
  prefix,
}: UseIdsProps) => {
  const generatedId = useId();
  const defaultId = withGlobalPrefix(prefix ? `${prefix}-${generatedId}` : generatedId);
  const id = providedId || defaultId;
  const labelId = providedLabelId || `${defaultId}-label`;
  const helperTextId = providedHelperTextId || `${defaultId}-helper-text`;
  const validationTextId = providedValidationTextId || `${defaultId}-validation-text`;
  return { id, labelId, helperTextId, validationTextId };
};
