import {
  BodyCreateEventSchema,
  ResCreateEventSchema,
} from './events/create-event-schemas.ts';
import {
  BodyUpdateEventSchema,
  ParamUpdateEventSchema,
  ResUpdateEventSchema,
} from './events/update-event-schemas.ts';
import {
  ParamGetEventByIdSchema,
  ResGetEventByIdSchema,
} from './events/get-event-by-id-schemas.ts';
import {
  ParamDeleteEventSchema,
  ResDeleteEventSchema,
} from './events/delete-event-schemas.ts';
import { ResGetAllEventsSchema } from './events/get-all-events-schemas.ts';

export const BodySchema = {
  CreateEvent: BodyCreateEventSchema,
  UpdateEvent: BodyUpdateEventSchema,
};

export const ParamSchema = {
  UpdateEvent: ParamUpdateEventSchema,
  GetEventById: ParamGetEventByIdSchema,
  DeleteEvent: ParamDeleteEventSchema,
};

export const ResponseSchema = {
  CreateEvent: ResCreateEventSchema,
  UpdateEvent: ResUpdateEventSchema,
  DeleteEvent: ResDeleteEventSchema,
  GetEventById: ResGetEventByIdSchema,
  GetAllEvents: ResGetAllEventsSchema,
};
