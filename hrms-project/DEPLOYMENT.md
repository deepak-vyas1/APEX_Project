# HRMS Deployment Guide

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker installed
- Docker Compose installed

#### Steps
1. **Clone and navigate to project:**
   ```bash
   git clone https://github.com/deepak-vyas1/APEX_Project.git
   cd APEX_Project/hrms-project
   ```

2. **Run deployment script:**
   ```bash
   deploy-docker.bat
   ```

3. **Access application:**
   - URL: http://localhost:3000
   - Admin: admin@company.com / password123

#### Manual Docker Commands
```bash
# Build and start
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Option 2: Heroku Deployment

#### Prerequisites
- Heroku CLI installed
- Git repository initialized

#### Steps
1. **Run deployment script:**
   ```bash
   deploy-heroku.bat
   ```

2. **Manual Heroku deployment:**
   ```bash
   # Login to Heroku
   heroku login
   
   # Create app
   heroku create your-hrms-app
   
   # Add database
   heroku addons:create cleardb:ignite
   
   # Set environment variables
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-secret-key
   
   # Deploy
   git push heroku main
   ```

### Option 3: Local Production Build

#### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Angular CLI

#### Steps
1. **Build for production:**
   ```bash
   build-production.bat
   ```

2. **Setup database:**
   ```bash
   mysql -u root -p
   CREATE DATABASE hrms_db;
   ```

3. **Configure environment:**
   - Copy `.env.production` to `.env`
   - Update database credentials

4. **Start application:**
   ```bash
   cd backend
   node server.production.js
   ```

## 🔧 Configuration

### Environment Variables
```env
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=hrms_user
DB_PASSWORD=secure_password
DB_NAME=hrms_db
JWT_SECRET=your-super-secure-secret
```

### Database Setup
```sql
CREATE DATABASE hrms_db;
CREATE USER 'hrms_user'@'%' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON hrms_db.* TO 'hrms_user'@'%';
FLUSH PRIVILEGES;
```

## 🌐 Cloud Deployment

### AWS EC2
1. Launch EC2 instance (Ubuntu 20.04)
2. Install Docker and Docker Compose
3. Clone repository
4. Run `docker-compose up -d`

### Google Cloud Platform
1. Create Compute Engine instance
2. Setup Cloud SQL (MySQL)
3. Deploy using Docker or direct installation

### Azure
1. Create Virtual Machine
2. Setup Azure Database for MySQL
3. Deploy application

## 📊 Monitoring & Maintenance

### Health Check
- Endpoint: `/api/health`
- Returns server status and timestamp

### Logs
```bash
# Docker logs
docker-compose logs -f hrms-app

# Application logs
tail -f /var/log/hrms/app.log
```

### Database Backup
```bash
# Create backup
mysqldump -u hrms_user -p hrms_db > backup.sql

# Restore backup
mysql -u hrms_user -p hrms_db < backup.sql
```

## 🔒 Security Checklist

- [ ] Change default JWT secret
- [ ] Use strong database passwords
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Regular security updates
- [ ] Monitor access logs

## 🚨 Troubleshooting

### Common Issues

**Database Connection Error:**
- Check database credentials
- Verify database server is running
- Check network connectivity

**Port Already in Use:**
```bash
# Find process using port
netstat -ano | findstr :3000
# Kill process
taskkill /PID <process_id> /F
```

**Build Errors:**
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall
- Check Node.js version compatibility

### Support
- GitHub Issues: https://github.com/deepak-vyas1/APEX_Project/issues
- Documentation: README.md