import { prisma } from '@/lib/prisma/index.ts';
import { Attendee, Request, Response } from '../types/attendees.types.ts';
import { AttendeeRepository } from '@/repositories/attendees.repository.ts';

export class AttendeesRepositoryPrisma implements AttendeeRepository {
  async register({
    name,
    email,
    eventId,
  }: Request<'register'>): Response<'register'> {
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId,
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
    });

    const attendeeWithRelations = {
      attendee: this.transformAttendeeWithRelations(attendee),
    };

    return attendeeWithRelations;
  }

  async update({ attendeeId, ...data }: Request<'update'>): Response<'update'> {
    const nonUndefinedEntries = Object.entries(data).filter(
      ([key, value]) => value !== undefined,
    );

    // Nenhum parâmetro foi informado
    if (nonUndefinedEntries.length === 0) return null;

    const attendee = await this.getById({ attendeeId });

    // Nenhum participante foi encontrado pelo id informado
    if (!attendee) return null;

    const updateData = Object.fromEntries(nonUndefinedEntries);

    const updatedAttendee = {
      attendee: {
        ...attendee.attendee,
        ...updateData,
      },
    };

    await prisma.attendee.update({
      where: { id: attendeeId },
      data: updateData,
    });

    return updatedAttendee;
  }

  async getById({ attendeeId }: Request<'getById'>): Response<'getById'> {
    const attendee = await prisma.attendee.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        event: {
          select: {
            title: true,
          },
        },
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      where: {
        id: attendeeId,
      },
    });

    if (!attendee) return null;

    const attendeeWithRelations = {
      attendee: this.transformAttendeeWithRelations(attendee),
    };

    return attendeeWithRelations;
  }

  async getByEmail({ email }: Request<'getByEmail'>): Response<'getByEmail'> {
    const attendee = await prisma.attendee.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        event: {
          select: {
            title: true,
          },
        },
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      where: {
        email,
      },
    });

    if (!attendee) return null;

    const attendeeWithRelations = {
      attendee: this.transformAttendeeWithRelations(attendee),
    };

    return attendeeWithRelations;
  }

  async getByEvent({
    eventId,
    query,
    take,
    pageIndex,
  }: Request<'getByEvent'>): Response<'getByEvent'> {
    const whereCondition = {
      eventId,
      ...(query && {
        name: {
          contains: query,
        },
      }),
    };

    const attendees = await prisma.attendee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        event: {
          select: {
            title: true,
          },
        },
        checkIn: {
          select: {
            createdAt: true,
          },
        },
      },
      where: whereCondition,
      take,
      skip: pageIndex * take,
      orderBy: [{ createdAt: 'desc' }, { name: 'asc' }],
    });

    const attendeesWithRelations = attendees.map((attendee) => {
      return this.transformAttendeeWithRelations(attendee);
    });

    const total = await prisma.attendee.count();

    return {
      attendees: attendeesWithRelations,
      total,
      totalPages: Math.ceil(total / take),
    };
  }

  async delete({ attendeeId }: Request<'delete'>): Response<'delete'> {
    const attendee = await this.getById({ attendeeId });

    if (!attendee) return false;

    const data = await prisma.attendee.delete({ where: { id: attendeeId } });

    return !!data;
  }

  private transformAttendeeWithRelations(attendee: {
    id: number;
    name: string;
    email: string;
    event: {
      title: string;
    };
    createdAt: Date;
    checkIn: {
      createdAt: Date;
    } | null;
  }): Attendee {
    return {
      id: attendee.id,
      name: attendee.name,
      email: attendee.email,
      event: attendee.event.title,
      createdAt: attendee.createdAt,
      checkedInAt: attendee.checkIn?.createdAt ?? null,
    };
  }
}
