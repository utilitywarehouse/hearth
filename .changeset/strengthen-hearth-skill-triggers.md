---
'@utilitywarehouse/hearth-react': patch
'@utilitywarehouse/hearth-react-native': patch
---

🧹 [HOUSEKEEPING]: Strengthen Claude Code skill trigger reliability

The `hearth-react` and `hearth-react-native` Claude Code skills used
descriptive trigger language ("use this implicitly", "do not wait for
explicit mention"), which made them easy to skip in favour of more
specifically-scoped, hard-gated skills such as `figma-design-to-code`. The
skill description and a new mandatory "when to use" section now use
gate-style language and anchor the trigger to concrete moments: writing or
editing a file that imports the package, adapting Figma `get_design_context`
reference output, and delegating component research to a subagent.

No runtime behaviour changes for consumers of either package.
