let mongoUri;
let mongoose = require('mongoose');
let log = (require('./logger')).logger;

// mongo connection string
if (process.env.NODE_ENV === 'production') {
  mongoUri = process.env.MONGODB_URI;
} else if (process.env.NODE_ENV === 'test') {
  mongoUri = process.env.MONGODB_TEST;
} else {
  mongoUri = process.env.MONGODB_DEV;
}

// init database connection
mongoose.connect(mongoUri);

// successful connection
mongoose.connection.on('connected', () => log.info(`Sucessful MongoDB connection to ${mongoUri}`));

// connection error
mongoose.connection.on('error', function(err) {
  log.error(`MongoDB connection error: ${err}`);
  return mongoose.disconnect();
});

// disconnected connection
mongoose.connection.on('disconnected', () => log.error('MongoDB disconnected'));

// nopde process ended so close the connection
process.on('SIGINT', () =>
  mongoose.connection.close(function() {
    log.info('MongoDB disconnected through app termination');
    return process.exit(0);
  })
);
