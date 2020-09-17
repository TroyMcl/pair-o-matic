// const dotenv = require('dotenv');
const app = require('./app');

const port = 3045;
app.listen(port, () => {console.log(`ready to serve up some pairs on port ${port}`)});
