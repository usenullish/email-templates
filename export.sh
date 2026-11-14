#!/usr/bin/env bash

set -euo pipefail

rm -rf templates

for dir in emails/*/; do
  type=$(basename "$dir")

  if [[ "$type" == _* ]]; then
    continue
  fi

  email export --dir "emails/$type" --outDir "templates/$type/html"
  email export --plainText --dir "emails/$type" --outDir "templates/$type/text"
done
