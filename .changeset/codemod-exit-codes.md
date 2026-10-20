---
'@utilitywarehouse/hearth-codemod': patch
---

🐛 [BUG FIX]: `hearth-codemod` exits 0 after files fail to transform or the run is killed

A file that failed to parse, or a run killed by a signal, left the exit code at
0, so CI passed with unmigrated files. The CLI now exits non-zero in both
cases, reports the real `git` error instead of "stash or commit your changes"
when `git` itself fails, and rejects codemod names that contain `..` or point
at test directories.
