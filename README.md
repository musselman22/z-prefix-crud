# To start locally you need to establish a postgresql instance.
- USERNAME = postgres
- PASSWORD = postgres
- DATABASE_NAME = task_management


# After the database is setup, start the sever and client
- In the terminal navigate to the server directory/ folder
- In server.js uncomment line 8 and comment out line 10
- Run `npm start` this will seed the database and start the server on localhost:3001
- Run `cd client`
- Run `npm start` this will start the react front end on localhost:3000
- Navigate to localhost:3000 to view the app.

# Deployed environment and app info
- The front end is built using react and is located in server/client
- The back end is built using Node.js and Express.  It has one route for each CRUD capability (get, post, put, delete)
- The database is postgresql and in the deployed environment hooks up to Heroku's postgresql database.
- The app is deployed on Heroku at https://z-prefix-crud-musselman.herokuapp.com/ 