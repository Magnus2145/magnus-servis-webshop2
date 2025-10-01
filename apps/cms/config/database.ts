import { env } from '@strapi/utils';

export default ({ env: envFn }: { env: typeof env }) => ({
  connection: {
    client: envFn('DATABASE_CLIENT', 'mysql'),
    connection: {
      host: envFn('DATABASE_HOST', '127.0.0.1'),
      port: envFn.int('DATABASE_PORT', 3306),
      database: envFn('DATABASE_NAME', 'magnus_cms'),
      user: envFn('DATABASE_USERNAME', 'root'),
      password: envFn('DATABASE_PASSWORD', 'root'),
      ssl: envFn.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: envFn.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
      },
    },
  },
});
