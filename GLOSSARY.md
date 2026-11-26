# Hearth consumers

How repositories outside Hearth take up its published packages, and how Hearth nudges them to stay current.

## Language

### Consumers

**Consumer repo**:
A repository outside `hearth` that depends on one or more published `@utilitywarehouse/hearth-*` packages, such as js-mono or residential-mobile-app.
_Avoid_: Client app, downstream repo, product repo

**Drift**:
How far a consumer repo's Hearth dependency is behind the latest published version of that package, counted in minor and patch versions.
_Avoid_: Lag, staleness, version gap

**Held-back package**:
A Hearth package that a consumer repo has chosen to leave out of bump PRs.
_Avoid_: Pinned package (a pinned dependency has an exact version range and is still bumped)

### Nudging

**Bump PR**:
The single open pull request in a consumer repo that moves every Hearth dependency to its latest version and explains what the repo gains and what breaks. There is at most one per repo at a time.
_Avoid_: Upgrade PR, dependency PR, Dependabot PR

**Bump action**:
The reusable automation Hearth publishes that opens or updates a consumer repo's bump PR.
_Avoid_: Bot, Dependabot

**Caller workflow**:
The small scheduled workflow a consumer repo adds to run the bump action on its own schedule and with its own credentials.
_Avoid_: Adoption workflow

### Changes

**Breaking change**:
A changelog entry tagged `💔 [BREAKING CHANGE]`. It can appear in any release, including a 0.x minor, so the version number alone does not reveal it.
_Avoid_: Major change

**Migration codemod**:
A `hearth-codemod` transform that moves consumer code across a major version, such as `react/v1/migration`. Breaking changes inside 0.x minors have none.
_Avoid_: Upgrade script
