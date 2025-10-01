import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 9000),
  databaseUrl: process.env.DATABASE_URL ?? 'mysql://root:root@localhost:3306/magnus_servis',
  redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
  paymentProvider: process.env.PAYMENT_PROVIDER ?? 'custom',
  paymentTestMode: process.env.PAYMENT_TEST_MODE === 'true',
};
