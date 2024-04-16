import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import { eventsRoutes } from '@/http/routes/events.routes.ts';
import { attendeesRoutes } from '@/http/routes/attendees.routes.ts';
import { errorHandler } from './use-cases/errors/error-handler.ts';
import { env } from './env/index.ts';

const app = fastify();

app.register(fastifyCors, {
  origin: '*',
});

app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Pass.in',
      description:
        'Especificações da API da aplicação Pass.in construída durante o NLW Unite da Rocketseat.',
      version: '1.0.0',
    },
  },
});

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

app.register(eventsRoutes, {
  prefix: '/events',
});

app.register(attendeesRoutes, {
  prefix: '/attendees',
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
