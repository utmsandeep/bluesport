# BlueSport

Coaches and Players.

# System Dependencies 

1-Node and NPM. \
2-Active mongodb running on port 27017.


# Installation & Initialization

Clone the repo and run the following commands in root directory of your project from terminal.

Install the project dependencies.
  ```
  npm install
  ```
Run the npm run init command , it will generate 1 admin and 2 coaches , find the email and password from the console.
  ```
  npm run init
  ```
Start the server using npm run start command.This will start the server on port 8001.
  ```
  npm run start
  ```
Now import the BlueSport.postman_collection.json file (available at root directory of project) in postman.Collection uses variables for access tokens , please make sure you update the variables after login.

# License
MIT