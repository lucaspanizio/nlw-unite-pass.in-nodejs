import { z } from 'zod';

export const ParamsGetByEventSchema = z.object({
  eventId: z.string().uuid(),
});

export const QueryGetByEventSchema = z.object({
  query: z.string().optional(),
  take: z.string().optional().default('10').transform(Number),
  pageIndex: z.string().optional().default('0').transform(Number),
});

export const ResGetByEventSchema = {
  200: z
    .object({
      attendees: z
        .object({
          id: z.number().int().positive(),
          name: z.string().min(4),
          email: z.string().email(),
          event: z.string(),
          createdAt: z.date(),
          checkedInAt: z.date().nullable(),
        })
        .array(),
      total: z.number().int().positive(),
      totalPages: z.number().int().positive(),
    })
    .describe('Successful response'),
};
