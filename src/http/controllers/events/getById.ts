import { ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeEventUseCases } from '@/use-cases/factories/make-event-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const getById = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Event.GetById>;
  }>,
  reply: FastifyReply,
) => {
  const { eventId } = request.params;

  const eventUseCases = makeEventUseCases();

  const event = await eventUseCases.getById({ eventId });

  if (!event) {
    throw new NoContentError();
  }

  return reply.status(200).send(event);
};
