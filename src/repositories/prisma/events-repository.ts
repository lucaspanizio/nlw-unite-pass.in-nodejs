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

  async update({ id, ...data }: UpdateEventRequest): UpdateEventResponse {
    const nonUndefinedEntries = Object.entries(data).filter(
      ([key, value]) => value !== undefined,
    );

    // Nenhum parâmetro foi informado
    if (nonUndefinedEntries.length === 0) return null;

    const event = await this.findById(id);

    // Nenhum evento foi encontrado pelo id informado
    if (!event) return null;

    const updateData = Object.fromEntries(nonUndefinedEntries);

    if (data.title) {
      updateData.slug = generateSlug(data.title);
    }

    const updatedEvent = { ...event, ...updateData };

    await prisma.event.update({
      where: { id },
      data: updateData,
    });

    return updatedEvent;
  }

  async findById(id: string): FindEventByIdResponse {
    const event = await prisma.event.findUnique({ where: { id } });

    return event || null;
  }

  async findBySlug(slug: string): FindEventBySlugResponse {
    const event = await prisma.event.findUnique({ where: { slug } });

    return event || null;
  }

  async findAll(): FindAllEventsResponse {
    const events = await prisma.event.findMany();

    return events;
  }

  async delete(id: string): DeleteEventResponse {
    const event = await this.findById(id);

    if (!event) return null;

    await prisma.event.delete({ where: { id } });

    return event;
  }
}
