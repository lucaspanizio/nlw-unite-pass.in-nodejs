import { ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeAttendeeUseCases } from '@/use-cases/factories/make-attendee-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const getById = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Attendee.GetById>;
  }>,
  reply: FastifyReply,
) => {
  const { attendeeId } = request.params;

  const attendeeUseCases = makeAttendeeUseCases();

  const attendee = await attendeeUseCases.getById({ attendeeId });

  if (!attendee) {
    throw new NoContentError();
  }

  return reply.status(200).send(attendee);
};
