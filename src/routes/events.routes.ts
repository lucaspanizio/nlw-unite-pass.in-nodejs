import { EventsRepositoryPrisma } from '@/repositories/prisma/events-repository.ts';
import {
  BodySchema,
  ParamSchema,
  ResponseSchema,
} from '@/schemas/events-schemas.ts';
import { EventUseCases } from '@/use-cases/event-usecases.ts';
import { generateSlug } from '@/utils/generate-slug.ts';
import { FastifyInstance } from 'fastify';
import { BadRequestError, NoContentError } from '../error-handler.ts';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

export async function eventsRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const prismaRepository = new EventsRepositoryPrisma();
  const eventUseCases = new EventUseCases(prismaRepository);

  app.post(
    '/',
    {
      schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: BodySchema.CreateEvent,
        response: ResponseSchema.CreateEvent,
      },
    },
    async (req, reply) => {
      const { title, details, maxAttendees } = req.body;
      const slug = generateSlug(title);
      const eventWithSameSlug = await eventUseCases.findBySlug(slug);

      if (!!eventWithSameSlug) {
        throw new BadRequestError(
          'Another event with same title already exists.',
        );
      }

      const event = await eventUseCases.create({
        title,
        details,
        maxAttendees,
      });

      return reply.status(201).send({ eventId: event.id });
    },
  );

  app.put<{
    Body: z.infer<typeof BodySchema.UpdateEvent>;
    Params: z.infer<typeof ParamSchema.UpdateEvent>;
  }>(
    '/:id',
    {
      schema: {
        summary: 'Update an event',
        tags: ['events'],
        body: BodySchema.UpdateEvent,
        params: ParamSchema.UpdateEvent,
        response: ResponseSchema.UpdateEvent,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const { title, details, maxAttendees } = req.body;

      const event = await eventUseCases.update({
        id,
        title,
        details,
        maxAttendees,
      });

      if (!event) {
        throw new NoContentError();
      }

      return reply.status(200).send(event);
    },
  );

  app.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        summary: 'Get an event',
        tags: ['events'],
        params: ParamSchema.GetEventById,
        response: ResponseSchema.GetEventById,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const event = await eventUseCases.findById(id);

      if (!event) {
        throw new NoContentError();
      }

      return reply.status(200).send(event);
    },
  );

  app.get(
    '/',
    {
      schema: {
        summary: 'Get all events',
        tags: ['events'],
        response: ResponseSchema.GetAllEvents,
      },
    },
    async (req, reply) => {
      const events = await eventUseCases.findAll();

      if (events?.length === 0) {
        throw new NoContentError();
      }

      return reply.status(200).send(events);
    },
  );

  app.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        summary: 'Delete an event',
        tags: ['events'],
        params: ParamSchema.DeleteEvent,
        response: ResponseSchema.DeleteEvent,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const event = await eventUseCases.delete(id);

      if (!event) {
        throw new NoContentError();
      }

      return reply.status(200).send({
        message: `Event '${event.slug}' deleted successfully!`,
      });
    },
  );
}
