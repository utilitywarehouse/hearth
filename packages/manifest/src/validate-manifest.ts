import { manifestSchema, type Manifest } from './schema.js';

export type ValidationResult =
  | { success: true; manifest: Manifest }
  | { success: false; errors: string[] };

export function validateManifest(input: unknown): ValidationResult {
  const result = manifestSchema.safeParse(input);
  if (result.success) return { success: true, manifest: result.data };
  return {
    success: false,
    errors: result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`),
  };
}
