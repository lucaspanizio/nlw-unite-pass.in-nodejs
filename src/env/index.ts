import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z
    .string({
      description: 'URL de conexão com a base de dados',
      required_error: '😱 Você esqueceu de criar a chave',
    })
    .url({
      message: 'Existe a chave mas o valor está incorreto ou vazio',
    }),
  PORT: z.coerce.number().positive().default(3333),
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
    '⚠️  Variáveis de ambiente inválidas ou faltando:\n',
    errorMessage,
  );

  process.exit(0);
}

export const env = _env.data;
