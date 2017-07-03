'use strict';

import express from 'express';
import path from 'path';

const port = process.env.PORT || 8080;
const app = express();

// serve static assets normally
app.use(express.static(__dirname + '/dist'));

// handle every other route with index.html, which will contain 
// a scripttag to your application's JavaScript file(s). 
// app.get('*', (request, response) => {   
// 	console.log(request.url);   
// 	response.sendFile(path.resolve(__dirname, 'dist', 'index.html')) ;
// });

app.listen(port);
console.log("server started on port " + port);