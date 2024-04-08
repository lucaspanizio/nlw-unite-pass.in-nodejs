import {
  CreateEventResponse,
  DeleteEventResponse,
  EventRepository,
  FindEventByIdResponse,
  FindEventBySlugResponse,
  FindAllEventsResponse,
  UpdateEventResponse,
  CreateEventRequest,
  UpdateEventRequest,
} from '../events-repository-contract.ts';
import { prisma } from '@/lib/prisma/index.ts';
import { generateSlug } from '@/utils/generate-slug.ts';

export class EventsRepositoryPrisma implements EventRepository {
  async create({
    title,
    details,
    maxAttendees,
  }: CreateEventRequest): CreateEventResponse {
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maxAttendees,
        slug: generateSlug(title),
      },
    });

    return event;
  }

  async update({
    id,
    title,
    details,
    maxAttendees,
  }: UpdateEventRequest): UpdateEventResponse {
    const event = await this.findById(id);

    if (!!event) {
      await prisma.event.update({
        where: {
          id,
        },
        data: { title, details, maxAttendees },
      });
    }

    return event;
  }

  async findById(id: string): FindEventByIdResponse {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    return event || null;
  }

  async findBySlug(slug: string): FindEventBySlugResponse {
    const event = await prisma.event.findUnique({
      where: { slug },
    });

    return event || null;
  }

  async findAll(): FindAllEventsResponse {
    const events = await prisma.event.findMany();

    return events;
  }

  async delete(id: string): DeleteEventResponse {
    const event = await this.findById(id);

    if (!!event) {
      await prisma.event.delete({
        where: {
          id,
        },
      });
    }

    return event;
  }
}
