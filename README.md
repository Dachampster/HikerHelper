# Hiker Helper App

### **General Goals**

 1. Allow users to search for trails to hike on. 
 2. Allow users to use parameters to refine their search. 
 3. Display a list of results, or a list suggested trails nearby if no results are found. 
 4. Using a travel agent API, find booking to get to and stay at the nearest town to the trail site. 
 5. Store all search data and user data, including hashed password in MySQL. 
 6. Suggest trails to user based on their search data.
 
#### Contributors:

[bpzimmerman](https://github.com/bpzimmerman)
- Design and Management Database 
- Back-End

 [Dachampster](https://github.com/Dachampster)
- General Project Management
- Front End Polishing
- Password Authentication

 [CalebRenfrow](https://github.com/CalebRenfrow)
   - Front End Javascript
   - General Workhorse
  
  [IveliseSola](https://github.com/IveliseSola)
- Front End Specialist
- Unit Testing


#### Demo
The app is deployed in Heroku [here](https://hiker-helper.herokuapp.com/)

 

### **Unit Test**

#### What's inside

 "**Test/**"
  - seed.js: Conatains a seed of the SearchParam Model
  - seedUser.js: Contains a seed of the User Model
  - test.js: Contains the test.
  
 "**package.json/**"
  - Conatains all dependencies needed to run the test.js, including a script
    { "test": "mocha --compilers js:babel-register",
    "test:watch": "npm test -- --watch" }

  - Dependencies needed to run test.js
 -"mocha"
 -"chai"
 -"chai-http"
 -"babel-cli"

#### What it does?
It tests the correct association among  Sequelize Models.
It tests routes, it checks for the response datatype and how error are handled.

#### How to run the test

  1- run "npm install" in your terminal
  2- run "npm test" in your terminal
  
#### Demo Test
[Video](https://drive.google.com/open?id=1lL1igfPry0e3VMAjCt3NG3OB3-3WwdRs)
