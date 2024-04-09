import { z } from 'zod';

export const ParamDeleteAttendeeSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

export const ResDeleteAttendeeSchema = {
  200: z.object({ message: z.string() }).describe('Successful response'),
};
