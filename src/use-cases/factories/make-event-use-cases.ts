import { EventsRepositoryPrisma } from '@/repositories/prisma/prisma-events.repository.ts';
import { EventUseCases } from '../event.usecases.ts';

export const makeEventUseCases = () => {
  const eventsRepository = new EventsRepositoryPrisma();
  const eventUseCases = new EventUseCases(eventsRepository);

  return eventUseCases;
};
