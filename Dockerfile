# ----------------
# Stage 1: Install dependencies
# ----------------
FROM node:20-alpine AS deps

WORKDIR /usr/src/app

# Copy only the dependency manifests first for better layer caching
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# ----------------
# Stage 2: Production image
# ----------------
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Create a non-root user for security (best practice for AWS / production)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only the production dependencies from the deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY app.js .

# Switch to the non-root user
USER appuser

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "app.js"]
