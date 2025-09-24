# Multi-stage build for HRMS Application

# Stage 1: Build Angular Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build --prod

# Stage 2: Setup Backend
FROM node:18-alpine AS backend
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]