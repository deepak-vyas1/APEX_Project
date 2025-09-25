@echo off
title HRMS Backend Complete Fix
color 0A

echo ========================================
echo    HRMS Backend Complete Installation
echo ========================================

echo [1/8] Cleaning previous installation...
if exist node_modules (
    echo Removing node_modules...
    rmdir /s /q node_modules
)
if exist package-lock.json (
    echo Removing package-lock.json...
    del package-lock.json
)

echo [2/8] Clearing npm cache...
npm cache clean --force

echo [3/8] Configuring npm settings...
npm config set registry https://registry.npmmirror.com/
npm config set strict-ssl false
npm config set fetch-retries 5
npm config set fetch-retry-mintimeout 20000
npm config set fetch-retry-maxtimeout 120000

echo [4/8] Creating optimized package.json...
echo {> package.json
echo   "name": "hrms-backend",>> package.json
echo   "version": "1.0.0",>> package.json
echo   "main": "server.js",>> package.json
echo   "scripts": {>> package.json
echo     "start": "node server.js",>> package.json
echo     "dev": "nodemon server.js">> package.json
echo   },>> package.json
echo   "dependencies": {>> package.json
echo     "express": "4.18.2",>> package.json
echo     "mysql2": "3.6.0",>> package.json
echo     "sequelize": "6.32.1",>> package.json
echo     "bcryptjs": "2.4.3",>> package.json
echo     "jsonwebtoken": "9.0.2",>> package.json
echo     "cors": "2.8.5",>> package.json
echo     "dotenv": "16.3.1",>> package.json
echo     "moment": "2.29.4">> package.json
echo   },>> package.json
echo   "devDependencies": {>> package.json
echo     "nodemon": "3.0.1">> package.json
echo   }>> package.json
echo }>> package.json

echo [5/8] Installing packages with timeout handling...
npm install --registry https://registry.npmmirror.com/ --no-optional --no-audit --no-fund --timeout=300000

if %ERRORLEVEL% NEQ 0 (
    echo [5/8] Retrying with alternative registry...
    npm config set registry https://registry.npmjs.org/
    npm install --no-optional --no-audit --no-fund --timeout=300000
)

if %ERRORLEVEL% NEQ 0 (
    echo [5/8] Installing packages individually...
    call :install_individual
)

echo [6/8] Verifying installation...
npm list --depth=0

echo [7/8] Creating startup script...
echo @echo off > start-server.bat
echo echo Starting HRMS Backend Server... >> start-server.bat
echo node server.js >> start-server.bat
echo pause >> start-server.bat

echo [8/8] Installation Complete!
echo ========================================
echo   Backend is ready to run!
echo   Use: npm start or start-server.bat
echo ========================================
pause
goto :eof

:install_individual
echo Installing packages one by one...
npm install express@4.18.2 --registry https://registry.npmmirror.com/ --no-audit
npm install mysql2@3.6.0 --registry https://registry.npmmirror.com/ --no-audit
npm install sequelize@6.32.1 --registry https://registry.npmmirror.com/ --no-audit
npm install bcryptjs@2.4.3 --registry https://registry.npmmirror.com/ --no-audit
npm install jsonwebtoken@9.0.2 --registry https://registry.npmmirror.com/ --no-audit
npm install cors@2.8.5 --registry https://registry.npmmirror.com/ --no-audit
npm install dotenv@16.3.1 --registry https://registry.npmmirror.com/ --no-audit
npm install moment@2.29.4 --registry https://registry.npmmirror.com/ --no-audit
npm install nodemon@3.0.1 --save-dev --registry https://registry.npmmirror.com/ --no-audit
goto :eof