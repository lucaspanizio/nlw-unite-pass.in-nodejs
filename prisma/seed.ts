import { prisma } from '../src/lib/prisma';

async function seed() {
  await prisma.event.create({
    data: {
      id: '0fd1dcb8-1721-458e-a391-f029ea78b204',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento para devs apixonados por código!',
      maxAttendees: 120,
    },
  });

  await prisma.attendee.create({
    data: {
      name: 'Jhon Doe',
      email: 'jhon.doe@email.com',
      eventId: '0fd1dcb8-1721-458e-a391-f029ea78b204',
    },
  });
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
