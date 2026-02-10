---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `DescriptionListItem` heading width

Don't apply the width constraint when the direction is set to `row` as it
unnecessarily constrains long headings.
