Public-transport-application

Overview:
	This application simulates a digitalized public transport system.
	Where everything is done online: administration, control and regular activities.
	User roles and functionalities:
		Admin:	
			- Setup: lines, stations, price lists, timetables
		Controller:
			- Verification of tickets and users
		Registered user:
			- Most of user profile functionalities and exploration of app, by ticket (PayPal)
		User guest:
			- Exploration of app, buy ticket (PayPal)
		
How to run:
	Angular and Node.js:
		* Download Node.js and npm at: https://nodejs.org/en/download/
		
		* Use this command to install angular: ' npm install -g @angular/cli '
		
	Setup of SQL database:
		* Setup your own database in Backend\Backend\Persistence\AppDbContext.cs in method: OnConfiguring.
		* Or, import existing example AppDB from AddOns folder:
			* Admin: 
				username: testAdmin@gmail.com 
				pass: testAdmin
			* Controller: 
				username: testController@gmail.com 
				pass: testController
			* Registered user: 
				username testUser@gmail.com 
				pass: testUser	
	
	Back-end startup:
		* Use Visual studio 2017 or higher

	Bus Service startup:	
		* In BusPositionService\JsonFile is lines.json that needs to be copied to BusPositionService\bin\Debug folder
		
		* Use Visual studio 2017 or higher
		
	Front-end startup:
		Open terminal in a front-end folder, use these commands:
		* Command to build fornt-end: ' npm install --save-dev @angular-devkit/build-angular '
		
		* Command to start front-end: ' ng serve '
		
	The app is hosted on : localhost:4200
	

University project: 
	Don't need 3rd party contributions, be free to fork and use for yourselves.
