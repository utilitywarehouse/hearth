import type { API, FileInfo } from 'jscodeshift';
import migrateMenu from '../v1/migrate-menu';
import removeAccordionContentForceMount from '../v1/remove-accordion-content-force-mount';
import removeModalFullscreen from '../v1/remove-modal-fullscreen';
import removeModalLoadingText from '../v1/remove-modal-loading-text';
import removeTextWrapProp from '../v1/remove-text-wrap-prop';

/**
 * Runs every non-breaking codemod in sequence. These move usages of deprecated
 * props to their replacements, so they are safe to run on the current release,
 * before upgrading to `v1`. Register new non-breaking codemods here;
 * `react/v1/migration` includes them.
 */
function transformer(file: FileInfo, api: API): string {
  file.source = migrateMenu(file, api);
  file.source = removeAccordionContentForceMount(file, api);
  file.source = removeModalFullscreen(file, api);
  file.source = removeModalLoadingText(file, api);
  file.source = removeTextWrapProp(file, api);
  return file.source;
}

export default transformer;
