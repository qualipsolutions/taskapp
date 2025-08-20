# Docker Setup for TaskApp

This document describes the Docker containerization setup for the TaskApp Next.js project with external project support.

## Architecture Overview

The Docker container includes:
- **Main Application**: Next.js TaskApp running on port 8080
- **External Projects**: Located in `/apps/` directory within the container
- **Multi-stage Build**: Optimized for production deployment

## Container Structure

```
/app                    # Main TaskApp (Next.js)
├── server.js          # Next.js standalone server
├── .next/             # Built Next.js application
├── public/            # Static assets
└── package.json       # Main app dependencies

/apps                   # External projects directory
└── fyve-smart-links/   # External Node.js project
    ├── package.json    # Project dependencies
    ├── app.js         # Main application file
    ├── routes/        # API routes
    ├── services/      # Business logic
    └── ...            # Other project files
```

## Building the Container

### Option 1: Using the Build Script (Recommended)
```bash
./docker-build.sh
```

### Option 2: Manual Docker Build
```bash
docker build -t taskapp:latest .
```

### Option 3: Using Docker Compose
```bash
docker-compose build
```

## Running the Container

### Option 1: Docker Run
```bash
docker run -p 8080:8080 taskapp:latest
```

### Option 2: Docker Compose (Recommended)
```bash
docker-compose up -d
```

### Option 3: Development Mode with Logs
```bash
docker-compose up
```

## Command Path Updates

When sending commands to the TaskApp API, update the paths to use the container paths:

### Before (Host Paths)
```json
{
  "task": "fyve-presave",
  "command": "cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave"
}
```

### After (Container Paths)
```json
{
  "task": "fyve-presave", 
  "command": "cd /apps/fyve-smart-links && yarn prod:presave"
}
```

## Container Paths Reference

| Project | Host Path | Container Path |
|---------|-----------|----------------|
| fyve-smart-links | `/Users/tshepomgaga/git/fyve/fyve-smart-links` | `/apps/fyve-smart-links` |
| Future Project 1 | `/path/to/project1` | `/apps/project1` |
| Future Project N | `/path/to/projectN` | `/apps/projectN` |

## Adding New External Projects

To add new external projects to the container:

1. **Update the Dockerfile**:
   ```dockerfile
   # Add after the fyve-smart-links section
   COPY /path/to/your/project /apps/your-project-name
   
   # Install dependencies
   WORKDIR /apps/your-project-name
   RUN yarn install --frozen-lockfile --production
   ```

2. **Update your commands** to use the new container path:
   ```json
   {
     "task": "your-task",
     "command": "cd /apps/your-project-name && your-command"
   }
   ```

## Environment Variables

The container sets the following environment variables:

- `NODE_ENV=production`
- `PORT=8080`
- `HOSTNAME=0.0.0.0`

## Security Features

- **Non-root user**: Container runs as `nextjs` user (UID 1001)
- **Minimal base image**: Uses Alpine Linux for smaller attack surface
- **Production dependencies**: Only production dependencies are installed for external projects

## Troubleshooting

### Build Issues

1. **External project not found**:
   ```
   Error: COPY failed: file not found in build context
   ```
   - Ensure the external project path exists on the host system
   - Check that the path in the Dockerfile matches your system

2. **Permission issues**:
   ```
   Error: permission denied
   ```
   - Ensure the build script is executable: `chmod +x docker-build.sh`
   - Check Docker daemon permissions

### Runtime Issues

1. **Port already in use**:
   ```bash
   # Find and stop conflicting processes
   lsof -i :8080
   # Or use a different port
   docker run -p 8081:8080 taskapp:latest
   ```

2. **External project dependencies missing**:
   - Rebuild the container to ensure all dependencies are installed
   - Check the external project's package.json for required dependencies

## Container Management

### View running containers
```bash
docker ps
```

### View container logs
```bash
docker logs taskapp-container
```

### Stop the container
```bash
docker-compose down
```

### Remove the container and image
```bash
docker-compose down --rmi all
```

## Performance Optimization

The Docker setup includes several optimizations:

- **Multi-stage build**: Reduces final image size
- **Standalone Next.js output**: Minimal runtime dependencies
- **Production-only dependencies**: Smaller external project footprint
- **Docker layer caching**: Efficient rebuilds when only code changes

## API Usage Examples

### Start a task in external project
```bash
curl -X POST http://localhost:8080/api/run \
  -H "Content-Type: application/json" \
  -d '{
    "task": "fyve-presave",
    "command": "cd /apps/fyve-smart-links && yarn prod:presave"
  }'
```

### Check if task is running
```bash
curl -X GET http://localhost:8080/api/run
```

## Next Steps

1. Test the container build and deployment
2. Update your command scripts to use container paths
3. Add additional external projects as needed
4. Consider setting up CI/CD for automated builds