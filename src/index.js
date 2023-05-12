//Running server and requiring dotenv
require('dotenv').config();
const app = require('./server');
const port = app.get('port');

//Setting view engine
app.set('view engine', 'ejs');

//Server listening
app.listen(port, () => console.log(`Listening on port: ` + port));