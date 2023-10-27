const mongoose = require('mongoose');

// connection string
// bisa juga bikin database baru
mongoose.connect('mongodb://eduwork:eduwork@127.0.0.1:27017/eduwork-mongoose?authSource=admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('server database terhubung');
});
// ga pake export
