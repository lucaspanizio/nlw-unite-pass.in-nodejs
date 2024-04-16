import { ParamsSchemas } from '@/schemas/index.schemas.ts';
import { NoContentError } from '@/use-cases/errors/error-handler.ts';
import { makeAttendeeUseCases } from '@/use-cases/factories/make-attendee-use-cases.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const remove = async (
  request: FastifyRequest<{
    Params: z.infer<typeof ParamsSchemas.Attendee.Delete>;
  }>,
  reply: FastifyReply,
) => {
  const { attendeeId } = request.params;

  const attendeeUseCases = makeAttendeeUseCases();

  const attendeeWasNotDeleted = !(await attendeeUseCases.delete({
    attendeeId,
  }));

  if (attendeeWasNotDeleted) {
    throw new NoContentError();
  }

  return reply.status(200).send({
    message: `Attendee deleted successfully!`,
  });
};
