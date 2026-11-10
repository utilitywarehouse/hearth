import { describe, it } from 'vitest';
import { runTransformFixtureTest } from '../../../../test-utils';
import * as transform from '../migrate-card-banner-image';

const fixtures = [
  ['renames CardBannerImage to BannerImage', ''],
  ['keeps an import alias', '-aliased-import'],
  ['renames through a namespace import', '-namespace-import'],
  ['reuses an existing BannerImage import', '-banner-image-imported'],
  ['leaves a locally shadowed CardBannerImage untouched', '-shadowed'],
  ['ignores type-only imports', '-type-import'],
  ['ignores the same name from other modules', '-not-hearth'],
  ['leaves a comment-only file untouched', '-comment-only'],
  ['leaves an empty file untouched', '-empty'],
  ['keeps a leading file comment', '-leading-comment'],
  ['keeps the old local name when BannerImage is already declared', '-collision'],
  ['keeps the old local name when an existing import is shadowed', '-existing-shadowed'],
  ['renames computed and shorthand references but not property names', '-references'],
  ['renames namespace type queries', '-namespace-type-query'],
  ['keeps exported names when renaming local exports', '-exports'],
  ['does not reuse a lowercase alias as a JSX tag', '-lowercase-alias'],
  ['renames static computed namespace accesses only', '-namespace-computed'],
] as const;

describe('migrate-card-banner-image', () => {
  it.each(fixtures)('%s', (_name, suffix) => {
    runTransformFixtureTest(__dirname, transform, `migrate-card-banner-image${suffix}`);
  });
});
