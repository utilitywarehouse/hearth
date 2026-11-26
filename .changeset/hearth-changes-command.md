---
'@utilitywarehouse/hearth-cli': minor
---

🌟 [FEATURE]: `hearth changes <package>` shows what changed in a Hearth package since the installed version

Lists every changelog entry after the version installed in your project, up to and including the latest version on
npm, with breaking changes first and a count of entries by type. Use it before an upgrade, or to check whether a newer
Hearth release already provides what you are about to write.

```sh
hearth changes react
hearth changes tokens --from 0.4.0 --to 0.5.1 --json
```

The command reads the latest version from `registry.npmjs.org` and the changelog from `raw.githubusercontent.com`. When
either cannot be reached, it exits `3` and says which host failed.
