#Outdated information due to fact, that camera system is a ftp client

# Setup and run ftp server
- On Mac you can use [Quick FTP](https://apps.apple.com/de/app/quickftp-server/id1451646819?mt=12)
- ℹ️ to fake camera system ftp server

# Cron job
- Move to Parkplatz folder
- `npx ts-node app-to-cams/cron.ts`
###### Infos
- `ctrl + c` stop command in mac os terminal
- Compiles and runs every time configured in cron.ts
- Is sending files regularly from app database to camera ftp server

# Start ftp server
`sudo node ftp-server.ts`