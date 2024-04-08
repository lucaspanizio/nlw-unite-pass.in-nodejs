import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];
export class BadRequestError extends Error {}
export class NoContentError extends Error {}

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof NoContentError) {
    return reply.status(204).send();
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({ message: error.message });
  }

  // return reply.send(error);
  return reply.status(500).send({ message: 'Internal server error!' });
};
