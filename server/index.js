
const express = require('express');
const cors = require('cors');
const PORT = 4000;

const app = express();
const bodyParser = require('body-parser');

const router = require('./routes/user.routes');
const router1 = require('./routes/weatherReport')

app.use(cors());
app.use(bodyParser.json());

app.use(router)
app.use(router1)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


