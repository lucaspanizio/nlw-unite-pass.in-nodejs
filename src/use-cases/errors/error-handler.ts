import { env } from '@/env/index.ts';
import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];
export class BadRequestError extends Error {}
export class ConflictRequestError extends Error {}
export class NoContentError extends Error {}

export const errorHandler: FastifyErrorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (env.NODE_ENV !== 'prod') {
    console.error(error);
  }

  switch (true) {
    case error instanceof NoContentError:
      return reply.status(204).send();
    case error instanceof ZodError:
      return reply.status(400).send({
        message: 'Validation error',
        errors: error.flatten().fieldErrors,
      });
    case error instanceof BadRequestError:
      return reply.status(400).send({ message: error.message });
    case error instanceof ConflictRequestError:
      return reply.status(409).send({ message: error.message });
    default:
      return reply.send(error);
    // return reply.status(500).send({ message: 'Internal server error!' });
  }
};
