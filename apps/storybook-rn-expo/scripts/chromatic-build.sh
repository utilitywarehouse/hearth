#!/usr/bin/env bash
set -euo pipefail

platform="${1:-}"
out_dir="build/chromatic"
mkdir -p "$out_dir"

case "$platform" in
  android)
    pnpm run build:preview:android
    cp build/hearth-react-native.apk "$out_dir/storybook.apk"
    ;;
  ios)
    pnpm run build:preview:ios
    extract_dir="build/chromatic-ios-extracted"
    rm -rf "$extract_dir"
    mkdir -p "$extract_dir"
    tar -xzf build/hearth-react-native.tar.gz -C "$extract_dir"
    app_path=$(find "$extract_dir" -maxdepth 3 -iname "*.app" -type d | head -n1)
    if [ -z "$app_path" ]; then
      echo "Could not find a .app bundle inside build/hearth-react-native.tar.gz" >&2
      exit 1
    fi
    rm -rf "$out_dir/storybook.app"
    mv "$app_path" "$out_dir/storybook.app"
    ;;
  *)
    echo "Usage: chromatic-build.sh <android|ios>" >&2
    exit 1
    ;;
esac
