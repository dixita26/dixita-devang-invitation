#!/bin/sh
set -eu

PORT="3000"
if command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Port $PORT is already in use. Stop the existing project server, then run npm run dev again."
  exit 1
fi

exec next dev --hostname 127.0.0.1 --port "$PORT"
