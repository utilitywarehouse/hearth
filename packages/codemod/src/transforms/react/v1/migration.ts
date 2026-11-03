import type { API, FileInfo } from 'jscodeshift';
import migrateAccordion from './migrate-accordion';
import preV1Migration from '../pre-v1/migration';

/**
 * Runs the complete `v1` migration: the non-breaking `react/pre-v1/migration`
 * codemods, then the breaking-change codemods. Register breaking codemods here;
 * non-breaking ones belong in `react/pre-v1/migration`.
 */
function transformer(file: FileInfo, api: API): string {
  file.source = preV1Migration(file, api);
  file.source = migrateAccordion(file, api);
  return file.source;
}

export default transformer;
