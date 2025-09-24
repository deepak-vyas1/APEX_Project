# Render Deployment Guide

## Main File for Render: `backend/server.js`

## Render Deployment Steps:

### 1. GitHub Repository
- Push your code to GitHub
- Repository: https://github.com/deepak-vyas1/APEX_Project

### 2. Render Dashboard
1. Go to https://render.com
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `APEX_Project`
5. Select branch: `main`

### 3. Render Configuration
**Build & Deploy Settings:**
- **Name:** hrms-app
- **Environment:** Node
- **Region:** Oregon (US West)
- **Branch:** main
- **Root Directory:** `hrms-project`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### 4. Environment Variables
Add these in Render dashboard:
```
NODE_ENV=production
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=hrms_db
JWT_SECRET=your_jwt_secret_key_here
PORT=10000
```

### 5. Database Setup
1. In Render dashboard: "New +" → "PostgreSQL"
2. Name: hrms-database
3. Copy connection details to environment variables:
```
DATABASE_URL=postgresql://username:password@host:port/database
```

### 6. Deploy
- Click "Create Web Service"
- Render will automatically build and deploy
- Your app will be available at: https://your-app-name.onrender.com

## Important Files:
- **Main File:** `backend/server.js`
- **Package.json:** Root level package.json
- **Build Command:** Builds Angular frontend first, then backend
- **Start Command:** Starts Node.js server

## Login Credentials:
- Admin: admin@company.com / password123
- Employee: john.doe@company.com / password123