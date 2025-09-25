@echo off
title HRMS Backend Setup - Run Me First
color 0B

echo ========================================
echo    HRMS BACKEND COMPLETE SETUP
echo ========================================
echo.
echo This will fix ALL npm installation issues!
echo.
echo Choose your method:
echo [1] Complete Automatic Fix (Recommended)
echo [2] Network Fix + Installation
echo [3] Emergency Installation (Last Resort)
echo [4] Exit
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Running Complete Fix...
    call COMPLETE-FIX.bat
) else if "%choice%"=="2" (
    echo Running Network Fix first...
    call NETWORK-FIX.bat
    echo Now running installation...
    call COMPLETE-FIX.bat
) else if "%choice%"=="3" (
    echo Running Emergency Installation...
    call EMERGENCY-INSTALL.bat
) else if "%choice%"=="4" (
    exit
) else (
    echo Invalid choice! Running default fix...
    call COMPLETE-FIX.bat
)

echo.
echo ========================================
echo    SETUP COMPLETE!
echo ========================================
echo.
echo Your backend is now ready to run!
echo Use: npm start
echo.
pause