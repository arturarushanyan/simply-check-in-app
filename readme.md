# CHECK IN APP

## Requirements

In order to be available to use the project, you will need Node.js installed on your environement.
Also you will need globally install Nodemon

## Install

    $ npm install
    $ npm install --global nodemon
    $ cd client
    $ npm install

First npm install should sole the second install. However on some OS it can throw an error. In that case you can manually cd in client folder and run npm install

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

## Project Structure

client - front end related code
    public - public served files
    src - project front end source code
       api - api for REST operations
       components = project's ReactJS components
       config - configuration file
       fonts - fonts for the project
       global-constants - global constants used in app
       helpers - helper functions
       styles - app styles

server - back end related code here
    constants - constants used in aplication (like messages,ect...)
    models - mongoose models for database model

