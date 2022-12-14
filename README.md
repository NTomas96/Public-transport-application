# Public transport application

## Overview:

This application simulates a digitalized public transport system.
Where everything is done online: administration, control and regular activities.
User roles and functionalities:
* Admin:	
  * Setup of: lines, stations, price lists and timetables.
* Controller:
  * Verification of tickets and users.
* Registered user:
  * Most of user profile functionalities, exploration of app and buying tickets (PayPal).
* User guest:
  * Exploration of app, buy ticket (PayPal).
	
## How to run:

#### Angular and Node.js:
* Download Node.js and npm at [Node.js](https://nodejs.org/en/download)
* Use this command to install angular: ` npm install -g @angular/cli `
	
#### Setup of SQL database:
* Setup your own database in Backend\Backend\Persistence\AppDbContext.cs in method: OnConfiguring.
* Or, import existing example AppDB from AddOns folder:
  * Admin:
    * username: testAdmin@&#65279;gmail.com
    * pass: testAdmin
  * Controller: 
    * username: testController@&#65279;gmail.com 
    * pass: testController
  * Registered user: 
    * username: testUser@&#65279;gmail.com 
    * pass: testUser	

#### Back-end startup:
* Use Visual studio 2017 or higher

#### Bus Service startup:	
* In `BusPositionService\JsonFile` is located `lines.json` file that needs to be copied to `BusPositionService\bin\Debug` folder.
* Use Visual studio 2017 or higher
	
#### Front-end startup:
* Open terminal in a front-end folder, use these commands:
  * Command to build fornt-end: ` npm install --save-dev @angular-devkit/build-angular `
  * Command to start front-end: ` ng serve `
		
##### The app is hosted on: localhost:4200
	

## University project: 

Don't need any 3rd party contributions, be free to fork and use for yourselves.
