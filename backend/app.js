require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', (() => {
  let router = express.Router();
  router.use('/tasks/', require("./routes/tasks"));
  return router;
})());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});