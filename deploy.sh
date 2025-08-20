#!/bin/bash

# Deployment script for TaskApp with Docker Hub publishing
# Usage: ./deploy.sh [version]

set -e

# Configuration
DOCKER_USERNAME="qualipsolutions"
IMAGE_NAME="taskapp"
REGISTRY="docker.io"

# Get version from argument or use 'latest'
VERSION=${1:-latest}
FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

echo "🚀 Starting deployment process for ${FULL_IMAGE_NAME}"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Setup external projects
echo "🔧 Setting up external projects..."
./setup-external-projects.sh

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup external projects!"
    exit 1
fi

# Build the Docker image
echo "🔨 Building Docker image: ${FULL_IMAGE_NAME}"
docker build -t ${FULL_IMAGE_NAME} .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

# Also tag as latest if version is specified
if [ "$VERSION" != "latest" ]; then
    echo "🏷️  Tagging as latest..."
    docker tag ${FULL_IMAGE_NAME} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
fi

# Check if user is logged in to Docker Hub
echo "🔐 Checking Docker Hub authentication..."
if ! docker info | grep -q "Username: ${DOCKER_USERNAME}"; then
    echo "⚠️  Not logged in to Docker Hub. Please run: docker login"
    read -p "Do you want to login now? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker login
    else
        echo "❌ Cannot push to Docker Hub without authentication."
        exit 1
    fi
fi

# Push to Docker Hub
echo "📤 Pushing to Docker Hub: ${FULL_IMAGE_NAME}"
docker push ${FULL_IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed ${FULL_IMAGE_NAME}"
else
    echo "❌ Failed to push to Docker Hub!"
    exit 1
fi

# Push latest tag if version was specified
if [ "$VERSION" != "latest" ]; then
    echo "📤 Pushing latest tag..."
    docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Deployment Summary:"
echo "   Image: ${FULL_IMAGE_NAME}"
echo "   Registry: Docker Hub"
echo "   Status: Available for deployment"
echo ""
echo "🚂 Railway Deployment:"
echo "   1. Connect your Railway project to this repository"
echo "   2. Set the following environment variables in Railway:"
echo "      - PORT=8080"
echo "      - NODE_ENV=production"
echo "   3. Railway will automatically pull and deploy: ${FULL_IMAGE_NAME}"
echo ""
echo "🐳 Manual Docker Run:"
echo "   docker run -p 8080:8080 ${FULL_IMAGE_NAME}"
echo ""
echo "📝 Container Path Reference:"
echo "   External projects: /apps/"
echo "   fyve-smart-links: /apps/fyve-smart-links"
echo ""
echo "   Update your commands from:"
echo "   cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave"
echo "   To:"
echo "   cd /apps/fyve-smart-links && yarn prod:presave"