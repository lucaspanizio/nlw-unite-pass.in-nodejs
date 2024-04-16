import { AttendeeSchema } from '@/schemas/index.schemas.ts';
import { z } from 'zod';

/**** Request ****/
type CreateRequest = {
  name: string;
  email: string;
  eventId: string;
};

type UpdateRequest = {
  attendeeId: number;
  name?: string;
  email?: string;
};

type DeleteRequest = {
  attendeeId: number;
};

type GetByIdRequest = {
  attendeeId: number;
};

type GetByEmailRequest = {
  email: string;
};

type GetByEventRequest = {
  eventId: string;
  query?: string;
  take: number;
  pageIndex: number;
};

type RequestMap = {
  register: CreateRequest;
  update: UpdateRequest;
  delete: DeleteRequest;
  getById: GetByIdRequest;
  getByEmail: GetByEmailRequest;
  getByEvent: GetByEventRequest;
};

/**** Response ****/
type GetByEventResponse = Promise<{
  attendees: Attendee[];
  total: number;
  totalPages: number;
}>;

type ResponseMap = {
  register: Promise<{ attendee: Attendee }>;
  update: Promise<{ attendee: Attendee } | null>;
  delete: Promise<boolean>;
  getById: Promise<{ attendee: Attendee } | null>;
  getByEmail: Promise<{ attendee: Attendee } | null>;
  getByEvent: GetByEventResponse;
};

/**** Exports ****/
export type Attendee = z.infer<typeof AttendeeSchema>;
export type Request<T extends keyof RequestMap> = RequestMap[T];
export type Response<T extends keyof ResponseMap> = ResponseMap[T];
