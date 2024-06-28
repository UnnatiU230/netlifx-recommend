const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;git 

app.use(bodyParser.json());
app.use('/api', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
