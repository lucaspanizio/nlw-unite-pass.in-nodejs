import { create } from './events/create.ts';
import { update } from './events/update.ts';
import { remove } from './events/delete.ts';
import { getAll } from './events/getAll.ts';
import { getById } from './events/getById.ts';
import { getAttendees } from './events/getAttendees.ts';

export const eventsController = {
  create,
  update,
  delete: remove,
  getAll,
  getById,
  getAttendees,
};
