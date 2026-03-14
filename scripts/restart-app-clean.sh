#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HOST="${1:-127.0.0.1}"
PORT="${2:-4200}"
cd "$ROOT_DIR"

echo "Stopping any dev server on port ${PORT}..."
PIDS="$(lsof -nP -iTCP:${PORT} -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {print $2}' | sort -u || true)"
if [ -n "$PIDS" ]; then
  echo "$PIDS" | xargs kill
fi

echo "Clearing local Angular/build caches..."
rm -rf .angular/cache
rm -rf out-tsc
rm -rf dist/br-ui-framework

echo "Starting Angular dev server on http://${HOST}:${PORT}"
npm start -- --host "$HOST" --port "$PORT"
