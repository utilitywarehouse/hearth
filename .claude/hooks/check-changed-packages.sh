#!/bin/bash
# Stop: run typecheck and lint:ci (both non-mutating) for each packages/* dir with uncommitted changes.
# Exit 2 feeds failures back to Claude. Fails open when the environment can't run the checks.

input=$(cat)
# A previous Stop hook already sent Claude back; don't loop.
[ "$(printf '%s' "$input" | jq -r '.stop_hook_active // false')" = "true" ] && exit 0

root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

pkgs=$(git -C "$root" status --porcelain | sed -E 's/^.{3}//; s/.* -> //' | sed -nE 's#^"?packages/([^/]+)/.*#\1#p' | sort -u)
[ -n "$pkgs" ] || exit 0

failed=""
for p in $pkgs; do
  dir="$root/packages/$p"
  # Package deps not installed (fresh worktree / sandbox): skip rather than report noise.
  # tsc is usually hoisted to the repo root, so accept either location.
  [ -x "$dir/node_modules/.bin/tsc" ] || [ -x "$root/node_modules/.bin/tsc" ] || continue

  for script in typecheck lint:ci; do
    grep -q "\"$script\":" "$dir/package.json" || continue
    out=$(pnpm --dir "$dir" run "$script" 2>&1) || failed="$failed
--- packages/$p: $script ---
$(printf '%s' "$out" | tail -40)"
  done
done

if [ -n "$failed" ]; then
  printf 'Checks failed for changed packages. Fix these before finishing:%s\n' "$failed" >&2
  exit 2
fi
exit 0
