import { attendeeController } from '@/http/controllers/attendees.controller.ts';
import { eventsController } from '@/http/controllers/events.controller.ts';
import {
  BodySchemas,
  ParamsSchemas,
  QuerySchemas,
  ResponseSchemas,
} from '@/schemas/index.schemas.ts';
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export async function eventsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();

  app.post(
    '/',
    {
      schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: BodySchemas.Event.Create,
        response: ResponseSchemas.Event.Create,
      },
    },
    eventsController.create,
  );

  app.post(
    '/:eventId/attendees',
    {
      schema: {
        summary: 'Register a new attendee for an event',
        tags: ['events'],
        body: BodySchemas.Attendee.Register,
        params: ParamsSchemas.Attendee.Register,
        response: ResponseSchemas.Attendee.Register,
      },
    },
    attendeeController.register,
  );

  app.put(
    '/:eventId',
    {
      schema: {
        summary: 'Update an event',
        tags: ['events'],
        body: BodySchemas.Event.Update,
        params: ParamsSchemas.Event.Update,
        response: ResponseSchemas.Event.Update,
      },
    },
    eventsController.update,
  );

  app.get(
    '/:eventId',
    {
      schema: {
        summary: 'Get an event',
        tags: ['events'],
        params: ParamsSchemas.Event.GetById,
        response: ResponseSchemas.Event.GetById,
      },
    },
    eventsController.getById,
  );

  app.get(
    '/:eventId/attendees',
    {
      schema: {
        summary: 'Get all attendees for  an event',
        tags: ['events'],
        params: ParamsSchemas.Attendee.GetByEvent,
        querystring: QuerySchemas.Attendee.GetByEvent,
        response: ResponseSchemas.Attendee.GetByEvent,
      },
    },
    eventsController.getAttendees,
  );

  app.get(
    '/',
    {
      schema: {
        summary: 'Get all events',
        tags: ['events'],
        response: ResponseSchemas.Event.GetAll,
      },
    },
    eventsController.getAll,
  );

  app.delete(
    '/:eventId',
    {
      schema: {
        summary: 'Delete an event',
        tags: ['events'],
        params: ParamsSchemas.Event.Delete,
        response: ResponseSchemas.Event.Delete,
      },
    },
    eventsController.delete,
  );
}
