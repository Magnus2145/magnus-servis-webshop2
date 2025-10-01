import { Router } from 'express';
import { streamPdf } from '../services/pdf.service';

export function createPdfRouter() {
  const router = Router();

  router.get('/test', (req, res) => {
    const template = (req.query.template as any) ?? 'ponuda';
    streamPdf(res, template);
  });

  return router;
}
