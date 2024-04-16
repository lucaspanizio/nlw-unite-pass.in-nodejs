import { z } from 'zod';
import {
  ParamsDeleteAttendeeSchema,
  ResDeleteAttendeeSchema,
} from './attendees/delete.schemas.ts';
import {
  ParamsGetByEventSchema,
  QueryGetByEventSchema,
  ResGetByEventSchema,
} from './attendees/get-by-event.schemas.ts';
import {
  ParamsGetByIdAttendeeSchema,
  ResGetByIdAttendeeSchema,
} from './attendees/get-by-id.schemas.ts';
import {
  BodyRegisterAttendeeSchema,
  ParamsRegisterAttendeeSchema,
  ResRegisterAttendeeSchema,
} from './attendees/register.schemas.ts';
import {
  BodyUpdateAttendeeSchema,
  ParamsUpdateAttendeeSchema,
  ResUpdateAttendeeSchema,
} from './attendees/update.schemas.ts';
import {
  BodyCreateEventSchema,
  ResCreateEventSchema,
} from './events/create.schemas.ts';
import {
  ParamsDeleteEventSchema,
  ResDeleteEventSchema,
} from './events/delete.schemas.ts';
import { ResGetAllEventsSchema } from './events/get-all.schemas.ts';
import {
  ParamsGetByIdEventSchema,
  ResGetByIdEventSchema,
} from './events/get-by-id.schemas.ts';
import {
  BodyUpdateEventSchema,
  ParamsUpdateEventSchema,
  ResUpdateEventSchema,
} from './events/update.schemas.ts';

export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  details: z.string().nullable(),
  slug: z.string(),
  maxAttendees: z.number().int().nullable(),
  attendeesAmount: z.number().int(),
});

export const AttendeeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(4),
  email: z.string().email(),
  event: z.string(),
  createdAt: z.date(),
  checkedInAt: z.date().nullable(),
});

export const ParamsSchemas = {
  Event: {
    GetById: ParamsGetByIdEventSchema,
    Delete: ParamsDeleteEventSchema,
    Update: ParamsUpdateEventSchema,
  },
  Attendee: {
    Register: ParamsRegisterAttendeeSchema,
    GetById: ParamsGetByIdAttendeeSchema,
    GetByEvent: ParamsGetByEventSchema,
    Delete: ParamsDeleteAttendeeSchema,
    Update: ParamsUpdateAttendeeSchema,
  },
};

export const QuerySchemas = {
  Attendee: {
    GetByEvent: QueryGetByEventSchema,
  },
};

export const BodySchemas = {
  Event: {
    Create: BodyCreateEventSchema,
    Update: BodyUpdateEventSchema,
  },
  Attendee: {
    Register: BodyRegisterAttendeeSchema,
    Update: BodyUpdateAttendeeSchema,
  },
};

export const ResponseSchemas = {
  Event: {
    Create: ResCreateEventSchema,
    Update: ResUpdateEventSchema,
    Delete: ResDeleteEventSchema,
    GetAll: ResGetAllEventsSchema,
    GetById: ResGetByIdEventSchema,
  },
  Attendee: {
    Register: ResRegisterAttendeeSchema,
    Update: ResUpdateAttendeeSchema,
    Delete: ResDeleteAttendeeSchema,
    GetById: ResGetByIdAttendeeSchema,
    GetByEvent: ResGetByEventSchema,
  },
};
