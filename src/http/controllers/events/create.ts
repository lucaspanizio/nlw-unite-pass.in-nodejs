import { BodySchemas } from '@/schemas/index.schemas.ts';
import { makeEventUseCases } from '@/use-cases/factories/make-event-use-cases.ts';
import { generateSlug } from '@/utils/generate-slug.ts';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const create = async (
  request: FastifyRequest<{ Body: z.infer<typeof BodySchemas.Event.Create> }>,
  reply: FastifyReply,
) => {
  const { title, details, maxAttendees } = request.body;

  const eventUseCases = makeEventUseCases();

  const slug = generateSlug(title);

  const eventId = await eventUseCases.create({
    title,
    slug,
    details,
    maxAttendees,
  });

  return reply.status(201).send(eventId);
};
