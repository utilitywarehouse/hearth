import type { API, FileInfo } from 'jscodeshift';
import removeModalLoadingText from './remove-modal-loading-text';

/**
 * Runs every `react/v1/*` codemod in sequence, so a consumer can migrate to
 * the full `v1` API in one pass instead of running each codemod individually.
 */
function transformer(file: FileInfo, api: API): string {
  file.source = removeModalLoadingText(file, api);
  return file.source;
}

export default transformer;
