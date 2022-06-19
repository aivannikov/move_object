# Object Coordinates Service

This is the REST service for getting the object's actual coordinates as it moves.\
Technologies used:
- Node.js v18.3.0
- Express.js
- Redis - for data storage
- Jest - for unit testing 

## Installation and Run

Install node.js and [npm](https://www.npmjs.com/).

Use npm package manager  to install the dependencies 
```bash
npm install 
```

Start the service:
```bash
npm run start 
```

To run the unit tests:
```bash
npm run test:unit 
```

## Usage

The following operations are available:

**GET api/coordinates** - returns the current coordinates 

**POST api/coordinates/landing** - receives the new coordinates in json format. This is used then to calculate the new ones according to the object on going. Validation runs before processing.
```json
{ "data": { "x":90, "y":400, "direction": "EAST" } } 
``` 
**POST api/coordinates/move** - accepts the letters as movements and changes the coordinates.\
Validation of incoming json runs before its processing.\
The json for move is the following:
```json
{ "data": { "move": "LLR" } } 
``` 


**Main rule**: call `POST api/coordinates/landing` before using any other operations.\
As this will give the "starting point" for the object and all its moves will be calculated from this.\
The service could send response with the following status: 
- 200 - OK
- 204 - Empty Response
- 400 - Bad Request 
- 500 - Internal Error

You can use Postman or Curl for requesting the endpoints
Below are Curl commands for all the operations.

`curl -X POST http://localhost:3000/api/coordinates/landing -H 'Content-Type: application/json' -d '{ "data": { "x":100, "y":400, "direction": "SOUTH" } }'`

`curl -X POST http://localhost:3000/api/coordinates/move -H 'Content-Type: application/json' -d '{ "data": { "move": "LLR" } }'`

`curl -v GET http://localhost:3000/api/coordinates/`