import { getById } from './attendees/getById.ts';
import { update } from './attendees/update.ts';
import { remove } from './attendees/delete.ts';
import { register } from './attendees/register.ts';

export const attendeeController = {
  register,
  update,
  delete: remove,
  getById,
};
