import { ParamsSchemas, QuerySchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeAttendeeUseCases } from '@/use-cases/factories/make-attendee-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const getAttendees = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Attendee.GetByEvent>;
    Querystring: z.infer<typeof QuerySchemas.Attendee.GetByEvent>;
  }>,
  reply: FastifyReply,
) => {
  const { eventId } = request.params;
  const { query, take, pageIndex } = request.query;

  const attendeesUseCases = makeAttendeeUseCases();

  const result = await attendeesUseCases.getByEvent({
    eventId,
    query,
    take,
    pageIndex,
  });

  if (result.attendees.length === 0) {
    throw new NoContentError();
  }

  return reply.status(200).send(result);
};
