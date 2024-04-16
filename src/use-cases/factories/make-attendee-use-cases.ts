import { AttendeesRepositoryPrisma } from '@/repositories/prisma/prisma-attendees.repository.ts';
import { AttendeeUseCases } from '../attendee.usecases.ts';

export const makeAttendeeUseCases = () => {
  const attendeesRepository = new AttendeesRepositoryPrisma();
  const attendeeUseCases = new AttendeeUseCases(attendeesRepository);

  return attendeeUseCases;
};
