import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeEventUseCases } from '@/use-cases/factories/make-event-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';

export const getAll = async (_: FastifyRequest, reply: FastifyReply) => {
  const eventUseCases = makeEventUseCases();

  const events = await eventUseCases.getAll();

  if (!events) {
    throw new NoContentError();
  }

  return reply.status(200).send(events);
};
