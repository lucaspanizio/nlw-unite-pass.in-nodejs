import { Repository, Response } from './base-respository-contract.ts';

export interface Event {
  id: string;
  title: string;
  details?: string | null;
  slug: string;
  maxAttendees?: number | null;
}

export interface EventRepository extends Repository<Event> {
  findBySlug(slug: string): Response<Event | null>;
}
