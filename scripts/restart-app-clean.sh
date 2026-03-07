#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

PIDS="$(lsof -nP -iTCP:4200 -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {print $2}')"
if [ -n "$PIDS" ]; then
  echo "$PIDS" | xargs kill
fi

rm -rf .angular/cache
npm start
