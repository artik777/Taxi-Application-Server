# This is my RESTful API with NodeJS and MongoDB for Taxi Application.

## Tech stack

Node.js(Express.js), MongoDB(Mongoose.js)

## Deployment

Heroku

## Cron

cron-job.org

## Features

- Authentication with JWT
- User Create, Read, Update and Delete (CRUD) operations

## Installation

First you need to install Node.js

````
Install all npm dependecies

```console
npm install

````

## Configuration File

- Register MongoDb account https://www.mongodb.com/ to get DB_CONNECT key
- Register Heroku account https://www.heroku.com/ for hosting your API
- Write your own secret key.
- Modify the config/.env file to your environment variables, and put to your Heroku.

```ENV
PORT=5000
DB_CONNECT=YOUR_URL
TOKEN_SECRET=YOUR_SECRET
```

## Run

```console
node index.js
```
