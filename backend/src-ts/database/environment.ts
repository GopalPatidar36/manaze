import dotenv from 'dotenv';
import config from "config";

interface DBAdminAccessSecret {
  HOST: string;
  PORT: string;
  SCHEMA: string;
  USERNAME: string;
  PASSWORD: string;
}

interface Config {
  DBAdminAccessSecret: DBAdminAccessSecret;
  PRIVATEKEY?: string;
}
dotenv.config();

async function environment(): Promise<void> {
  const dbConfig: DBAdminAccessSecret = {
    HOST: process.env.HOST || '',
    PORT: process.env.PORT || '3306',
    SCHEMA: process.env.SCHEMA || '',
    USERNAME: process.env.USERNAME || '',
    PASSWORD: process.env.PASSWORD || '',
  };

  if (process.env.ENV === 'local') {
    (config as Config).DBAdminAccessSecret = {
      HOST: 'localhost',
      PORT: '3306',
      SCHEMA: '',
      USERNAME: '',
      PASSWORD: '',
    };
  } else {
    (config as Config).DBAdminAccessSecret = dbConfig;
    (config as Config).PRIVATEKEY = process.env.PRIVATEKEY;
  }
}

export default environment;
