import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
    },
    mongo: {
      user: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      dbName: process.env.MONGO_DB,
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    apiKey: process.env.API_KEY,
    jwtSecret: process.env.JWT_SECRET,
  };
});
