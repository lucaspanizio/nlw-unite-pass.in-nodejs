import { z } from 'zod';

export const ParamDeleteEventSchema = z.object({
  id: z.string().uuid(),
});

export const ResDeleteEventSchema = {
  204: z.object({ eventId: z.string().uuid() }),
};
