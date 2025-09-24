@echo off
echo Deploying HRMS to Heroku...

echo.
echo ========================================
echo Step 1: Login to Heroku
echo ========================================
heroku login

echo.
echo ========================================
echo Step 2: Create Heroku App
echo ========================================
set /p APP_NAME=Enter your Heroku app name: 
heroku create %APP_NAME%

echo.
echo ========================================
echo Step 3: Add MySQL Database
echo ========================================
heroku addons:create cleardb:ignite -a %APP_NAME%

echo.
echo ========================================
echo Step 4: Set Environment Variables
echo ========================================
heroku config:set NODE_ENV=production -a %APP_NAME%
heroku config:set JWT_SECRET=your-super-secure-jwt-secret -a %APP_NAME%

echo.
echo ========================================
echo Step 5: Deploy to Heroku
echo ========================================
git add .
git commit -m "Deploy to Heroku"
git push heroku main

echo.
echo ========================================
echo Step 6: Open Application
echo ========================================
heroku open -a %APP_NAME%

echo.
echo Deployment Complete!
pause