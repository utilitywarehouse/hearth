---
status: accepted
---

# `hearth tokens` defaults to the web platform

Dark values exist only on the JS surface, which React Native consumes (ADR 0001). A consumer cannot be assumed to be on native, so `hearth tokens` with no `--platform` flag behaves as `--platform web`: it reports the CSS variable and the browser path, and never reports a dark value or a JS `darkPath`. `--platform native` reports the JS path with both the light and dark values.

## Considered options

- **Show every surface by default, labelling dark values as native-only.** Rejected. An agent working in a web project can lift a dark value from the output even when it is labelled, which is the mistake ADR 0001 says the CLI must never invite.
- **Detect the platform from the consumer's `package.json`.** Rejected for now. It adds inference to a lookup tool that otherwise only reads the manifest, and a monorepo with both platforms has no single answer. An explicit flag is predictable.

## Consequences

- The default output is safe for web consumers. Native consumers (and agents working in a native project) must pass `--platform native`.
- The `--json` output carries the platform it was filtered by, so a consumer of that output can tell which view it received.
- Skills that call the CLI (UWDS-5207) should pass `--platform native` explicitly in a React Native project.
