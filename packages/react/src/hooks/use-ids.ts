import { useId } from 'react';

import { withGlobalPrefix } from '../helpers/with-global-prefix';

interface UseIdsProps {
  providedId?: string;
  providedLabelId?: string;
  providedSupportingTextId?: string;
  providedValidationTextId?: string;
  componentPrefix?: string;
}

export const useIds = ({
  providedId,
  providedLabelId,
  providedSupportingTextId,
  providedValidationTextId,
  componentPrefix,
}: UseIdsProps) => {
  const generatedId = useId();
  const defaultId = withGlobalPrefix(
    componentPrefix ? `${componentPrefix}-${generatedId}` : generatedId
  );
  const id = providedId || defaultId;
  const labelId = providedLabelId || `${defaultId}-label`;
  const supportingTextId = providedSupportingTextId || `${defaultId}-supporting-text`;
  const validationTextId = providedValidationTextId || `${defaultId}-validation-text`;
  return { id, labelId, supportingTextId, validationTextId };
};
