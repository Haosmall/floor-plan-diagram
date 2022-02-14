# Deploy a NodeJS React app to AWS EC2

Initial:

    cd ./floor-diagram-server
    npm install

Start server:

    npm start

## Set up the EC2 instance:

1. Launch an EC2 instance
2. Connect to it
3. install NodeJS on it:

   curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
   sudo apt update
   sudo apt install nodejs

## Set up nginx (Web serving, reverse proxying, and load balancing)

1. Install nginx: `sudo apt-get install nginx`
2. Verify the installation: `sudo nginx -v`
3. Start NGINX: `sudo nginx`
4. Verify that NGINX is up and running: `curl -I 127.0.0.1`
5. Update server blocks and map / to client
6. Build client files and copy them to where nginx is serving from
7. Restart nginx: `sudo systemctl restart nginx`

## Set up pm2 (Production process manager for Nodejs applications)

1. Install PM2: `npm install pm2@latest -g`
2. Verify the installation: `pm2 -v`
3. Add the server as a process

## Deploying the Frontend

1. Clone your repository: `git clone https://github.com/Haosmall/floor-plan-diagram.git`
2. Install node_modules dependencies: `cd floor-diagram-client` `npm install`
3. Run build script: `npm run build`
4. copy build files to where nginx is serving from: `cp build/* /var/www/`
5. Restart nginx: `sudo systemctl restart nginx`

## Done
