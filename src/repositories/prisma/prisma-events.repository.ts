import { prisma } from '@/lib/prisma/index.ts';
import { generateSlug } from '@/utils/generate-slug.ts';
import { Prisma } from '@prisma/client';
import { Event, Request, Response } from '../types/events.types.ts';
import { EventRepository } from '../events.repository.ts';

export class EventsRepositoryPrisma implements EventRepository {
  async create({
    title,
    slug,
    details,
    maxAttendees,
  }: Request<'create'>): Response<'create'> {
    const event = await prisma.event.create({
      data: {
        title,
        slug,
        details,
        maxAttendees,
      },
    });

    return { eventId: event.id };
  }

  async update({ eventId, ...data }: Request<'update'>): Response<'update'> {
    const nonUndefinedEntries = Object.entries(data).filter(
      ([key, value]) => value !== undefined,
    );

    // Nenhum parâmetro foi informado
    if (nonUndefinedEntries.length === 0) return null;

    const event = await this.getById({ eventId });

    // Nenhum evento foi encontrado pelo id informado
    if (!event) return null;

    const updateData = Object.fromEntries(nonUndefinedEntries);

    if (data.title) {
      updateData.slug = generateSlug(String(data.title));
    }

    const updatedEvent = { event: { ...event.event, ...updateData } };

    await prisma.event.update({
      where: { id: eventId },
      data: updateData,
    });

    return updatedEvent;
  }

  async getById({ eventId }: Request<'getById'>): Response<'getById'> {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    console.log('event', event);

    if (!event) return null;

    const eventWithAttendeesAmount = {
      event: this.transformEventWithRelations(event),
    };

    return eventWithAttendeesAmount;
  }

  async getBySlug({ slug }: Request<'getBySlug'>): Response<'getBySlug'> {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    if (!event) return null;

    const eventWithAttendeesAmount = {
      event: this.transformEventWithRelations(event),
    };

    return eventWithAttendeesAmount;
  }

  async getAll(): Response<'getAll'> {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: {
            Attendee: true,
          },
        },
      },
    });

    const eventsWithAttendeesAmount = events.map((event) => {
      return this.transformEventWithRelations(event);
    });

    return { events: eventsWithAttendeesAmount };
  }

  async delete({ eventId }: Request<'delete'>): Response<'delete'> {
    const event = await this.getById({ eventId });

    if (!event) return false;

    const data = await prisma.event.delete({ where: { id: eventId } });

    return !!data;
  }

  async ammountAttendees({
    eventId,
  }: Request<'ammountAttendees'>): Response<'ammountAttendees'> {
    const count = await prisma.event.count({
      where: {
        id: eventId,
      },
    });

    return count;
  }

  private transformEventWithRelations(event: {
    id: string;
    title: string;
    details: string | null;
    slug: string;
    maxAttendees: number | null;
    _count: {
      Attendee: number;
    };
  }): Event {
    return {
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maxAttendees: event.maxAttendees,
      attendeesAmount: event._count?.Attendee,
    };
  }
}
