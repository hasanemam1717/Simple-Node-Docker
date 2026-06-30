# Node.js Docker App — AWS Deployment Learning Project

A minimal Express.js application designed to teach you how to **Dockerize** a Node.js app and deploy it to **AWS**.

## Quick Start (Local)

```bash
# 1. Install dependencies
npm install

# 2. Run directly
npm start

# 3. Or run with Docker
docker compose up --build
```

Visit `http://localhost:3000`

## Docker Commands to Learn

```bash
# Build the image
docker build -t node-docker-app .

# Run a container
docker run -d -p 3000:3000 --name my-app node-docker-app

# View running containers
docker ps

# See logs
docker logs my-app

# Stop & remove
docker stop my-app && docker rm my-app
```

## AWS Deployment Options

### 1. Amazon ECS (Fargate) — simplest

```bash
# Tag & push to Amazon ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account>.dkr.ecr.us-east-1.amazonaws.com

docker tag node-docker-app:latest <account>.dkr.ecr.us-east-1.amazonaws.com/my-repo:latest
docker push <account>.dkr.ecr.us-east-1.amazonaws.com/my-repo:latest
```

Then create an ECS cluster + task definition + service (using Fargate) via the AWS Console.

### 2. Elastic Beanstalk

Zip the project (without `node_modules`) and upload to Beanstalk — it auto-detects Node.js and Docker.

### 3. EC2 (manual)

SSH into an EC2 instance, install Docker, pull the image, and run.

## Endpoints

| Route           | Description                    |
| --------------- | ------------------------------ |
| `GET /`         | Welcome message + container ID |
| `GET /health`   | Health check (for AWS ALB)     |
| `GET /api/info` | App metadata                   |

## Dockerfile Highlights

- **Multi-stage build** — keeps the final image small
- **Non-root user** — follows AWS security best practices
- **`npm ci`** — deterministic installs for CI/CD
- **Alpine base** — minimal footprint
# Simple-Node-Docker
