import { AttendeeRepository } from '@/repositories/attendees.repository.ts';
import { Request, Response } from '@/repositories/types/attendees.types.ts';
import { makeEventUseCases } from './factories/make-event-use-cases.ts';
import {
  BadRequestError,
  ConflictRequestError,
} from './errors/error-handler.ts';

export class AttendeeUseCases implements AttendeeRepository {
  constructor(private repository: AttendeeRepository) {}

  async register(args: Request<'register'>): Response<'register'> {
    const { eventId, email } = args;

    const eventUseCases = makeEventUseCases();

    const [data, amountOfAttendeesForEvent] = await Promise.all([
      eventUseCases.getById({ eventId }),
      eventUseCases.ammountAttendees({ eventId }),
    ]);

    if (!data) {
      throw new BadRequestError('Invalid event Id');
    }

    const maxAttendees = data.event.maxAttendees;

    if (maxAttendees && amountOfAttendeesForEvent >= maxAttendees) {
      throw new BadRequestError(
        'The maximum number of attendees for this event has been reached',
      );
    }

    const attendeeWithSameEmail = await this.getByEmail({ email });

    if (!!attendeeWithSameEmail) {
      throw new ConflictRequestError(
        'This email is already registered for another attendee in this event.',
      );
    }

    const attendeeId = await this.repository.register(args);
    return attendeeId;
  }

  async update(args: Request<'update'>): Response<'update'> {
    if (args.email) {
      const attendeeWithSameEmail = await this.repository.getByEmail({
        email: args.email,
      });

      if (attendeeWithSameEmail) {
        if (attendeeWithSameEmail.attendee.id !== args.attendeeId) {
          throw new BadRequestError(
            'This email is already registered for another attendee',
          );
        }
      }
    }

    const attendee = this.repository.update(args);
    return attendee;
  }

  async delete({ attendeeId }: Request<'delete'>): Response<'delete'> {
    return this.repository.delete({ attendeeId });
  }

  async getById({ attendeeId }: Request<'getById'>): Response<'getById'> {
    return this.repository.getById({ attendeeId });
  }

  async getByEmail({ email }: Request<'getByEmail'>): Response<'getByEmail'> {
    return this.repository.getByEmail({ email });
  }

  async getByEvent(args: Request<'getByEvent'>): Response<'getByEvent'> {
    return this.repository.getByEvent(args);
  }
}
