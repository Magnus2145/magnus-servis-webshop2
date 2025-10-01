import { Router } from 'express';
import type {
  FilterableProductCategoryProps,
  FilterableProductProps,
  FilterableProductTagProps,
} from '@medusajs/types';
import { resolveProductModule } from '../services/medusa';
import { logger } from '../utils/logger';

function normalizeListParam(value: unknown): string[] | undefined {
  if (Array.isArray(value)) {
    return value.map(String).filter((entry) => entry.length > 0);
  }
  if (typeof value === 'string' && value.length > 0) {
    return [value];
  }
  return undefined;
}

function normalizeSingleParam(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    return value.length > 0 ? String(value[0]) : undefined;
  }
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  return undefined;
}

function parsePagination(value: unknown, fallback: number) {
  const parsed = Number(value);
  if (Number.isFinite(parsed) && parsed >= 0) {
    return parsed;
  }
  return fallback;
}

export function createStorefrontRouter() {
  const router = Router();

  router.get('/products', async (req, res) => {
    try {
      const productModule = await resolveProductModule();
      const limit = Math.min(parsePagination(req.query.limit, 24), 100);
      const offset = parsePagination(req.query.offset, 0);

      const filters: FilterableProductProps = {};

      const categoryIds = normalizeListParam(req.query['category_id[]']);
      if (categoryIds?.length) {
        filters.categories = { id: categoryIds };
      }

      const brandValues = normalizeListParam(req.query['tags[]']);
      if (brandValues?.length) {
        const tagFilters: FilterableProductTagProps = { value: brandValues };
        const tags = await productModule.listProductTags(tagFilters);
        if (tags.length) {
          filters.tags = { id: tags.map((tag) => tag.id) };
        }
      }

      const [products, count] = await productModule.listAndCountProducts(filters, {
        take: limit,
        skip: offset,
        relations: ['images', 'categories'],
      });

      res.json({ products, count, limit, offset });
    } catch (error) {
      logger.error(`Failed to list products: ${(error as Error).message}`);
      res.json({ products: [], count: 0, limit: 0, offset: 0 });
    }
  });

  router.get('/product-categories', async (req, res) => {
    try {
      const productModule = await resolveProductModule();
      const filters: FilterableProductCategoryProps = {};

      const handle = normalizeSingleParam(req.query.handle);
      if (handle) {
        filters.handle = handle;
      }

      const ids = normalizeListParam(req.query.id);
      if (ids?.length) {
        filters.id = ids;
      }

      const categories = await productModule.listProductCategories(filters, {
        order: { name: 'ASC' },
      });

      res.json({ product_categories: categories });
    } catch (error) {
      logger.error(`Failed to list categories: ${(error as Error).message}`);
      res.json({ product_categories: [] });
    }
  });

  router.get('/product-tags', async (req, res) => {
    try {
      const productModule = await resolveProductModule();
      const filters: FilterableProductTagProps = {};

      const values = normalizeListParam(req.query.value);
      if (values?.length) {
        filters.value = values;
      }

      const tags = await productModule.listProductTags(filters);
      res.json({ product_tags: tags });
    } catch (error) {
      logger.error(`Failed to list tags: ${(error as Error).message}`);
      res.json({ product_tags: [] });
    }
  });

  return router;
}
