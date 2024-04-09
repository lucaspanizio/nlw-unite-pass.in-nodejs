import {
  BodySchema,
  ParamSchema,
  ResponseSchema,
} from '@/schemas/attendees-schemas.ts';
import { FastifyInstance } from 'fastify';
import { BadRequestError, NoContentError } from '../error-handler.ts';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { AttendeesRepositoryPrisma } from '@/repositories/prisma/attendees-repository.ts';
import { AttendeeUseCases } from '@/use-cases/attendee-usecases.ts';
import { z } from 'zod';

export async function attendeesRoutes(fastify: FastifyInstance) {
  const app = fastify.withTypeProvider<ZodTypeProvider>();
  const prismaRepository = new AttendeesRepositoryPrisma();
  const attendeeUseCases = new AttendeeUseCases(prismaRepository);

  app.post(
    '/',
    {
      schema: {
        summary: 'Create an attendee',
        tags: ['attendees'],
        body: BodySchema.CreateAttendee,
        response: ResponseSchema.CreateAttendee,
      },
    },
    async (req, reply) => {
      const { name, email, eventId } = req.body;
      const attendeeWithSameEmail = await attendeeUseCases.findByEmail(email);

      if (!!attendeeWithSameEmail) {
        throw new BadRequestError(
          'Another attendee with same email already exists.',
        );
      }

      const attendee = await attendeeUseCases.create({
        name,
        email,
        eventId,
      });

      return reply.status(201).send({ attendeeId: attendee.id });
    },
  );

  app.put<{
    Body: z.infer<typeof BodySchema.UpdateAttendee>;
    Params: z.infer<typeof ParamSchema.UpdateAttendee>;
  }>(
    '/:id',
    {
      schema: {
        summary: 'Update an attendee',
        tags: ['attendees'],
        body: BodySchema.UpdateAttendee,
        params: ParamSchema.UpdateAttendee,
        response: ResponseSchema.UpdateAttendee,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const { name, email, checkInId } = req.body;

      const attendee = await attendeeUseCases.update({
        id: Number(id),
        name,
        email,
        checkInId,
      });

      if (!attendee) {
        throw new NoContentError();
      }

      return reply.status(200).send(attendee);
    },
  );

  app.get<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        summary: 'Get an attendee',
        tags: ['attendees'],
        params: ParamSchema.GetAttendeeById,
        response: ResponseSchema.GetAttendeeById,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const attendee = await attendeeUseCases.findById(Number(id));

      if (!attendee) {
        throw new NoContentError();
      }

      return reply.status(200).send(attendee);
    },
  );

  app.get(
    '/',
    {
      schema: {
        summary: 'Get all attendees',
        tags: ['attendees'],
        response: ResponseSchema.GetAllAttendees,
      },
    },
    async (req, reply) => {
      const attendees = await attendeeUseCases.findAll();

      if (attendees?.length === 0) {
        throw new NoContentError();
      }

      return reply.status(200).send(attendees);
    },
  );

  app.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
        summary: 'Delete an attendee',
        tags: ['attendees'],
        params: ParamSchema.DeleteAttendee,
        response: ResponseSchema.DeleteAttendee,
      },
    },
    async (req, reply) => {
      const { id } = req.params;
      const attendee = await attendeeUseCases.delete(Number(id));

      if (!attendee) {
        throw new NoContentError();
      }

      return reply.status(200).send({
        message: `Attendee '${attendee.name}' deleted successfully!`,
      });
    },
  );
}
