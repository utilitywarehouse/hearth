import { useId } from 'react';
import { GLOBAL_PREFIX } from '../helpers/with-global-prefix';

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
