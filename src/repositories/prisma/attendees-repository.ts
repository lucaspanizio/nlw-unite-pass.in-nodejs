import { prisma } from '@/lib/prisma/index.ts';
import {
  Attendee,
  AttendeeRepository,
} from '@/repositories/attendees-repository-contract.ts';
import {
  Response,
  CreateRequest,
  UpdateRequest,
} from '../base-respository-contract.ts';

export class AttendeesRepositoryPrisma implements AttendeeRepository {
  async create({
    name,
    email,
    eventId,
  }: CreateRequest<Attendee>): Response<Attendee> {
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId,
      },
    });

    return attendee;
  }

  async update({
    id,
    ...data
  }: UpdateRequest<Attendee>): Response<Attendee | null> {
    const nonUndefinedEntries = Object.entries(data).filter(
      ([key, value]) => value !== undefined,
    );

    // Nenhum parâmetro foi informado
    if (nonUndefinedEntries.length === 0) return null;

    const attendee = await this.findById(id);

    // Nenhum participante foi encontrado pelo id informado
    if (!attendee) return null;

    const updateData = Object.fromEntries(nonUndefinedEntries);

    const updatedAttendee = { ...attendee, ...updateData };

    await prisma.attendee.update({
      where: { id },
      data: updateData,
    });

    return updatedAttendee;
  }

  async findById(id: number): Response<Attendee | null> {
    const attendee = await prisma.attendee.findUnique({ where: { id } });

    return attendee || null;
  }

  async findByEmail(email: string): Response<Attendee | null> {
    const attendee = await prisma.attendee.findUnique({ where: { email } });

    return attendee || null;
  }

  async findAll(): Response<Attendee[]> {
    const attendees = await prisma.attendee.findMany();

    return attendees;
  }

  async delete(id: number): Response<Attendee | null> {
    const attendee = await this.findById(id);

    if (!attendee) return null;

    await prisma.attendee.delete({ where: { id } });

    return attendee;
  }
}
