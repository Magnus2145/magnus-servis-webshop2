import { defineConfig } from '@medusajs/medusa';

const port = Number(process.env.PORT ?? 9000);

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL ?? 'mysql://root:root@localhost:3306/magnus_servis',
    redisUrl: process.env.REDIS_URL ?? 'redis://localhost:6379',
    http: {
      port,
      storeCors: '*',
      adminCors: '*',
    },
  },
  modules: {
    productModuleService: {
      resolve: '@medusajs/product',
      options: {},
    },
    pricingModuleService: {
      resolve: '@medusajs/pricing',
      options: {},
    },
    inventoryService: {
      resolve: '@medusajs/inventory',
      options: {},
    },
    salesChannelModuleService: {
      resolve: '@medusajs/sales-channel',
      options: {},
    },
    fileService: {
      resolve: '@medusajs/file-local',
      options: {},
    },
    eventBusModuleService: {
      resolve: '@medusajs/event-bus-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
    cacheService: {
      resolve: '@medusajs/cache-redis',
      options: {
        redisUrl: process.env.REDIS_URL,
      },
    },
  },
});
