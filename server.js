const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./model');  

require('dotenv').config();

sequelize.sync({ force: false })  
  .then(() => {
    console.log('✅ All tables created!');
  })
  .catch(err => {
    console.error('❌ Error syncing tables:', err);
    process.exit(1);  
  });

app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
