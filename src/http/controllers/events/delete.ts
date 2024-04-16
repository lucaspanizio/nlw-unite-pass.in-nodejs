import { ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeEventUseCases } from '@/use-cases/factories/make-event-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const remove = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Event.Delete>;
  }>,
  reply: FastifyReply,
) => {
  const { eventId } = request.params;

  const eventUseCases = makeEventUseCases();

  const eventWasNotDeleted = !(await eventUseCases.delete({ eventId }));

  if (eventWasNotDeleted) {
    throw new NoContentError();
  }

  return reply.status(200).send({
    message: `Event deleted successfully!`,
  });
};
