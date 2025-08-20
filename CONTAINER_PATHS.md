# Container Path Reference for TaskApp

This document provides the path mappings you need to update your commands when using the Docker container.

## Path Mappings

| Description | Host Path | Container Path |
|-------------|-----------|----------------|
| fyve-smart-links | `/Users/tshepomgaga/git/fyve/fyve-smart-links` | `/apps/fyve-smart-links` |

## Command Updates Required

### Before (Host Commands)
```bash
# Your current command
cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave
```

### After (Container Commands)
```bash
# Updated command for container
cd /apps/fyve-smart-links && yarn prod:presave
```

## API Usage Examples

### Example 1: Run presave command
```bash
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "task": "fyve-presave",
    "command": "cd /apps/fyve-smart-links && yarn prod:presave"
  }'
```

### Example 2: Run release command
```bash
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "task": "fyve-release",
    "command": "cd /apps/fyve-smart-links && yarn prod:release"
  }'
```

### Example 3: Check project status
```bash
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "task": "check-fyve-status",
    "command": "cd /apps/fyve-smart-links && ls -la"
  }'
```

## Available Scripts in fyve-smart-links

Based on the package.json, these scripts are available:

- `yarn start` - Start the application
- `yarn dev` - Development mode with nodemon
- `yarn prod:presave` - Production presave command
- `yarn prod:release` - Production release command
- `yarn prod:presaveUpdate` - Production presave update
- `yarn test:presave` - Test presave command
- `yarn test:release` - Test release command
- `yarn test:presaveUpdate` - Test presave update

## Container Management

### Build and Run
```bash
# Build the container
./docker-build.sh

# Run with docker-compose (recommended)
docker-compose up -d

# Or run directly
docker run -p 8080:8080 taskapp:latest
```

### Check Status
```bash
# View running containers
docker ps

# View logs
docker logs taskapp-container

# Stop container
docker-compose down
```

## Adding New External Projects

To add additional external projects:

1. **Update setup-external-projects.sh**:
   ```bash
   # Add new project copy command
   cp -r "/path/to/new/project" ./apps/new-project-name
   ```

2. **Update Dockerfile**:
   ```dockerfile
   # Add after existing project
   COPY ./apps/new-project-name /apps/new-project-name
   
   # Install dependencies
   WORKDIR /apps/new-project-name
   RUN yarn install --frozen-lockfile --production
   ```

3. **Update this document** with new path mappings

## Notes

- All external projects are owned by the `nextjs` user (UID 1001) in the container
- Dependencies are installed during the Docker build process
- The container runs on port 8080
- Commands are executed asynchronously - check logs for output