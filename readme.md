# CHECK IN APP

## Requirements

In order to be available to use the project, you will need Node.js installed on your environement.
Also you will need globally install Nodemon

## Install

    $ npm install
    $ npm install --global nodemon
    $ cd client
    $ npm install

First npm install should solve the second install wit --prefix. However on some OS-es it can throw an error. In that case you can manually cd in client folder and run npm install

## Start & watch

    $ npm start

## Simple build for production

    $ npm run build

## Project Structure

client - front end related code

public - public served files

client/src - project front end source code

client/api - api for REST operations

client/components = project's ReactJS components

client/config - configuration file

client/fonts - fonts for the project

client/global-constants - global constants used in app

client/helpers - helper functions

client/styles - app styles

server - back end related code here

server/constants - constants used in aplication (like messages,ect...)

server/models - mongoose models for database model

