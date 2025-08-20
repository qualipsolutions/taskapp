#!/bin/bash
exec /usr/bin/chromium-browser \
  --no-sandbox \
  --disable-setuid-sandbox \
  --disable-dev-shm-usage \
  --disable-accelerated-2d-canvas \
  --no-first-run \
  --disable-gpu \
  --headless=new \
  --disable-background-timer-throttling \
  --disable-backgrounding-occluded-windows \
  --disable-renderer-backgrounding \
  --disable-features=TranslateUI \
  --disable-ipc-flooding-protection \
  --disable-web-security \
  --disable-features=VizDisplayCompositor \
  --remote-debugging-port=9222 \
  "$@"