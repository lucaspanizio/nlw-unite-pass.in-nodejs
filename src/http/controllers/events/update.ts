import { BodySchemas, ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeEventUseCases } from '@/use-cases/factories/make-event-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const update = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Event.Update>;
    Body: z.infer<typeof BodySchemas.Event.Update>;
  }>,
  reply: FastifyReply,
) => {
  const { eventId } = request.params;
  const { title, details, maxAttendees } = request.body;

  const eventUseCases = makeEventUseCases();

  const event = await eventUseCases.update({
    eventId,
    title,
    details,
    maxAttendees,
  });

  if (!event) {
    throw new NoContentError();
  }

  return reply.status(200).send(event);
};
