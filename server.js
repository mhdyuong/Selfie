/* What Do I May Want My Server To Do 
   1. Serve webpages (html, css, javascript etc)
   2. Recieve requests (save data, send data)
   3. Send responses
   4. Save to database
   5. autheticate
*/


// https://stackoverflow.com/questions/27599614/var-express-requireexpress-var-app-express-what-is-express-is-it
// https://stackoverflow.com/questions/52474458/whats-the-difference-between-var-express-requireexpress-and-var-app-ex
// https://en.wikipedia.org/wiki/Factory_method_pattern
// https://www.geeksforgeeks.org/what-are-factory-functions-in-javascript/ (Example 2)
const express = require('express'); 
const Datastore = require('nedb'); // ?? In-memory only datastore (no need to load the database) What is it?
//const res = require('express/lib/response');
// like an import statement, give me everything in the express package and save it into this express variable
// returns a function reference, that function is called with express()
const app = express(); 
// the whole library, the whole node package express comes in as a function...the express variable above holds a function
// app is an object returned by express()
//The default export of express is a bit unusual in that it's a function that also has properties on it that are also functions (methods)
app.listen(3000, () => console.log("Listening at port 3000"));
app.use(express.static('public')); 
//Here are the file the public can view
//Serving up the webpage
app.use(express.json({limit: '1mb'}));
//what comes in is read as json
const database = new Datastore('database.db'); // database.db does not need to be manually created
database.loadDatabase(); //load the file, load the exisiting file from last when the server ran to memeory, if it has never run -> create the file 
//database.insert({name: 'eh', status: "alive"}); testing to see if inserting into the database works

app.post('/api', (request, response)=> { // address to where I want the information to be sent
   console.log(request.body); // the data being sent from client is in json...does this method understand that? no
   //const data = request.body;
   const data = request.body;
   const timestamp = Date.now();
   data.timestamp = timestamp;
   database.insert(data);

   response.json({  //sending information back to client in response to the particular request
      status: "success",
      latitude: data.lat, //the data being send is stored in request...inside body...(refer to response body for the post request in client code)
      longitude: data.long,
      text: data.text,
      timestamp: timestamp
   });
});
// this is receiving info from the client per their post request
//setting up the API endpoint
// request variable holds everything in the request
// response is a variable that is used to send things back to the client

app.get('/api', (request, response)=> { 
   database.find({}, (err, data) =>{
      if(err){
         response.end();
         return;
      }
      response.json(data)
   });    
});
// this is sending info to the client per their get request
//setting up the API endpoint