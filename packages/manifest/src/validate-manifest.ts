import { MANIFEST_TYPES, manifestSchema, type Manifest } from './schema.js';

export type ValidationResult =
  | { success: true; manifest: Manifest }
  | { success: false; errors: Array<string> };

export function validateManifest(input: unknown): ValidationResult {
  const type = (input as { type?: unknown } | null)?.type;
  if (typeof type === 'string' && !(MANIFEST_TYPES as Array<string>).includes(type)) {
    return {
      success: false,
      errors: [
        `type: unknown manifest type "${type}" (this version reads ${MANIFEST_TYPES.join(', ')})`,
      ],
    };
  }
  const result = manifestSchema.safeParse(input);
  if (result.success) return { success: true, manifest: result.data };
  return {
    success: false,
    errors: result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`),
  };
}
