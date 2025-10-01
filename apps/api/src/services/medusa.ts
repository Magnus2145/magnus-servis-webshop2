import { MedusaApp } from '@medusajs/medusa';
import { Modules, type MedusaAppOutput } from '@medusajs/modules-sdk';
import type {
  IInventoryModuleService,
  IPricingModuleService,
  IProductModuleService,
} from '@medusajs/types';
import medusaConfig from '../../medusa-config';
import { logger } from '../utils/logger';

let medusaApp: MedusaAppOutput | null = null;

async function ensureApp(): Promise<MedusaAppOutput> {
  if (!medusaApp) {
    logger.info('Bootstrapping Medusa application');
    medusaApp = await MedusaApp({
      configModule: medusaConfig,
    });

    await medusaApp.runMigrations();
    await medusaApp.onApplicationStart();
    logger.info('Medusa modules initialised');
  }

  return medusaApp;
}

function resolveModule<T>(app: MedusaAppOutput, moduleKey: Modules): T {
  const moduleOrInstances = app.modules[moduleKey];

  if (!moduleOrInstances) {
    throw new Error(`Module ${moduleKey} is not registered in Medusa`);
  }

  return (Array.isArray(moduleOrInstances) ? moduleOrInstances[0] : moduleOrInstances) as T;
}

export async function bootstrapMedusa() {
  return ensureApp();
}

export async function resolveProductModule(): Promise<IProductModuleService> {
  const app = await ensureApp();
  return resolveModule<IProductModuleService>(app, Modules.PRODUCT);
}

export async function resolvePricingModule(): Promise<IPricingModuleService> {
  const app = await ensureApp();
  return resolveModule<IPricingModuleService>(app, Modules.PRICING);
}

export async function resolveInventoryModule(): Promise<IInventoryModuleService> {
  const app = await ensureApp();
  return resolveModule<IInventoryModuleService>(app, Modules.INVENTORY);
}

export async function shutdownMedusa() {
  if (medusaApp) {
    await medusaApp.onApplicationPrepareShutdown();
    await medusaApp.onApplicationShutdown();
    medusaApp = null;
  }
}
