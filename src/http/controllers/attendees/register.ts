import { BodySchemas, ParamsSchemas } from '@/schemas/index.schemas.ts';
import { makeAttendeeUseCases } from '@/use-cases/factories/make-attendee-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const register = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Attendee.Register>;
    Body: z.infer<typeof BodySchemas.Attendee.Register>;
  }>,
  reply: FastifyReply,
) => {
  const { eventId } = request.params;
  const { name, email } = request.body;

  const attendeeUseCases = makeAttendeeUseCases();

  const { attendee } = await attendeeUseCases.register({
    name,
    email,
    eventId,
  });

  return reply.status(201).send({ attendeeId: attendee.id });
};
