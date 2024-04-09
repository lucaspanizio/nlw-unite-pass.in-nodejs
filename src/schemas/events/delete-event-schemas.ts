import { z } from 'zod';

export const ParamDeleteEventSchema = z.object({
  id: z.string().uuid(),
});

export const ResDeleteEventSchema = {
  200: z.object({ message: z.string() }).describe('Successful response'),
};
