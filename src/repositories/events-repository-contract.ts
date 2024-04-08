import { EventProps } from '@/entities/event-entity.ts';

/** Request Types **/
export type CreateEventRequest = {
  title: string;
  details?: string | null;
  maxAttendees?: number | null;
};

export type UpdateEventRequest = {
  id: string;
  title: string;
  details: string;
  maxAttendees: number;
};

/** Response Types **/
export type CreateEventResponse = Promise<EventProps>;
export type UpdateEventResponse = Promise<EventProps | null>;
export type DeleteEventResponse = Promise<EventProps | null>;
export type FindEventByIdResponse = Promise<EventProps | null>;
export type FindEventBySlugResponse = FindEventByIdResponse;
export type FindAllEventsResponse = Promise<EventProps[]>;

export interface EventRepository {
  create(data: CreateEventRequest): CreateEventResponse;
  update(data: UpdateEventRequest): UpdateEventResponse;
  delete(id: string): DeleteEventResponse;
  findById(id: string): FindEventByIdResponse;
  findBySlug(slug: string): FindEventBySlugResponse;
  findAll(): FindAllEventsResponse;
}
