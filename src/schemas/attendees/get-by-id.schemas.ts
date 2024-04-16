import { z } from 'zod';

export const ParamsGetByIdAttendeeSchema = z.object({
  attendeeId: z.string().regex(/^\d+$/).transform(Number),
});

export const ResGetByIdAttendeeSchema = {
  200: z
    .object({
      attendee: z.object({
        id: z.number().int().positive(),
        name: z.string().min(4),
        email: z.string().email(),
        createdAt: z.date(),
        event: z.string(),
        checkedInAt: z.date().nullable(),
      }),
    })
    .describe('Successful response'),
};
