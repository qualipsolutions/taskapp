// Chrome launcher configuration for containerized environments
// This file helps configure Puppeteer to work properly in Docker containers

const originalLaunch = require('puppeteer').launch;

// Override Puppeteer launch with container-friendly defaults
require('puppeteer').launch = function (options = {}) {
  const containerOptions = {
    headless: 'new', // Use new headless mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-gpu',
      '--disable-background-timer-throttling',
      '--disable-backgrounding-occluded-windows',
      '--disable-renderer-backgrounding',
      '--disable-features=TranslateUI',
      '--disable-ipc-flooding-protection',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
    ],
    executablePath:
      process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
    ...options,
  };

  // Merge args if provided
  if (options.args) {
    containerOptions.args = [...containerOptions.args, ...options.args];
  }

  return originalLaunch(containerOptions);
};

module.exports = require('puppeteer');
