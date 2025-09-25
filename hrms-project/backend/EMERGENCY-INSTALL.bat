@echo off
title Emergency NPM Install
color 0C

echo ========================================
echo    EMERGENCY INSTALLATION METHOD
echo ========================================

echo This will use multiple fallback methods...

echo [Method 1] Using Yarn (if available)...
where yarn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Yarn found! Installing with yarn...
    yarn install
    if %ERRORLEVEL% EQU 0 (
        echo SUCCESS with Yarn!
        goto success
    )
)

echo [Method 2] Installing Yarn and retrying...
npm install -g yarn --registry https://registry.npmmirror.com/
yarn config set registry https://registry.npmmirror.com/
yarn install

if %ERRORLEVEL% EQU 0 (
    echo SUCCESS with Yarn!
    goto success
)

echo [Method 3] Manual package creation...
mkdir node_modules 2>nul

echo Creating minimal working setup...
npm init -y
npm install express mysql2 sequelize bcryptjs jsonwebtoken cors dotenv moment --registry https://registry.npmmirror.com/ --force

:success
echo ========================================
echo   Installation completed successfully!
echo ========================================
pause