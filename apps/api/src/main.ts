import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { createHealthRouter } from './routes/health';
import { createStorefrontRouter } from './routes/storefront';
import { createPdfRouter } from './routes/pdf';
import { bootstrapMedusa, shutdownMedusa } from './services/medusa';
import { logger } from './utils/logger';

async function bootstrap() {
  await bootstrapMedusa();

  const app = express();
  app.use(helmet());
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.json());
  app.use(
    rateLimit({
      windowMs: 60 * 1000,
      max: 120,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  app.use('/health', createHealthRouter());
  app.use('/store', createStorefrontRouter());
  app.use('/pdf', createPdfRouter());

  const server = app.listen(env.port, () => {
    logger.info(`API listening on port ${env.port}`);
  });

  const shutdown = async () => {
    logger.info('Shutting down gracefully');
    await shutdownMedusa();
    server.close(() => process.exit(0));
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

bootstrap().catch((error) => {
  logger.error(`Failed to start API: ${(error as Error).message}`);
  process.exit(1);
});
