import {
  EventRepository,
  FindEventBySlugResponse,
  CreateEventRequest,
  CreateEventResponse,
  FindEventByIdResponse,
  FindAllEventsResponse,
  DeleteEventResponse,
  UpdateEventResponse,
  UpdateEventRequest,
} from '@/repositories/events-repository-contract.ts';

export class EventUseCases implements EventRepository {
  constructor(private repository: EventRepository) {}

  async create(data: CreateEventRequest): CreateEventResponse {
    return this.repository.create(data);
  }

  async update(data: UpdateEventRequest): UpdateEventResponse {
    return this.repository.update(data);
  }

  async findBySlug(slug: string): FindEventBySlugResponse {
    return this.repository.findBySlug(slug);
  }

  async findById(id: string): FindEventByIdResponse {
    return this.repository.findById(id);
  }

  async findAll(): FindAllEventsResponse {
    return this.repository.findAll();
  }

  async delete(id: string): DeleteEventResponse {
    return this.repository.delete(id);
  }
}
