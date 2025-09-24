@echo off
echo Building HRMS Project for Production...

echo.
echo ========================================
echo Building Frontend (Angular)
echo ========================================
cd frontend
call npm install
call ng build --configuration production
cd ..

echo.
echo ========================================
echo Installing Backend Dependencies
echo ========================================
cd backend
call npm install --production
cd ..

echo.
echo ========================================
echo Production Build Complete!
echo ========================================
echo Frontend build: hrms-project/frontend/dist/
echo Backend ready: hrms-project/backend/
echo.
pause