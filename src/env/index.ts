import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z
    .string({
      description: 'Database connection URL',
      required_error: '😱 You forgot to create the key',
    })
    .url({
      message: 'There is the key, but the value is incorrect or empty',
    }),
  PORT: z.coerce.number().positive().default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  const { fieldErrors } = _env.error.flatten();
  const errorMessage = Object.entries(fieldErrors)
    .map(([field, errors]) =>
      errors ? `${field}: ${errors.join(', ')}` : field,
    )
    .join('\n  ');

  console.error(
    '⚠️  Invalid or missing environment variables:\n',
    errorMessage,
  );

  process.exit(0);
}

export const env = _env.data;
