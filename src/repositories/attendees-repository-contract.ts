import { AttendeeProps } from '@/interfaces/attendee-interface.ts';

/** Request Types **/
export type CreateAttendeeRequest = {
  name: string;
  email: string;
  eventId: string;
};

export type UpdateAttendeeRequest = {
  id: number;
  name?: string;
  email?: string;
  checkInId?: number | null;
};

/** Response Types **/
export type CreateAttendeeResponse = Promise<AttendeeProps>;
export type UpdateAttendeeResponse = Promise<AttendeeProps | null>;
export type DeleteAttendeeResponse = Promise<AttendeeProps | null>;
export type FindAttendeeByIdResponse = Promise<AttendeeProps | null>;
export type FindAttendeeByEmailResponse = FindAttendeeByIdResponse;
export type FindAllAttendeesResponse = Promise<AttendeeProps[]>;

export interface AttendeeRepository {
  create(data: CreateAttendeeRequest): CreateAttendeeResponse;
  update(data: UpdateAttendeeRequest): UpdateAttendeeResponse;
  delete(id: number): DeleteAttendeeResponse;
  findById(id: number): FindAttendeeByIdResponse;
  findByEmail(email: string): FindAttendeeByEmailResponse;
  findAll(): FindAllAttendeesResponse;
}
