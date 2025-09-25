@echo off
echo Fixing npm install issues...

echo Step 1: Clearing npm cache
npm cache clean --force

echo Step 2: Setting alternative registry
npm config set registry https://registry.npmmirror.com/

echo Step 3: Disabling strict SSL
npm config set strict-ssl false

echo Step 4: Removing old files
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo Step 5: Installing with alternative settings
npm install --registry https://registry.npmmirror.com/ --no-optional

echo Step 6: If above fails, trying with yarn
where yarn >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Yarn found, trying with yarn...
    yarn install
) else (
    echo Yarn not found, install it with: npm install -g yarn
)

pause