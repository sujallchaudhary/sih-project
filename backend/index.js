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
const authRoutes = require('./src/routes/auth.route');
const teamRoutes = require('./src/routes/team.route');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/ps', psRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/team', teamRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});