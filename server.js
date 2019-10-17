const express = require("express");
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, './public/dist/public')));
app.use(bodyparser.json());

require('./server/config/database.js');
require('./server/config/routes.js')(app);

app.listen(8000, function () {console.log('listening on port 8000')});
