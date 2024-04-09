import { ResCreateAttendeeSchema } from './attendees/create-attendee-schemas.ts';
import { BodyCreateAttendeeSchema } from './attendees/create-attendee-schemas.ts';
import {
  ParamDeleteAttendeeSchema,
  ResDeleteAttendeeSchema,
} from './attendees/delete-attendee-schemas.ts';
import { ResGetAllAttendeesSchema } from './attendees/get-all-attendees-schemas.ts';
import {
  ParamGetAttendeeByIdSchema,
  ResGetAttendeeByIdSchema,
} from './attendees/get-attendee-by-id-schemas.ts';
import {
  BodyUpdateAttendeeSchema,
  ParamUpdateAttendeeSchema,
  ResUpdateAttendeeSchema,
} from './attendees/update-attendee-schemas.ts';

export const BodySchema = {
  CreateAttendee: BodyCreateAttendeeSchema,
  UpdateAttendee: BodyUpdateAttendeeSchema,
};

export const ParamSchema = {
  UpdateAttendee: ParamUpdateAttendeeSchema,
  GetAttendeeById: ParamGetAttendeeByIdSchema,
  DeleteAttendee: ParamDeleteAttendeeSchema,
};

export const ResponseSchema = {
  CreateAttendee: ResCreateAttendeeSchema,
  UpdateAttendee: ResUpdateAttendeeSchema,
  DeleteAttendee: ResDeleteAttendeeSchema,
  GetAttendeeById: ResGetAttendeeByIdSchema,
  GetAllAttendees: ResGetAllAttendeesSchema,
};
