const mongoose = require('mongoose');
require('dotenv').config();

console.log('Connecting to:', process.env.MONGODB_URI ? 'URI Loaded' : 'No URI found');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('SUCCESS: MongoDB Atlas Connected 100%!');
    process.exit(0);
  })
  .catch(err => {
    console.error('ERROR connecting to Atlas:', err.message);
    process.exit(1);
  });
