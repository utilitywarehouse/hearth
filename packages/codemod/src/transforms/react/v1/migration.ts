import type { API, FileInfo } from 'jscodeshift';
import migrateAccordion from './migrate-accordion';
import removeModalFullscreen from './remove-modal-fullscreen';
import removeModalLoadingText from './remove-modal-loading-text';
import removeTextWrapProp from './remove-text-wrap-prop';

/**
 * Runs every `react/v1/*` codemod in sequence, so a consumer can migrate to
 * the full `v1` API in one pass instead of running each codemod individually.
 */
function transformer(file: FileInfo, api: API): string {
  file.source = migrateAccordion(file, api);
  file.source = removeModalFullscreen(file, api);
  file.source = removeModalLoadingText(file, api);
  file.source = removeTextWrapProp(file, api);
  return file.source;
}

export default transformer;
