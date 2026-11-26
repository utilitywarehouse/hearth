#!/bin/bash
# PostToolUse (Edit|Write|MultiEdit): run Prettier on the file Claude just edited.
# Fails open: never blocks, and skips anything Prettier can't handle or isn't installed.

file=$(jq -r '.tool_input.file_path // empty')
root="${CLAUDE_PROJECT_DIR:-$(pwd)}"

[ -n "$file" ] && [ -f "$file" ] || exit 0
case "$file" in
  "$root"/*) ;;
  *) exit 0 ;;
esac
case "$file" in
  *.ts|*.tsx|*.js|*.jsx|*.mjs|*.cjs|*.css|*.md|*.mdx|*.json) ;;
  *) exit 0 ;;
esac

prettier="$root/node_modules/.bin/prettier"
[ -x "$prettier" ] || exit 0

# Respects .prettierignore; ignored files are left untouched.
"$prettier" --write --log-level silent "$file" >/dev/null 2>&1
exit 0
