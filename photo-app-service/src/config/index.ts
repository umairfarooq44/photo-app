process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
process.env.PORT = process.env.PORT || '4000';

export default {
  /**
   * Port
   */
  port: parseInt(process.env.PORT, 10),

  env: process.env.NODE_ENV,

  db: {
    debug: process.env.NODE_ENV === 'dev',
    databaseURL: process.env.MONGODB_CONNECTION_STRING || ''
  }
};
