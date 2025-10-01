import { randomUUID } from 'node:crypto';
import type { Response } from 'express';
import { logger } from '../utils/logger';
import { streamPdf } from './pdf.service';

export interface ShippingLabelInput {
  orderId: string;
  carrier?: 'GLS' | 'DPD' | 'HP' | 'TEST';
  recipient: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface ShippingLabelResult {
  trackingNumber: string;
  carrier: string;
  labelUrl: string;
}

export class ShippingStubService {
  async createLabel(input: ShippingLabelInput): Promise<ShippingLabelResult> {
    const carrier = input.carrier ?? 'TEST';
    const trackingNumber = `${carrier}-${randomUUID().slice(0, 8).toUpperCase()}`;

    logger.info('Generating shipping label stub', { orderId: input.orderId, carrier, trackingNumber });

    const labelUrl = `https://example.com/labels/${trackingNumber}.pdf`;

    return {
      trackingNumber,
      carrier,
      labelUrl,
    };
  }

  streamTestLabel(res: Response) {
    streamPdf(res, 'ponuda');
  }
}

export const shippingStubService = new ShippingStubService();
