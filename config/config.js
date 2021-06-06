module.exports = {
  MONGO_IP: process.env.MONGO_IP || 'mongo',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  PORT: process.env.PORT,
  EDWARD: process.env.EDWARD,
  NODE_ENVIRONMENT: process.env.NODE_ENVIRONMENT,
};
