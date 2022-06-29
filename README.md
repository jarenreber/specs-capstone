# Canyon Social

## Devmountain Specializations Capstone

This React app was built to prove and test my knowledge of React and everything learned at Devmountain bootcamp.

### Build

This app was built with ReactJS in the front end and NodeJS in the backend. The Database is PostgreSQL.
To see all dependencies checkout the package.json.

### To Run this Project Locally

Fork the repository and clone it your preferred way.
Run `npm i` to install dependencies.
You will need a database. Heroku has free versions where you can then create a postgres database. Add into directory at the root level a .env file with a SERVER_PORT variable and a CONNECTION_STRING variable where the SERVER_PORT is equal to a port not in use and the CONNECTION_STRING is your URI string from Heroku.

At this time I do not have a seed file set up so tables will need to be created in the Database with a users, canyons, and posts table. A Seed file is in the works to simplify this process.

You will need to have nodemon installed to run the backend.
In one terminal run `nodemon server` and in another terminal run `npm run start`.
This will run the backend and the front end respectively.

### Thanks for checking out my repository!
