@echo off
title Network Configuration Fix
color 0E

echo ========================================
echo    NETWORK CONFIGURATION FIX
echo ========================================

echo [1] Flushing DNS cache...
ipconfig /flushdns

echo [2] Resetting network settings...
npm config delete proxy
npm config delete https-proxy
npm config delete registry
npm config set registry https://registry.npmmirror.com/
npm config set strict-ssl false
npm config set maxsockets 1

echo [3] Setting timeout values...
npm config set fetch-retries 10
npm config set fetch-retry-mintimeout 30000
npm config set fetch-retry-maxtimeout 300000

echo [4] Testing connectivity...
ping -n 1 registry.npmmirror.com
if %ERRORLEVEL% EQU 0 (
    echo Network connectivity OK!
) else (
    echo Network issue detected, using offline mode...
    npm config set prefer-offline true
)

echo [5] Network configuration complete!
echo Now run: COMPLETE-FIX.bat
pause