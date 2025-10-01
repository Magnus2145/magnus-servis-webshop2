import { randomUUID } from 'node:crypto';
import { env } from '../config/env';
import { logger } from '../utils/logger';

export type PaymentIntentStatus = 'authorized' | 'captured' | 'refunded' | 'failed';

export interface PaymentIntentInput {
  amount: number;
  currency: string;
  customerEmail?: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentIntentResult {
  id: string;
  status: PaymentIntentStatus;
  testMode: boolean;
  reference: string;
}

export class PaymentStubService {
  constructor(private readonly testMode = env.paymentTestMode) {}

  async authorize(input: PaymentIntentInput): Promise<PaymentIntentResult> {
    logger.info('Authorizing payment intent', {
      amount: input.amount,
      currency: input.currency,
      customerEmail: input.customerEmail,
    });

    return {
      id: randomUUID(),
      status: 'authorized',
      testMode: this.testMode,
      reference: this.buildReference('AUTH'),
    };
  }

  async capture(intentId: string): Promise<PaymentIntentResult> {
    logger.info('Capturing payment intent', { intentId });

    return {
      id: intentId,
      status: 'captured',
      testMode: this.testMode,
      reference: this.buildReference('CAPTURE'),
    };
  }

  async refund(intentId: string, amount?: number): Promise<PaymentIntentResult> {
    logger.info('Refunding payment intent', { intentId, amount });

    return {
      id: intentId,
      status: 'refunded',
      testMode: this.testMode,
      reference: this.buildReference('REFUND'),
    };
  }

  private buildReference(prefix: string) {
    const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();
    return `${prefix}-${suffix}`;
  }
}

export const paymentStubService = new PaymentStubService();
