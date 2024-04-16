import { Request, Response } from './types/attendees.types.ts';

export interface AttendeeRepository {
  register(data: Request<'register'>): Response<'register'>;
  update(data: Request<'update'>): Response<'update'>;
  delete(attendeeId: Request<'delete'>): Response<'delete'>;
  getById(attendeeId: Request<'getById'>): Response<'getById'>;
  getByEmail(email: Request<'getByEmail'>): Response<'getByEmail'>;
  getByEvent(data: Request<'getByEvent'>): Response<'getByEvent'>;
}
