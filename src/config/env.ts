import path from 'path';
import * as dotenv from 'dotenv';
const envPath = path.join(__dirname, '..', '..', '.env');
dotenv.config({ path: envPath });

export default {
  dbconfig: {
    dbname: process.env.DB_NAME || '',
    dbhost: process.env.DB_HOST || '',
    dbpassword: process.env.DB_PASSWORD || '',
    dbuser: process.env.DB_USER || '',
    dbport: 5432,
  },
  PORT: process.env.PORT || 4000,
  SALT_FACTOR: 10,
  HOME_DOMAIN_URL: process.env.HOME_DOMAIL_URL || 'http://localhost:4000',
  API_URL: 'http://localhost:4000/api/v1',
  WEBSITE_NAME: process.env.WEBSITE_NAME || 'Project FOR NODE.JS USING TYPESCRIPT',
  secret: process.env.SECRET || 'sdcvfkn3rjrfenwde34fmvnd',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
   CLIENT_ID: process.env.CLIENT_ID || '',
   CLIENT_SECRET: process.env.CLIENT_SECRET || '',

   CALLBACK_URL: process.env.CALLBACK_URL || "/auth/google/callback"
  
};
