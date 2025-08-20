# TaskApp Deployment Quick Reference

## Commands Overview

### 🚀 Build and Deploy to Docker Hub Only
```bash
./deploy.sh [version]
```

**Examples:**
```bash
# Deploy with version tag
./deploy.sh v1.2.0

# Deploy as latest
./deploy.sh
```

**This command:**
- Sets up external projects
- Builds Docker image
- Pushes to Docker Hub (`qualipsolutions/taskapp`)
- Does NOT deploy to Railway

### 🔄 After Making Code Changes
**Always run the deploy command to update Docker Hub:**
```bash
./deploy.sh [version]
```

## 🐳 Docker Hub

**Image Location:** `qualipsolutions/taskapp`

**Manual Commands:**
```bash
# Build and push
docker build -t qualipsolutions/taskapp:latest .
docker push qualipsolutions/taskapp:latest

# Pull and run
docker pull qualipsolutions/taskapp:latest
docker run -p 8080:8080 qualipsolutions/taskapp:latest
```

## 🚂 Railway Deployment

### ⚠️ Important: Deploy to Docker Hub First!
**You MUST push the image to Docker Hub before creating the Railway project.**

### Step-by-Step Railway Setup:

1. **First, deploy to Docker Hub:**
   ```bash
   ./deploy.sh v1.0.0
   ```

2. **Then create Railway project:**
   - Go to [Railway.app](https://railway.app)
   - Create new project
   - Choose "Deploy from Docker Hub"
   - Enter image: `qualipsolutions/taskapp:latest`

3. **Set environment variables in Railway:**
   ```
   PORT=8080
   NODE_ENV=production
   ```

4. **Deploy and test**

### Alternative: GitHub Integration
1. Push to GitHub
2. Connect Railway to repository
3. Uses [`railway.toml`](railway.toml:1) for configuration
4. Auto-deploys on push (but still builds from Dockerfile)

## 📝 Command Path Updates

**Before (Host):**
```bash
cd ~/git/fyve/fyve-smart-links/ && yarn prod:presave
```

**After (Container):**
```bash
cd /apps/fyve-smart-links && yarn prod:presave
```

## 🔧 Local Development

```bash
# Build and run locally
./docker-build.sh
docker-compose up -d

# View logs
docker logs taskapp-container

# Stop
docker-compose down
```

## 📋 Initial Setup Checklist

### First Time Setup:
- [ ] Make sure Docker is running
- [ ] Login to Docker Hub: `docker login`
- [ ] Run `./deploy.sh v1.0.0` to push initial image
- [ ] Verify image exists on Docker Hub
- [ ] Create Railway project using the Docker Hub image
- [ ] Set Railway environment variables
- [ ] Test deployed application

### After Code Changes:
- [ ] Make code changes
- [ ] Test locally with `docker-compose up`
- [ ] Run `./deploy.sh v1.x.x`
- [ ] Verify push to Docker Hub
- [ ] Railway will auto-update (if using Docker Hub image)
- [ ] Test deployed application
- [ ] Update command paths in your scripts (if needed)

## 🆘 Troubleshooting

**Docker login required:**
```bash
docker login
# Enter qualipsolutions credentials
```

**External project not found:**
```bash
# Check path in setup-external-projects.sh
ls -la /Users/tshepomgaga/git/fyve/fyve-smart-links
```

**Railway deployment fails:**
- Check environment variables are set
- Verify Docker image exists on Docker Hub
- Check Railway logs for errors