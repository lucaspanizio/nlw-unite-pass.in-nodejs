import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { eventsRoutes } from './routes/events.routes.ts';
import { errorHandler } from './error-handler.ts';
import { env } from './env/index.ts';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(eventsRoutes, {
  prefix: '/events',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

app
  .listen({ port: env.PORT })
  .then(() => {
    console.log('🚀 HTTP server running!');
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
