# SOEN357
Calendar Web Application

Step 1:
Make sure you have cloned the git repository and created a branch off of the main one (if you are working on something new).
**MAKE SURE TO FETCH AND PULL FROM MAIN BEFORE CREATING A NEW BRANCH TO AVOID MERGE CONFLICTS**

Step 2:
To run the server you must ensure that you have Node.js installed.
The following must be run in the terminal section of the project.
Make sure that you run:
**npm install mongodb** 
to be able to initialize the connection to the database.

Then, to start the server, type:
**npm run server**

Step 3:
To run the application you must ensure that you another terminal open.
Change the directory of the new terminal to:
**./engage-concordia**

Make sure that you run:
**npm install** to be able to install React and other web plugins.
You only need to do this command the first time you run the application.

Then, to start the application, type:
**npm start**

Step 4:
To login to the application please use the folliwing credentials:
- "email": **m_test@live.concordia.ca**
- "password": **abc_123ggt**

--------------------------------
*__Important Notes About The Project__*
Some of the features weren't implemented fully due to a lack of time. 
Thus some elements that are displayed on the application are static.

The following functionalities are fully implemented by the backend:
- User Login (User Authentication)
- Creation of Events
- Sharing of Events
- Setting Attendance to an Event
- Get *One* User Profile
- Get *All* User Profile
- Get *All* User Created and Shared Events of a Specific User
- Get *All* Created Events by a Specific User

The following elements are fully connected and functional:
- Log in of users
- Log out of users
- Profile name, description, and bio
- User's name on Navigation bar
- Adding an event
- Updating calendar when starting application and adding an event
- Differentiating between user's created and shared with events
- Calendar display of events and days of the month

The following elements are static within the application, and thus aren't connected to the MongoDB backend:
- "My Events" within the profile page
- All avatar profile
- The popup that happens when you click a calendar event
- Chat-box within the events details
- Number of people interested, going and not going

The following features were not implemented in the frontend:
- Sharing events
- Declaring of attendance at events
- Jump to another month by clicking on the month display name
- Messaging 