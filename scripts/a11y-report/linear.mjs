// Keeps one Linear issue per component with accessibility violations.
//
// - A failing component with no open issue gets a new issue.
// - An open issue whose findings changed gets its description rewritten and a comment.
// - An open issue whose component is now clean gets one comment asking someone to
//   verify and close it. Issues are never closed automatically.
//
// Issues are matched by team, label and title, and each description ends with a
// fingerprint of its findings so unchanged issues aren't touched.
import { componentMarkdown, PACKAGE_NAMES, readmeLink } from './report.mjs';

const ENDPOINT = 'https://api.linear.app/graphql';
const FINGERPRINT = /a11y-report-fingerprint: ([a-z0-9]+)/;
const CLEAN = 'clean';

/** @typedef {import('./findings.mjs').ComponentGroup} ComponentGroup */
/** @typedef {import('./report.mjs').ReportLinks} ReportLinks */
/** @typedef {{ id: string, identifier: string, title: string, description?: string, url: string }} LinearIssue */
/**
 * @typedef {(
 *   | { type: 'create', key: string, title: string, description: string }
 *   | { type: 'update', key: string, issue: LinearIssue, description: string, comment: string }
 *   | { type: 'resolve', key: string, issue: LinearIssue, description: string, comment: string }
 * )} LinearOp
 */

const PACKAGE_BY_NAME = Object.fromEntries(Object.entries(PACKAGE_NAMES).map(([k, v]) => [v, k]));

export const issueTitle = (pkg, component) =>
  `[Accessibility]: fix \`${component}\` (${PACKAGE_NAMES[pkg] ?? pkg})`;

// Also matches the original "Accessibility: fix Button (hearth-react)" titles, so
// issues that haven't been renamed aren't duplicated.
const TITLE = /^\[?Accessibility\]?: fix `?([^`]+?)`? \(([a-z-]+)\)$/;

/** Labels added to new issues besides the marker label: the package, plus `extraLabels`. */
export const PACKAGE_LABELS = { react: 'react', 'react-native': 'react-native' };

/** `{ package, component }` for an issue this script created, or null. */
export function parseIssueTitle(title) {
  const match = title.match(TITLE);
  const pkg = match && PACKAGE_BY_NAME[match[2]];
  return pkg ? { package: pkg, component: match[1] } : null;
}

const footer = (fingerprint, links) =>
  [
    '---',
    `_Kept up to date by the ${readmeLink('weekly accessibility report', '', links)}. This description is rewritten when the findings change, so add notes as comments. Presentational stories can opt out: see ${readmeLink('Opting out', '#opting-out', links)}._`,
    '',
    `\`a11y-report-fingerprint: ${fingerprint}\``,
  ].join('\n');

/** @param {ComponentGroup} group @param {ReportLinks} links */
export function issueDescription(group, links = {}) {
  const run = links.runUrl ? ` Last checked in [this run](${links.runUrl}).` : '';
  return [
    `The weekly Storybook accessibility run found violations in **${group.component}** (\`${PACKAGE_NAMES[group.package] ?? group.package}\`).${run}`,
    '',
    componentMarkdown(group, links),
    footer(group.fingerprint, links),
  ].join('\n');
}

const fingerprintIn = issue => issue.description?.match(FINGERPRINT)?.[1];

const withFingerprint = (description = '', fingerprint) =>
  FINGERPRINT.test(description)
    ? description.replace(FINGERPRINT, `a11y-report-fingerprint: ${fingerprint}`)
    : `${description}\n\n\`a11y-report-fingerprint: ${fingerprint}\``;

/**
 * Decide what to change in Linear. Pure, so it can be tested and dry-run.
 *
 * @param {{
 *   groups: ComponentGroup[],
 *   openIssues: LinearIssue[],
 *   ranPackages: string[],
 *   links?: ReportLinks,
 * }} input
 * @returns {LinearOp[]}
 */
export function planLinearSync({ groups, openIssues, ranPackages, links = {} }) {
  const run = links.runUrl ? `[this week's run](${links.runUrl})` : "this week's run";
  const byKey = new Map();
  for (const issue of openIssues) {
    const parsed = parseIssueTitle(issue.title);
    if (parsed) byKey.set(`${parsed.package}/${parsed.component}`, issue);
  }

  /** @type {LinearOp[]} */
  const ops = [];
  for (const group of groups) {
    const issue = byKey.get(group.key);
    const description = issueDescription(group, links);
    if (!issue) {
      ops.push({
        type: 'create',
        key: group.key,
        title: issueTitle(group.package, group.component),
        description,
      });
    } else if (fingerprintIn(issue) !== group.fingerprint) {
      ops.push({
        type: 'update',
        key: group.key,
        issue,
        description,
        comment: `🔄 The accessibility findings changed in ${run}: ${group.rules.length} rule(s) across ${group.stories.length} story(ies). The description is updated.`,
      });
    }
  }

  const failing = new Set(groups.map(g => g.key));
  for (const [key, issue] of byKey) {
    const pkg = key.split('/')[0];
    // A package that didn't run has no findings, which doesn't mean it's fixed.
    if (failing.has(key) || !ranPackages.includes(pkg) || fingerprintIn(issue) === CLEAN) continue;
    ops.push({
      type: 'resolve',
      key,
      issue,
      description: withFingerprint(issue.description, CLEAN),
      comment: `✅ No accessibility violations found for this component in ${run}. Close this issue once you've checked it.`,
    });
  }
  return ops;
}

/** @param {string} apiKey */
export function createLinearClient(apiKey, fetchImpl = fetch) {
  return async (query, variables = {}) => {
    const res = await fetchImpl(ENDPOINT, {
      method: 'POST',
      // Personal API keys go in the header as-is, without "Bearer".
      headers: { Authorization: apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || body.errors?.length) {
      const detail = body.errors?.map(e => e.message).join('; ') ?? `HTTP ${res.status}`;
      throw new Error(`Linear API request failed: ${detail}`);
    }
    return body.data;
  };
}

async function findTeamId(client, teamKey) {
  const data = await client(
    'query($key: String!) { teams(filter: { key: { eq: $key } }) { nodes { id } } }',
    { key: teamKey }
  );
  const id = data.teams.nodes[0]?.id;
  if (!id) throw new Error(`Linear team ${teamKey} not found.`);
  return id;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Resolve the project to its UUID. Accepts the UUID or anything Linear's
 * `project(id:)` lookup accepts, such as the project identifier or URL slug.
 * Checked before any issue is created, so a wrong value can't create issues
 * outside the project.
 */
async function resolveProjectId(client, project) {
  if (!project || UUID.test(project)) return project;
  try {
    const data = await client('query($id: String!) { project(id: $id) { id name } }', {
      id: project,
    });
    console.log(`Linear: adding new issues to project "${data.project.name}".`);
    return data.project.id;
  } catch (err) {
    throw new Error(
      `Linear project ${project} not found. Set LINEAR_PROJECT_ID to the project's UUID or URL slug. (${err.message})`
    );
  }
}

/** The team's label, or a workspace label, with this name. Created on the team if missing. */
async function findOrCreateLabelId(client, teamId, name, { dryRun }) {
  const data = await client(
    'query($name: String!) { issueLabels(filter: { name: { eqIgnoreCase: $name } }) { nodes { id isGroup team { id } } } }',
    { name }
  );
  // A label group can't be assigned to an issue, only the labels inside it.
  const labels = data.issueLabels.nodes.filter(l => !l.isGroup);
  const label = labels.find(l => l.team?.id === teamId) ?? labels.find(l => !l.team);
  if (label) return label.id;
  if (dryRun) return null;
  const created = await client(
    'mutation($input: IssueLabelCreateInput!) { issueLabelCreate(input: $input) { issueLabel { id } } }',
    { input: { name, teamId, color: '#8E44AD' } }
  );
  return created.issueLabelCreate.issueLabel.id;
}

async function listOpenIssues(client, teamId, labelId) {
  const issues = [];
  let after = null;
  do {
    const data = await client(
      `query($teamId: ID!, $labelId: ID!, $after: String) {
        issues(first: 100, after: $after, filter: {
          team: { id: { eq: $teamId } },
          labels: { id: { eq: $labelId } },
          state: { type: { nin: ["completed", "canceled"] } }
        }) {
          nodes { id identifier title description url }
          pageInfo { hasNextPage endCursor }
        }
      }`,
      { teamId, labelId, after }
    );
    issues.push(...data.issues.nodes);
    after = data.issues.pageInfo.hasNextPage ? data.issues.pageInfo.endCursor : null;
  } while (after);
  return issues;
}

/**
 * @param {{
 *   client: ReturnType<typeof createLinearClient>,
 *   teamKey: string,
 *   labelName: string,
 *   extraLabels?: string[],
 *   projectId?: string,
 *   groups: ComponentGroup[],
 *   ranPackages: string[],
 *   links?: ReportLinks,
 *   dryRun?: boolean,
 * }} options
 */
export async function syncLinear({
  client,
  teamKey,
  labelName,
  extraLabels = [],
  projectId,
  groups,
  ranPackages,
  links,
  dryRun = false,
}) {
  const teamId = await findTeamId(client, teamKey);
  const resolvedProjectId = await resolveProjectId(client, projectId);
  const labelId = await findOrCreateLabelId(client, teamId, labelName, { dryRun });
  const openIssues = labelId ? await listOpenIssues(client, teamId, labelId) : [];
  const ops = planLinearSync({ groups, openIssues, ranPackages, links });

  // Only look up (or create) the labels this run will actually use.
  const labelIds = new Map();
  const labelsFor = async pkg => {
    const names = [PACKAGE_LABELS[pkg], ...extraLabels].filter(Boolean);
    for (const name of names) {
      if (!labelIds.has(name)) {
        labelIds.set(name, await findOrCreateLabelId(client, teamId, name, { dryRun }));
      }
    }
    return [labelId, ...names.map(name => labelIds.get(name))].filter(Boolean);
  };

  for (const op of ops) {
    const name = op.type === 'create' ? op.title : `${op.issue.identifier} ${op.issue.title}`;
    console.log(`Linear: ${dryRun ? 'would ' : ''}${op.type} ${name}`);
    if (dryRun) continue;
    if (op.type === 'create') {
      const ids = await labelsFor(op.key.split('/')[0]);
      const data = await client(
        'mutation($input: IssueCreateInput!) { issueCreate(input: $input) { issue { identifier url } } }',
        {
          input: {
            teamId,
            title: op.title,
            description: op.description,
            labelIds: ids,
            ...(resolvedProjectId ? { projectId: resolvedProjectId } : {}),
          },
        }
      );
      console.log(`  → ${data.issueCreate.issue.url}`);
      continue;
    }
    await client(
      'mutation($id: String!, $input: IssueUpdateInput!) { issueUpdate(id: $id, input: $input) { success } }',
      { id: op.issue.id, input: { description: op.description } }
    );
    await client(
      'mutation($input: CommentCreateInput!) { commentCreate(input: $input) { success } }',
      { input: { issueId: op.issue.id, body: op.comment } }
    );
  }
  return ops;
}
