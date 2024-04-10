import { prisma } from '@/lib/prisma/index.ts';
import { EventRepository, Event } from '../events-repository-contract.ts';
import {
  Response,
  CreateRequest,
  UpdateRequest,
} from '../base-respository-contract.ts';
import { generateSlug } from '@/utils/generate-slug.ts';

export class EventsRepositoryPrisma implements EventRepository {
  async create({
    title,
    details,
    maxAttendees,
  }: CreateRequest<Event>): Response<Event> {
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

  async update({ id, ...data }: UpdateRequest<Event>): Response<Event | null> {
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

  async findById(id: string): Response<Event | null> {
    const event = await prisma.event.findUnique({ where: { id } });

    return event || null;
  }

  async findBySlug(slug: string): Response<Event | null> {
    const event = await prisma.event.findUnique({ where: { slug } });

    return event || null;
  }

  async findAll(): Response<Event[]> {
    const events = await prisma.event.findMany();

    return events;
  }

  async delete(id: string): Response<Event | null> {
    const event = await this.findById(id);

    if (!event) return null;

    await prisma.event.delete({ where: { id } });

    return event;
  }
}
