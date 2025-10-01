import { Router } from 'express';
import packageJson from '../../package.json' assert { type: 'json' };

export function createHealthRouter() {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({
      status: 'ok',
      version: packageJson.version,
    });
  });

  return router;
}
