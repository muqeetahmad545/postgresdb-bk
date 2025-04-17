const express = require('express');
require('dotenv').config();
const app = express();
const { sequelize } = require('./model');
const userRoutes = require('./routes/userRoutes');
const { API_BASE } = require('./constants/pathconstansts');

app.use(express.json());
app.use(`${API_BASE}/users`, userRoutes);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully!');
    return sequelize.sync({ force: false });
  })
  .then(() => {
    console.log('✅ All tables synced!');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Failed to connect or sync DB:', err.message || err);
    process.exit(1);
  });

