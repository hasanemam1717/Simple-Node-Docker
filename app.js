const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "Node Docker App";

// Middleware
app.use(express.json());

// Health check endpoint — AWS ALB / ECS / EC2 health checks rely on this
app.get("/health", (_req, res) => {
  res
    .status(200)
    .json({
      status: "healthy",
      app: APP_NAME,
      timestamp: new Date().toISOString(),
    });
});

// Root endpoint
app.get("/", (_req, res) => {
  res.json({
    message: `Hello from ${APP_NAME}!`,
    environment: process.env.NODE_ENV || "development",
    containerId: require("crypto").randomBytes(4).toString("hex"),
  });
});

// Sample API endpoint
app.get("/api/info", (_req, res) => {
  res.json({
    app: APP_NAME,
    version: "1.0.0",
    node: process.version,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on port ${PORT}`);
});
