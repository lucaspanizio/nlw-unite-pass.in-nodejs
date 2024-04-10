import { Repository, Response } from './base-respository-contract.ts';

export interface Attendee {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  eventId: string;
  checkInId?: number | null;
}

export interface AttendeeRepository extends Repository<Attendee> {
  findByEmail(email: string): Response<Attendee | null>;
}
