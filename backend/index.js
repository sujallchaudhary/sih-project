const express = require('express');
const dotenv = require('dotenv');
const dbConnection = require('./src/database/connection');
const cors = require('cors');
dotenv.config();

dbConnection();

const app = express();
app.use(cors());

//routes 
const psRoutes = require('./src/routes/ps.route');
app.use('/api/ps', psRoutes);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});