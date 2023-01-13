# Code for Summer of Azure project 2022
## Use of web server (in webServer directory)
1. Download this project (e.g. using Git)
2. Run with npm start (from webServer directory)
3. The webpage can now be access on port 80!

### Requirements
- Requires node.js to be installed in order to run server
- A public IP address attacted to teh machine running server is required if you wish to allow people to access the server from the internet
- Port 80 is also required to be open to allow incoming traffic to access the server
- Internet access is required for commincating with database

### Notes
- Designed to run on Ubuntu operating system
- Edit config.js to changed the database that the feedback is on
- Process runs in the background automatically
- Sets up port forwards from 80 to 3000 automatically
- To run without automatic stuff above use: node ./bin/www
- If you want the web server to start automatically upon startup then software like crontab is required
