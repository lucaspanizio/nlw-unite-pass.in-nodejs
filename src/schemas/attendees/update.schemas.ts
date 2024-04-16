import { z } from 'zod';

export const BodyUpdateAttendeeSchema = z.object({
  name: z.string().min(4).optional(),
  email: z.string().email().optional(),
});

export const ParamsUpdateAttendeeSchema = z.object({
  attendeeId: z.string().regex(/^\d+$/).transform(Number),
});

export const ResUpdateAttendeeSchema = {
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
