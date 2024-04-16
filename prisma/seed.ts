import { faker } from '@faker-js/faker';
import { Attendee } from '@prisma/client';
import { prisma } from '../src/lib/prisma';

// Quantidade de participantes para os quais será feito check-in
const QUANTITY_FOR_CHECKIN = 30;
const AMOUNT_ATTENDEES = 50;
const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33';
const attendees: Attendee[] = [];

async function clearTables() {
  const tableNames = ['attendees', 'events', 'check_ins'];

  for (const tableName of tableNames) {
    await prisma.$queryRawUnsafe(`DELETE FROM ${tableName};`);
  }
}

async function createEvent() {
  await prisma.event.create({
    data: {
      id: EVENT_ID,
      title: 'NLW Unite',
      slug: 'nlw-unite',
      details: 'Um evento para devs apixonados por código!',
      maxAttendees: AMOUNT_ATTENDEES,
    },
  });
}

async function createAttendees() {
  for (let i = 1; i <= AMOUNT_ATTENDEES; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    const attendee: Attendee = {
      id: i + 1000,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      createdAt: faker.date.past(),
      eventId: EVENT_ID,
      checkInId: null,
    };

    attendees.push(attendee);
  }

  await prisma.attendee.createMany({ data: attendees });
}

async function createCheckIns() {
  const TIME_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas

  const shuffledIndices = attendees
    .map((_, index) => index) // Cria um array com os índices dos participantes
    .sort(() => Math.random() - 0.5) // Embaralha aleatoriamente os índices
    .slice(0, QUANTITY_FOR_CHECKIN); // Seleciona os primeiros 'QUANTITY_FOR_CHECKIN' índices

  const now = new Date();
  for (const index of shuffledIndices) {
    const attendee = attendees[index];

    if (attendee.createdAt instanceof Date) {
      const randomTime = now.getTime() - Math.random() * TIME_INTERVAL;
      const createdAt = new Date(randomTime);

      await prisma.checkInd.create({
        data: {
          id: index,
          createdAt,
          attendeeId: attendee.id,
        },
      });
    }
  }
}

async function seed() {
  await clearTables();

  Promise.all([createEvent(), createAttendees(), createCheckIns()]);
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
