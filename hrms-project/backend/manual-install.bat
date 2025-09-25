@echo off
echo Manual package installation...

echo Installing core packages one by one...
npm install express@4.18.2 --registry https://registry.npmmirror.com/
npm install mysql2@3.6.0 --registry https://registry.npmmirror.com/
npm install sequelize@6.32.1 --registry https://registry.npmmirror.com/
npm install bcryptjs@2.4.3 --registry https://registry.npmmirror.com/
npm install jsonwebtoken@9.0.2 --registry https://registry.npmmirror.com/
npm install cors@2.8.5 --registry https://registry.npmmirror.com/
npm install dotenv@16.3.1 --registry https://registry.npmmirror.com/
npm install moment@2.29.4 --registry https://registry.npmmirror.com/
npm install nodemon@3.0.1 --save-dev --registry https://registry.npmmirror.com/

echo Installation complete!
pause