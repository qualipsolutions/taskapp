#!/bin/bash

# Docker build script for taskapp with external projects

echo "🚀 Building taskapp Docker container..."

# Setup external projects first
echo "🔧 Setting up external projects..."
./setup-external-projects.sh

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup external projects!"
    exit 1
fi

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t taskapp:latest .

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo ""
    echo "🚀 To run the container:"
    echo "   docker run -p 8080:8080 taskapp:latest"
    echo ""
    echo "🐳 Or use docker-compose:"
    echo "   docker-compose up -d"
    echo ""
    echo "📍 Container paths for commands:"
    echo "   External projects: /apps/"
    echo "   fyve-smart-links: /apps/fyve-smart-links"
    echo ""
    echo "📝 Example command update:"
    echo "   Old: cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave"
    echo "   New: cd /apps/fyve-smart-links && yarn prod:presave"
else
    echo "❌ Docker build failed!"
    exit 1
fi