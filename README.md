# Deploy a NodeJS React app to AWS EC2

## Deploy with Docker

- Install Docker: `https://docs.docker.com/engine/install/ubuntu/`
- Clone repository: `git clone https://github.com/Haosmall/floor-plan-diagram.git`
- Provide ENV for blanks in file docker-compose.yml
- Run: `docker-compose up -d`

## Deploy without Docker

### Set up NodeJS:

    curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
    sudo apt update
    sudo apt install nodejs

### Set up nginx (Web serving, reverse proxying, and load balancing)

1. Install nginx: `sudo apt-get install nginx`
2. Verify the installation: `sudo nginx -v`
3. Start NGINX: `sudo nginx`
4. Verify that NGINX is up and running: `curl -I 127.0.0.1`

### Set up pm2 (Production process manager for Nodejs applications)

1. Install PM2: `npm install pm2@latest -g`
2. Verify the installation: `pm2 -v`

### Deploying the Front-end

1. Clone repository: `git clone https://github.com/Haosmall/floor-plan-diagram.git`
2. Install node_modules dependencies: `cd floor-diagram-client` `npm install`
3. Run build script: `npm run build`
4. copy build files to where nginx is serving from: `cp build/* /var/www/myapp/`
5. Restart nginx: `sudo systemctl restart nginx`

### Deploying the Back-end

1. Install node_modules dependencies: `cd floor-diagram-server` `npm install`
2. Start server `pm2 start src/index.js --name "server"`
3. Restart nginx: `sudo systemctl restart nginx`

### Done
