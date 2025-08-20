#!/bin/bash

# Setup script to prepare external projects for Docker build

echo "🔧 Setting up external projects for Docker build..."

# Create apps directory in build context
mkdir -p ./apps

# Copy external projects to build context
EXTERNAL_PROJECT_PATH="/Users/tshepomgaga/git/fyve/fyve-smart-links"

if [ ! -d "$EXTERNAL_PROJECT_PATH" ]; then
    echo "❌ Error: External project not found at $EXTERNAL_PROJECT_PATH"
    echo "Please ensure the fyve-smart-links project exists at the specified path."
    exit 1
fi

echo "📁 Copying fyve-smart-links to build context..."
cp -r "$EXTERNAL_PROJECT_PATH" ./apps/fyve-smart-links

# Remove node_modules and other build artifacts from copied project
echo "🧹 Cleaning up copied project..."
rm -rf ./apps/fyve-smart-links/node_modules
rm -rf ./apps/fyve-smart-links/.git
rm -rf ./apps/fyve-smart-links/downloads/*
rm -rf ./apps/fyve-smart-links/cypress/videos
rm -rf ./apps/fyve-smart-links/cypress/screenshots

echo "✅ External projects setup complete!"
echo "📂 Projects available in ./apps/"
ls -la ./apps/