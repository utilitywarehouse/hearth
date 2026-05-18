---
'@utilitywarehouse/hearth-react-icons': patch
'@utilitywarehouse/hearth-react': patch
---

🧹 [HOUSEKEEPING]: Improve build pipeline

CI was failing as it did not have the memory heap to build the react and
react-icons packages. Generation of declarations has been passed to tsc, while
tsup now only bundles the code.
