import { BodySchemas, ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeAttendeeUseCases } from '@/use-cases/factories/make-attendee-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const update = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Attendee.Update>;
    Body: z.infer<typeof BodySchemas.Attendee.Update>;
  }>,
  reply: FastifyReply,
) => {
  const { attendeeId } = request.params;
  const { name, email } = request.body;

  const attendeeUseCases = makeAttendeeUseCases();

  const attendee = await attendeeUseCases.update({
    attendeeId,
    name,
    email,
  });

  if (!attendee) {
    throw new NoContentError();
  }

  return reply.status(200).send(attendee);
};
