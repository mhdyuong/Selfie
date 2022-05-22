/* What Do I Want My Server To Do 
   1. Serve webpages (html, css, javascript etc)
   2. Recieve requests (save data, send data)
   3. Send responses
*/

// https://stackoverflow.com/questions/27599614/var-express-requireexpress-var-app-express-what-is-express-is-it
const express = require('express'); 
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