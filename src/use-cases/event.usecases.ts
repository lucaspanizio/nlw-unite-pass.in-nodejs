import { EventRepository } from '@/repositories/events.repository.ts';
import { Request, Response } from '@/repositories/types/events.types.ts';
import { generateSlug } from '@/utils/generate-slug.ts';
import { ConflictRequestError } from './errors/error-handler.ts';

export class EventUseCases implements EventRepository {
  constructor(private repository: EventRepository) {}

  async create(args: Request<'create'>): Response<'create'> {
    const slug = generateSlug(args.title);
    const hasEventWithSameSlug = !!(await this.getBySlug({ slug }));

    if (hasEventWithSameSlug) {
      throw new ConflictRequestError(
        'Another event with same title already exists.',
      );
    }

    const eventId = await this.repository.create({ ...args, slug });
    return eventId;
  }

  async update(args: Request<'update'>): Response<'update'> {
    return this.repository.update(args);
  }

  async delete(id: Request<'delete'>): Response<'delete'> {
    return this.repository.delete(id);
  }

  async getBySlug({ slug }: Request<'getBySlug'>): Response<'getBySlug'> {
    return this.repository.getBySlug({ slug });
  }

  async getById({ eventId }: Request<'getById'>): Response<'getById'> {
    return this.repository.getById({ eventId });
  }

  async getAll(): Response<'getAll'> {
    return this.repository.getAll();
  }

  async ammountAttendees({
    eventId,
  }: Request<'ammountAttendees'>): Response<'ammountAttendees'> {
    return await this.repository.ammountAttendees({ eventId });
  }
}
