#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HOST="${1:-127.0.0.1}"
PORT="${2:-4200}"

cd "$ROOT_DIR"

if [[ ! -d node_modules ]]; then
  echo "node_modules not found. Installing dependencies..."
  npm install
fi

echo "Starting Angular dev server on http://${HOST}:${PORT}"
npm start -- --host "$HOST" --port "$PORT"
