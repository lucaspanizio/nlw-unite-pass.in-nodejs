import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { attendeeController } from '@/http/controllers/attendees.controller.ts';
import {
  BodySchemas,
  ParamsSchemas,
  ResponseSchemas,
} from '@/schemas/index.schemas.ts';

export async function attendeesRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.put(
    '/:attendeeId',
    {
      schema: {
        summary: 'Update an attendee',
        tags: ['attendees'],
        body: BodySchemas.Attendee.Update,
        params: ParamsSchemas.Attendee.Update,
        response: ResponseSchemas.Attendee.Update,
      },
    },
    attendeeController.update,
  );

  app.get(
    '/:attendeeId',
    {
      schema: {
        summary: 'Get an attendee',
        tags: ['attendees'],
        params: ParamsSchemas.Attendee.GetById,
        response: ResponseSchemas.Attendee.GetById,
      },
    },
    attendeeController.getById,
  );

  app.delete(
    '/:attendeeId',
    {
      schema: {
        summary: 'Delete an attendee',
        tags: ['attendees'],
        params: ParamsSchemas.Attendee.Delete,
        response: ResponseSchemas.Attendee.Delete,
      },
    },
    attendeeController.delete,
  );
}
