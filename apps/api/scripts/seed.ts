import { bootstrapMedusa, resolveProductModule, shutdownMedusa } from '../src/services/medusa';
import { logger } from '../src/utils/logger';

const categories = [
  { name: 'Perilice', handle: 'perilice' },
  { name: 'Ledomati', handle: 'ledomati' },
];

const brands = [
  { value: 'Icematic' },
  { value: 'Elframo' },
];

async function seed() {
  const app = await bootstrapMedusa();
  const productModule = await resolveProductModule();

  logger.info('Ensuring base product categories exist');
  const existingCategories = await productModule.listProductCategories({
    handle: categories.map((category) => category.handle),
  });
  const existingCategoryHandles = new Set(existingCategories.map((category) => category.handle));

  const missingCategories = categories.filter((category) => !existingCategoryHandles.has(category.handle));
  if (missingCategories.length) {
    await productModule.createProductCategories(missingCategories);
    missingCategories.forEach((category) => logger.info(`Created category ${category.name}`));
  } else {
    logger.info('Categories already present, skipping creation');
  }

  logger.info('Ensuring base brand tags exist');
  const existingTags = await productModule.listProductTags({ value: brands.map((brand) => brand.value) });
  const existingTagValues = new Set(existingTags.map((tag) => tag.value));

  const missingTags = brands.filter((brand) => !existingTagValues.has(brand.value));
  if (missingTags.length) {
    await productModule.createProductTags(missingTags);
    missingTags.forEach((brand) => logger.info(`Created brand tag ${brand.value}`));
  } else {
    logger.info('Brand tags already present, skipping creation');
  }

  logger.info('Seed completed');

  return app;
}

seed()
  .catch((error) => {
    logger.error(`Seed failed: ${(error as Error).message}`);
    process.exitCode = 1;
  })
  .finally(async () => {
    await shutdownMedusa();
    process.exit();
  });
