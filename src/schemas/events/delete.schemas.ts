import { z } from 'zod';

export const ParamsDeleteEventSchema = z.object({
  eventId: z.string().uuid(),
});

export const ResDeleteEventSchema = {
  200: z.object({ message: z.string() }).describe('Successful response'),
};
