import { Request, Response } from './types/events.types.ts';

export interface EventRepository {
  create(data: Request<'create'>): Response<'create'>;
  update(data: Request<'update'>): Response<'update'>;
  delete(id: Request<'delete'>): Response<'delete'>;
  getBySlug(slug: Request<'getBySlug'>): Response<'getBySlug'>;
  getById(id: Request<'getById'>): Response<'getById'>;
  getAll(): Response<'getAll'>;
  ammountAttendees(
    eventId: Request<'ammountAttendees'>,
  ): Response<'ammountAttendees'>;
}
