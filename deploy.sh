#!/bin/bash

# Deployment script for TaskApp with Docker Hub publishing
# Usage: ./deploy.sh <version> [--dry-run] [--push]
#
# Arguments:
#   version     Required. The version tag for the Docker image (e.g., v1.5.0)
#   --dry-run   Optional. Build the image but don't push to Docker Hub
#   --push      Optional. Skip build and only push existing image to Docker Hub

set -e

# Configuration
DOCKER_USERNAME="qualipsolutions"
IMAGE_NAME="taskapp"
REGISTRY="docker.io"

# Parse arguments
VERSION=""
DRY_RUN=false
PUSH_ONLY=false

for arg in "$@"; do
    case $arg in
        --dry-run)
            DRY_RUN=true
            shift
            ;;
        --push)
            PUSH_ONLY=true
            shift
            ;;
        *)
            if [ -z "$VERSION" ]; then
                VERSION="$arg"
            fi
            ;;
    esac
done

# Check if version is provided
if [ -z "$VERSION" ]; then
    echo "❌ Error: Version is required"
    echo ""
    echo "Usage: ./deploy.sh <version> [--dry-run] [--push]"
    echo ""
    echo "Examples:"
    echo "  ./deploy.sh v1.5.0                # Build and push"
    echo "  ./deploy.sh v1.5.0 --dry-run      # Build only, don't push"
    echo "  ./deploy.sh v1.5.0 --push         # Push existing image only"
    exit 1
fi

FULL_IMAGE_NAME="${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}"

# Display mode
if [ "$DRY_RUN" = true ]; then
    echo "🔍 DRY RUN MODE - Will build but not push"
elif [ "$PUSH_ONLY" = true ]; then
    echo "📤 PUSH ONLY MODE - Will push existing image"
else
    echo "🚀 Starting deployment process for ${FULL_IMAGE_NAME}"
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Skip build if push-only mode
if [ "$PUSH_ONLY" = false ]; then
    # Clean up old apps folder to ensure fresh copy
    echo "🧹 Cleaning up old apps folder..."
    if [ -d "apps" ]; then
        rm -rf apps
        echo "   Removed existing apps folder"
    fi

    # Setup external projects
    echo "🔧 Setting up external projects (copying fresh files)..."
    ./setup-external-projects.sh

    if [ $? -ne 0 ]; then
        echo "❌ Failed to setup external projects!"
        exit 1
    fi

    # Always build for linux/amd64 platform (required for cloud deployments)
    echo "🔨 Building Docker image for linux/amd64: ${FULL_IMAGE_NAME}"

    # Check if buildx is available
    if ! docker buildx version > /dev/null 2>&1; then
        echo "❌ Docker buildx is not available. Please update Docker Desktop."
        exit 1
    fi

    # Build for linux/amd64 platform
    echo "   Platform: linux/amd64"
    echo "   This may take a few minutes..."
    docker buildx build --platform linux/amd64 -t ${FULL_IMAGE_NAME} --load .

    if [ $? -ne 0 ]; then
        echo "❌ Docker build failed!"
        exit 1
    fi
else
    # In push-only mode, verify the image exists
    echo "🔍 Verifying image exists: ${FULL_IMAGE_NAME}"
    if ! docker image inspect ${FULL_IMAGE_NAME} > /dev/null 2>&1; then
        echo "❌ Image ${FULL_IMAGE_NAME} not found locally!"
        echo "   Build the image first with: ./deploy.sh ${VERSION}"
        exit 1
    fi
    echo "✅ Image found locally"
fi

# Skip push if dry-run mode
if [ "$DRY_RUN" = false ]; then
    # Also tag as latest if version is specified and not in push-only mode
    if [ "$VERSION" != "latest" ] && [ "$PUSH_ONLY" = false ]; then
        echo "🏷️  Tagging as latest..."
        docker tag ${FULL_IMAGE_NAME} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    fi

    # Check if user is logged in to Docker Hub
    echo "🔐 Checking Docker Hub authentication..."
    if ! docker info 2>/dev/null | grep -q "Username"; then
        echo "⚠️  Not logged in to Docker Hub. Attempting login..."
        docker login
        if [ $? -ne 0 ]; then
            echo "❌ Docker login failed!"
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

    # Push latest tag if version was specified and not push-only mode
    if [ "$VERSION" != "latest" ] && [ "$PUSH_ONLY" = false ]; then
        echo "📤 Pushing latest tag..."
        docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest
    fi
else
    echo ""
    echo "🔍 DRY RUN COMPLETE - Image built but not pushed"
    echo "   To push this image, run: ./deploy.sh ${VERSION} --push"
fi

# Display appropriate summary based on mode
echo ""
if [ "$DRY_RUN" = true ]; then
    echo "🎉 Dry run completed successfully!"
    echo ""
    echo "📋 Build Summary:"
    echo "   Image: ${FULL_IMAGE_NAME}"
    echo "   Platform: linux/amd64"
    echo "   Status: Built locally (not pushed)"
    echo ""
    echo "📝 Next Steps:"
    echo "   - Test locally: docker run -p 8080:8080 ${FULL_IMAGE_NAME}"
    echo "   - Push to registry: ./deploy.sh ${VERSION} --push"
elif [ "$PUSH_ONLY" = true ]; then
    echo "🎉 Push completed successfully!"
    echo ""
    echo "📋 Push Summary:"
    echo "   Image: ${FULL_IMAGE_NAME}"
    echo "   Registry: Docker Hub"
    echo "   Status: Available for deployment"
else
    echo "🎉 Deployment completed successfully!"
    echo ""
    echo "📋 Deployment Summary:"
    echo "   Image: ${FULL_IMAGE_NAME}"
    echo "   Registry: Docker Hub"
    echo "   Status: Available for deployment"
fi

# Show deployment instructions only if image was pushed
if [ "$DRY_RUN" = false ]; then
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
fi