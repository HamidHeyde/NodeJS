# Server to Replace Express & Mongoose

This application, will create a server to receive requests and handle them, by passing the request to the any desired function (being defined in router.js) and serves them back following items on any desired port:
#### StatusCode
The first argument is the Status Code for the requested URL (200: Success, 404: Not Found, etc.) 
#### Data/Error
As for the second element, this will pass a JSON object that contains either Error Message or Requested Data

## NOTE
Adding up Config.js enables developers to switch in between environments (Development, Production) using NODE_ENV when running the server from Comandline/Bash.

Through this application, we will connect to a Mongodb database and read data without using "MONGOOSE" and by just using "Mongodb Driver".

This application receives URL, Query String, Method, Headers & Payload from the incomming request. It the, packs them in an object and passes that to the function responsible for handling the URL.

The URL handlers can be easily added in the apiHandlers.js File.

Through routers.js file, you can connect api handlers to the incomming URL(s). In other words, you can define, which incomming URL should go to what handler.

#### Building and application using the same logic, would cut the application dependency on "Express" or "Mongoose".

For using this app, install Mongodb driver first, as it has not been uploaded.
```
npm install --save mongodb
```