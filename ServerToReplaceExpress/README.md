# Server to Replace Express

This application, will create a server to receive requests and serves them back following items on any desired port:
#### StatusCode
The first argument is the Status Code for the requested URL (200: Success, 404: Not Found, etc.) 
#### Data/Error
As for the second element, this will pass a JSON object that contains either Error Message or Requested Data

## NOTE
This application receives URL, Query String, Method, Headers & Payload from the incomming request. It the, packs them in an object and passes that to the function responsible for handling the URL.

The URL handlers can be easily added in the apiHandlers.js File.

Through routers.js file, you can connect api handlers to the incomming URL(s). In other words, you can define, which incomming URL should go to what handler.
