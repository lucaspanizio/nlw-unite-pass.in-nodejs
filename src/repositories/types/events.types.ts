import {
  BodySchemas,
  EventSchema,
  ParamsSchemas,
  ResponseSchemas,
} from '@/schemas/index.schemas.ts';
import { z } from 'zod';

/**** Request ****/
type CreateRequest = z.infer<typeof BodySchemas.Event.Create> & {
  slug: string;
};

type UpdateRequest = Partial<z.infer<typeof BodySchemas.Event.Update>> & {
  eventId: string;
};

type DeleteRequest = z.infer<typeof ParamsSchemas.Event.Delete>;

type GetByIdRequest = z.infer<typeof ParamsSchemas.Event.GetById>;

type GetBySlugRequest = {
  slug: string;
};

type AmmountAttendeesRequest = {
  eventId: string;
};

type RequestMap = {
  create: CreateRequest;
  update: UpdateRequest;
  delete: DeleteRequest;
  getById: GetByIdRequest;
  getBySlug: GetBySlugRequest;
  ammountAttendees: AmmountAttendeesRequest;
};

/**** Response ****/
type CreateResponse = Promise<z.infer<
  (typeof ResponseSchemas.Event.Create)[201]
> | null>;
type UpdateResponse = Promise<z.infer<
  (typeof ResponseSchemas.Event.Update)[200]
> | null>;
type DeleteResponse = Promise<boolean>;
type GetAllResponse = Promise<
  z.infer<(typeof ResponseSchemas.Event.GetAll)[200]>
>;
type GetByIdResponse = Promise<z.infer<
  (typeof ResponseSchemas.Event.GetById)[200]
> | null>;
type GetBySlugResponse = GetByIdResponse;
type AmmountAttendeesResponse = Promise<number>;

type ResponseMap = {
  create: CreateResponse;
  update: UpdateResponse;
  delete: DeleteResponse;
  getAll: GetAllResponse;
  getById: GetByIdResponse;
  getBySlug: GetBySlugResponse;
  ammountAttendees: AmmountAttendeesResponse;
};

/**** Exports ****/
export type Event = z.infer<typeof EventSchema>;
export type Request<T extends keyof RequestMap> = RequestMap[T];
export type Response<T extends keyof ResponseMap> = ResponseMap[T];
