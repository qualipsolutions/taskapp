#!/bin/bash
exec /usr/bin/chromium-browser \
  --no-sandbox \
  --disable-setuid-sandbox \
  --disable-dev-shm-usage \
  --no-first-run \
  --disable-gpu \
  --headless=new \
  --disable-blink-features=AutomationControlled \
  --disable-features=IsolateOrigins,site-per-process \
  --disable-web-security \
  --window-size=1920,1080 \
  --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" \
  "$@"