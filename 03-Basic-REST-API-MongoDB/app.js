require('dotenv');
const express = require('express');
const app = express();
const {PORT} = require('../core/environment/index');



app.listen(PORT, () => console.log(`Server is Listening on PORT ${PORT}`));