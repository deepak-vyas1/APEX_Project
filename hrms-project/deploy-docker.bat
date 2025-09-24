@echo off
echo Deploying HRMS with Docker...

echo.
echo ========================================
echo Step 1: Build and Start Containers
echo ========================================
docker-compose down
docker-compose build --no-cache
docker-compose up -d

echo.
echo ========================================
echo Step 2: Check Container Status
echo ========================================
docker-compose ps

echo.
echo ========================================
echo Step 3: View Logs
echo ========================================
echo To view logs, run: docker-compose logs -f

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo Application URL: http://localhost:3000
echo Database: MySQL on port 3306
echo.
echo To stop: docker-compose down
echo To restart: docker-compose restart
echo.
pause